/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

// eslint-disable-next-line @kbn/imports/no_boundary_crossing
import { hapiMocks } from '@kbn/hapi-mocks';
import { ApiVersion, ELASTIC_HTTP_VERSION_HEADER } from '@kbn/core-http-common';

export function createRequest(
  {
    version,
    body,
    params,
    query,
  }: { version?: undefined | ApiVersion; body?: object; params?: object; query?: object } = {
    version: '1',
  }
) {
  return hapiMocks.createRequest({
    payload: body,
    params,
    query,
    headers: { [ELASTIC_HTTP_VERSION_HEADER]: version },
    app: { requestId: 'fakeId' },
  });
}
