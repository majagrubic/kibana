/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { KibanaPluginServiceFactory } from '../types';
import { SharedUXEditorsService } from '../editors';
import { SharedUXPluginStartDeps } from '../../types';

export type EditorsServiceFactory = KibanaPluginServiceFactory<
  SharedUXEditorsService,
  SharedUXPluginStartDeps
>;

export const editorsServiceFactory: EditorsServiceFactory = ({ startPlugins }) => ({
  openDataViewEditor: startPlugins.dataViewEditor.openEditor,
});
