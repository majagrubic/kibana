/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { withSuspense } from './utility';

/**
 * The lazily-loaded `NoDataViews` component that is wrapped by the `withSuspense` HOC. Consumers should use `React.Suspense` or the
 * `withSuspense` HOC to load this component.
 */
export const LazyNoDataViewsComponent = React.lazy(() =>
  import('./empty_state/no_data_views').then(({ NoDataViewsComponent }) => ({
    default: NoDataViewsComponent,
  }))
);

/**
 * A `NoDataViews` component that is wrapped by the `withSuspense` HOC.  This component is a pure UI
 * component, and has no reference to services.
 */
export const NoDataViewsComponent = withSuspense(LazyNoDataViewsComponent);

export { NoDataViewsComponentProps } from './empty_state';
