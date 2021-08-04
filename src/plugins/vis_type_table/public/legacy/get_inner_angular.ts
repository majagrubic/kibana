/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// inner angular imports
// these are necessary to bootstrap the local angular.
// They can stay even after NP cutover
import '../index.scss';
import angular from 'angular';
// required for `ngSanitize` angular module
import 'angular-sanitize';
import { EuiIcon } from '@elastic/eui';
import { i18nDirective, i18nFilter, I18nProvider } from '@kbn/i18n/angular';
import { CoreStart, PluginInitializerContext } from 'kibana/public';
import { DataPublicPluginStart } from 'src/plugins/data/public';
import { Storage } from 'src/plugins/kibana_utils/public';
import { NavigationPublicPluginStart as NavigationStart } from 'src/plugins/navigation/public';
import { createDocTableDirective } from './doc_table';
import { createTableHeaderDirective } from './doc_table/components/table_header';
import {
  createToolBarPagerButtonsDirective,
  createToolBarPagerTextDirective,
} from './doc_table/components/pager';
import { createContextAppLegacy } from '../components/context_app/context_app_legacy_directive';
import { createTableRowDirective } from './doc_table/components/table_row';
import { createPagerFactory } from './doc_table/lib/pager/pager_factory';
import { createInfiniteScrollDirective } from './doc_table/infinite_scroll';
import { createDocViewerDirective } from './doc_viewer';
import { createDiscoverGridDirective } from './create_discover_grid_directive';
import { createRenderCompleteDirective } from './directives/render_complete';
import {
  configureAppAngularModule,
  PrivateProvider,
  registerListenEventListener,
  watchMultiDecorator,
} from '../../../../kibana_legacy/public';
import { PromiseServiceCreator } from './helpers';
import { DiscoverStartPlugins } from '../../plugin';
import { getScopedHistory } from '../../kibana_services';
import { createDiscoverDirective } from './create_discover_directive';

/**
 * returns the main inner angular module, it contains all the parts of Angular Discover
 * needs to render, so in the end the current 'kibana' angular module is no longer necessary
 */
export function getInnerAngularModule(
  name: string,
  core: CoreStart,
  deps: DiscoverStartPlugins,
  context: PluginInitializerContext
) {
  const module = initializeInnerAngularModule(name, core, deps.navigation, deps.data);
  configureAppAngularModule(module, { core, env: context.env }, true, getScopedHistory);
  return module;
}

/**
 * returns a slimmer inner angular module for embeddable rendering
 */
export function getInnerAngularModuleEmbeddable(
  name: string,
  core: CoreStart,
  deps: DiscoverStartPlugins
) {
  return initializeInnerAngularModule(name, core, deps.navigation, deps.data, true);
}

let initialized = false;

export function initializeInnerAngularModule(
  name = 'app/discover',
  core: CoreStart,
  navigation: NavigationStart,
  data: DataPublicPluginStart,
  embeddable = false
) {
  if (!initialized) {
    createLocalI18nModule();
    createLocalPrivateModule();
    createLocalPromiseModule();
    createLocalStorageModule();
    createPagerFactoryModule();
    createDocTableModule();
    initialized = true;
  }

  if (embeddable) {
    return angular
      .module(name, [
        'ngSanitize',
        'react',
        'ui.bootstrap',
        'discoverI18n',
        'discoverPrivate',
        'discoverDocTable',
        'discoverPagerFactory',
        'discoverPromise',
      ])
      .config(watchMultiDecorator)
      .directive('icon', (reactDirective) => reactDirective(EuiIcon))
      .directive('renderComplete', createRenderCompleteDirective);
  }

  return angular
    .module(name, [
      'ngSanitize',
      'react',
      'ui.bootstrap',
      'discoverI18n',
      'discoverPrivate',
      'discoverPromise',
      'discoverLocalStorageProvider',
      'discoverDocTable',
      'discoverPagerFactory',
    ])
    .config(watchMultiDecorator)
    .run(registerListenEventListener)
    .directive('renderComplete', createRenderCompleteDirective)
    .directive('discover', createDiscoverDirective);
}

function createLocalPromiseModule() {
  angular.module('discoverPromise', []).service('Promise', PromiseServiceCreator);
}

function createLocalPrivateModule() {
  angular.module('discoverPrivate', []).provider('Private', PrivateProvider);
}

function createLocalI18nModule() {
  angular
    .module('discoverI18n', [])
    .provider('i18n', I18nProvider)
    .filter('i18n', i18nFilter)
    .directive('i18nId', i18nDirective);
}

function createLocalStorageModule() {
  angular
    .module('discoverLocalStorageProvider', ['discoverPrivate'])
    .service('localStorage', createLocalStorageService('localStorage'))
    .service('sessionStorage', createLocalStorageService('sessionStorage'));
}

const createLocalStorageService = function (type: string) {
  return function ($window: ng.IWindowService) {
    return new Storage($window[type]);
  };
};

function createPagerFactoryModule() {
  angular.module('discoverPagerFactory', []).factory('pagerFactory', createPagerFactory);
}

function createDocTableModule() {
  angular
    .module('discoverDocTable', ['discoverPagerFactory', 'react'])
    .directive('docTable', createDocTableDirective)
    .directive('kbnTableHeader', createTableHeaderDirective)
    .directive('toolBarPagerText', createToolBarPagerTextDirective)
    .directive('kbnTableRow', createTableRowDirective)
    .directive('toolBarPagerButtons', createToolBarPagerButtonsDirective)
    .directive('kbnInfiniteScroll', createInfiniteScrollDirective)
    .directive('discoverGrid', createDiscoverGridDirective)
    .directive('docViewer', createDocViewerDirective)
    .directive('contextAppLegacy', createContextAppLegacy);
}
