/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { identity } from 'lodash';
import { SavedObjectReference } from '@kbn/core/types';
import {
  MigrateFunctionsObject,
  GetMigrationFunctionObjectFn,
  PersistableState,
} from '@kbn/kibana-utils-plugin/common';
import { AnyExpressionFunctionDefinition } from './types';
import { ExpressionFunctionParameter } from './expression_function_parameter';
import { ExpressionValue } from '../expression_types/types';
import { ExpressionAstFunction } from '../ast';

export class ExpressionFunction implements PersistableState<ExpressionAstFunction['arguments']> {
  /**
   * Name of function
   */
  name: string;

  namespace?: string;

  /**
   * Aliases that can be used instead of `name`.
   */
  aliases: string[];

  /**
   * Return type of function. This SHOULD be supplied. We use it for UI
   * and autocomplete hinting. We may also use it for optimizations in
   * the future.
   */
  type: string;

  /**
   * Opt-in to caching this function. By default function outputs are cached and given the same inputs cached result is returned.
   */
  allowCache:
    | boolean
    | { withSideEffects: (params: Record<string, unknown>, handlers: object) => () => void };

  /**
   * Function to run function (context, args)
   */
  fn: (
    input: ExpressionValue,
    params: Record<string, unknown>,
    handlers: object
  ) => ExpressionValue;

  /**
   * A short help text.
   */
  help: string;

  /**
   * Specification of expression function parameters.
   */
  args: Record<string, ExpressionFunctionParameter> = {};

  /**
   * Type of inputs that this function supports.
   */
  inputTypes: string[] | undefined;

  disabled: boolean;

  /**
   * Deprecation flag.
   */
  deprecated: boolean;

  telemetry: (
    state: ExpressionAstFunction['arguments'],
    telemetryData: Record<string, unknown>
  ) => Record<string, unknown>;
  extract: (state: ExpressionAstFunction['arguments']) => {
    state: ExpressionAstFunction['arguments'];
    references: SavedObjectReference[];
  };
  inject: (
    state: ExpressionAstFunction['arguments'],
    references: SavedObjectReference[]
  ) => ExpressionAstFunction['arguments'];
  migrations: MigrateFunctionsObject | GetMigrationFunctionObjectFn;

  constructor(functionDefinition: AnyExpressionFunctionDefinition) {
    const {
      name,
      type,
      aliases,
      fn,
      help,
      args,
      inputTypes,
      context,
      disabled,
      deprecated,
      telemetry,
      inject,
      extract,
      migrations,
      namespace,
      allowCache,
    } = functionDefinition;

    this.name = name;
    this.namespace = namespace;
    this.type = type;
    this.aliases = aliases || [];
    this.fn = fn as ExpressionFunction['fn'];
    this.help = help || '';
    this.inputTypes = inputTypes || context?.types;
    this.allowCache =
      allowCache && typeof allowCache !== 'boolean'
        ? (allowCache as ExpressionFunction['allowCache'])
        : Boolean(allowCache);
    this.disabled = disabled || false;
    this.deprecated = !!deprecated;
    this.telemetry = telemetry || ((s, c) => c);
    this.inject = inject || identity;
    this.extract = extract || ((s) => ({ state: s, references: [] }));
    this.migrations = migrations || {};

    for (const [key, arg] of Object.entries(args || {})) {
      this.args[key as keyof typeof args] = new ExpressionFunctionParameter(key, arg);
    }
  }

  accepts = (type: string): boolean => {
    // If you don't tell us input types, we'll assume you don't care what you get.
    return this.inputTypes?.includes(type) ?? true;
  };
}
