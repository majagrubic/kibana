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
import React from 'react';
import ReactDOM from 'react-dom';
import { CoreSetup, CoreStart, Plugin } from 'src/core/public';
import { IUiActionsStart } from '../../../../../../../src/plugins/ui_actions/public';
import { createHelloWorldAction } from '../../../../../../../src/plugins/ui_actions/public/tests/test_samples';

import {
  Start as InspectorStartContract,
  Setup as InspectorSetupContract,
} from '../../../../../../../src/plugins/inspector/public';

import { Plugin as EmbeddablePlugin, CONTEXT_MENU_TRIGGER } from './embeddable_api';

const REACT_ROOT_ID = 'embeddableExplorerRoot';

import {
  SayHelloAction,
  createSendMessageAction,
  HelloWorldEmbeddableFactory,
  ContactCardEmbeddableFactory,
} from '../../../../../../../src/legacy/core_plugins/embeddable_api/public/np_ready/public/lib/test_samples';
import { App } from './app';

export interface SetupDependencies {
  embeddable: ReturnType<EmbeddablePlugin['setup']>;
  inspector: InspectorSetupContract;
  __LEGACY: {
    SavedObjectFinder: React.ComponentType<any>;
    ExitFullScreenButton: React.ComponentType<any>;
  };
}

interface StartDependencies {
  embeddable: ReturnType<EmbeddablePlugin['start']>;
  uiActions: IUiActionsStart;
  inspector: InspectorStartContract;
  __LEGACY: {
    SavedObjectFinder: React.ComponentType<any>;
    ExitFullScreenButton: React.ComponentType<any>;
    onRenderComplete: (onRenderComplete: () => void) => void;
  };
}

export type EmbeddableExplorerSetup = void;
export type EmbeddableExplorerStart = void;

export class EmbeddableExplorerPublicPlugin
  implements
    Plugin<EmbeddableExplorerSetup, EmbeddableExplorerStart, SetupDependencies, StartDependencies> {
  public setup(core: CoreSetup, setupDeps: SetupDependencies): EmbeddableExplorerSetup {}

  public start(core: CoreStart, plugins: StartDependencies): EmbeddableExplorerStart {
    const helloWorldAction = createHelloWorldAction(core.overlays);
    const sayHelloAction = new SayHelloAction(alert);
    const sendMessageAction = createSendMessageAction(core.overlays);
    const helloWorldEmbeddableFactory = new HelloWorldEmbeddableFactory();
    const contactCardEmbeddableFactory = new ContactCardEmbeddableFactory(
      {},
      plugins.uiActions.executeTriggerActions,
      core.overlays
    );

    plugins.uiActions.registerAction(helloWorldAction);
    plugins.uiActions.registerAction(sayHelloAction);
    plugins.uiActions.registerAction(sendMessageAction);

    plugins.uiActions.attachAction(CONTEXT_MENU_TRIGGER, helloWorldAction.id);

    plugins.embeddable.registerEmbeddableFactory(
      helloWorldEmbeddableFactory.type,
      helloWorldEmbeddableFactory
    );
    plugins.embeddable.registerEmbeddableFactory(
      contactCardEmbeddableFactory.type,
      contactCardEmbeddableFactory
    );

    plugins.__LEGACY.onRenderComplete(() => {
      const root = document.getElementById(REACT_ROOT_ID);
      ReactDOM.render(
        <App
          getActions={plugins.uiActions.getTriggerCompatibleActions}
          getAllEmbeddableFactories={plugins.embeddable.getEmbeddableFactories}
          getEmbeddableFactory={plugins.embeddable.getEmbeddableFactory}
          notifications={core.notifications}
          overlays={core.overlays}
          inspector={plugins.inspector}
          SavedObjectFinder={plugins.__LEGACY.SavedObjectFinder}
          I18nContext={core.i18n.Context}
        />,
        root
      );
    });
  }

  public stop() {}
}
