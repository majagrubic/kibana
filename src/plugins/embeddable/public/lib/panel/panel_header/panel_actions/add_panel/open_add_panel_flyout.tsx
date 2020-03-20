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
import { NotificationsStart, OverlayStart } from 'src/core/public';
import { EmbeddableStart } from '../../../../../plugin';
import { toMountPoint } from '../../../../../../../kibana_react/public';
import { IContainer } from '../../../../containers';
import { AddPanelFlyout } from './add_panel_flyout';

export async function openAddPanelFlyout(options: {
  embeddable: IContainer;
  getFactory: EmbeddableStart['getEmbeddableFactory'];
  getAllFactories: EmbeddableStart['getEmbeddableFactories'];
  overlays: OverlayStart;
  notifications: NotificationsStart;
  SavedObjectFinder: React.ComponentType<any>;
  onAddPanel?: (id: string, type: string, name: string) => void;
}) {
  const {
    embeddable,
    getFactory,
    getAllFactories,
    overlays,
    notifications,
    SavedObjectFinder,
    onAddPanel,
  } = options;
  const flyoutSession = overlays.openFlyout(
    toMountPoint(
      <AddPanelFlyout
        container={embeddable}
        onClose={() => {
          if (flyoutSession) {
            flyoutSession.close();
          }
        }}
        getFactory={getFactory}
        getAllFactories={getAllFactories}
        notifications={notifications}
        SavedObjectFinder={SavedObjectFinder}
        onAddPanel={onAddPanel}
      />
    ),
    {
      'data-test-subj': 'addPanelFlyout',
    }
  );
}
