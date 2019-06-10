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

import { relative } from 'path';

import dedent from 'dedent';
import getopts from 'getopts';

import { Options } from './run';

export interface Flags {
  verbose: boolean;
  quiet: boolean;
  silent: boolean;
  debug: boolean;
  help: boolean;
  _: string[];
  unexpected: string[];

  [key: string]: undefined | boolean | string | string[];
}

export function getFlags(argv: string[], options: Options): Flags {
  const unexpected: string[] = [];
  const flagOpts = options.flags || {};

  const { verbose, quiet, silent, debug, help, _, ...others } = getopts(argv, {
    string: flagOpts.string,
    boolean: [...(flagOpts.boolean || []), 'verbose', 'quiet', 'silent', 'debug', 'help'],
    alias: {
      ...(flagOpts.alias || {}),
      v: 'verbose',
    },
    default: flagOpts.default,
    unknown: (name: string) => {
      unexpected.push(name);

      if (options.flags && options.flags.allowUnexpected) {
        return true;
      }

      return false;
    },
  } as any);

  return {
    verbose,
    quiet,
    silent,
    debug,
    help,
    _,
    unexpected,
    ...others,
  };
}

export function getHelp(options: Options) {
  const usage = options.usage || `node ${relative(process.cwd(), process.argv[1])}`;

  const optionHelp = (
    dedent((options.flags && options.flags.help) || '') +
    '\n' +
    dedent`
      --verbose, -v      Log verbosely
      --debug            Log debug messages (less than verbose)
      --quiet            Only log errors
      --silent           Don't log anything
      --help             Show this message
    `
  )
    .split('\n')
    .filter(Boolean)
    .join('\n    ');

  return `
  ${usage}

  ${dedent(options.description || 'Runs a dev task')
    .split('\n')
    .join('\n  ')}

  Options:
    ${optionHelp + '\n\n'}`;
}
