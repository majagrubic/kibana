/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { has } from 'lodash';
import type { FieldFilter, Filter, FilterMeta, LatLon } from './types';

export type GeoPolygonFilterMeta = FilterMeta & {
  params: {
    points: LatLon[];
  };
};

export type GeoPolygonFilter = Filter & {
  meta: GeoPolygonFilterMeta;
  geo_polygon: any;
};

/**
 * @param filter
 * @returns `true` if a filter is an `GeoPolygonFilter`
 *
 * @public
 */
export const isGeoPolygonFilter = (filter: FieldFilter): filter is GeoPolygonFilter =>
  has(filter, 'geo_polygon');

/**
 * @internal
 */
export const getGeoPolygonFilterField = (filter: GeoPolygonFilter) => {
  return (
    filter.geo_polygon && Object.keys(filter.geo_polygon).find((key) => key !== 'ignore_unmapped')
  );
};
