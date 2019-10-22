/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { TokensProvider } from './tokens_provider';
import { Token } from './token';

export interface Position {
  /**
   * The line number, not zero-indexed.
   *
   * E.g., if given line number 1, this would refer to the first line visible.
   */
  lineNumber: number;

  /**
   * The column number, not zero-indexed.
   *
   * E.g., if given column number 1, this would refer to the first character of a column.
   */
  column: number;
}

export interface Range {
  /**
   * The start point of the range.
   */
  start: Position;

  /**
   * The end point of the range.
   */
  end: Position;
}

/**
 * Enumeration of the different states the current position can be in.
 *
 * Current implementation uses low-level binary operations OR ('|') and AND ('&') to, respectively:
 *
 * - Create a combination of acceptable states.
 * - Extract the states from the acceptable combination.
 *
 * E.g.
 * ```ts
 * const acceptableStates = LINE_MODE.REQUEST_START | LINE_MODE.IN_REQUEST; // binary '110'
 *
 * // Is MULTI_DOC_CUR_DOC_END ('1000') acceptable?
 * Boolean(acceptableStates & LINE_MODE.MULTI_DOC_CUR_DOC_END) // false
 *
 * // Is REQUEST_START ('10') acceptable?
 * Boolean(acceptableStates & LINE_MODE.REQUEST_START) // true
 * ```
 *
 * This implementation will probably be changed to something more accessible in future but is documented
 * here for reference.
 */
export enum LINE_MODE {
  REQUEST_START = 2,
  IN_REQUEST = 4,
  MULTI_DOC_CUR_DOC_END = 8,
  REQUEST_END = 16,
  BETWEEN_REQUESTS = 32,
  UNKNOWN = 64,
}

/**
 * The CoreEditor is a component separate from the Editor implementation that provides Console
 * app specific business logic. The CoreEditor is an interface to the lower-level editor implementation
 * being used which is usually vendor code such as Ace or Monaco.
 */
export interface CoreEditor {
  /**
   * Get the current position of the cursor.
   */
  getCurrentPosition(): Position;

  /**
   * Get the contents of the editor.
   */
  getValue(): string;

  /**
   * Get the contents of the editor at a specific line.
   */
  getLineValue(lineNumber: number): string;

  /**
   * Insert a string value at the current cursor position.
   */
  insert(value: string): void;

  /**
   * Insert a string value at the indicated position.
   */
  insert(pos: Position, value: string): void;

  /**
   * Replace a range of text.
   */
  replace(rangeToReplace: Range, value: string): void;

  /**
   * Clear the selected range.
   */
  clearSelection(): void;

  /**
   * Move the cursor to the indicated position.
   */
  moveCursorToPosition(pos: Position): void;

  /**
   * Get the token at the indicated position. The token considered "at" the position is the
   * one directly preceding the position.
   *
   * Returns null if there is no such token.
   */
  getTokenAt(pos: Position): Token | null;

  /**
   * Get an iterable token provider.
   */
  getTokenProvider(): TokensProvider;

  /**
   * Get the contents of the editor between two points.
   */
  getValueInRange(range: Range): string;

  /**
   * Get the lexer state at the end of a specific line.
   */
  getLineState(lineNumber: number): string;

  /**
   * Get line content between and including the start and end lines provided.
   */
  getLines(startLine: number, endLine: number): string[];
}
