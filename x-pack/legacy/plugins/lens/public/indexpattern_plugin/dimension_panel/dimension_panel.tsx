/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import _ from 'lodash';
import React, { memo, useMemo } from 'react';
import { EuiButtonIcon } from '@elastic/eui';
import { Storage } from 'ui/storage';
import { i18n } from '@kbn/i18n';
import {
  UiSettingsClientContract,
  SavedObjectsClientContract,
  HttpServiceBase,
} from 'src/core/public';
import { DatasourceDimensionPanelProps, StateSetter } from '../../types';
import {
  IndexPatternColumn,
  IndexPatternPrivateState,
  IndexPatternField,
  OperationType,
} from '../indexpattern';

import { getAvailableOperationsByMetadata, buildColumn, changeField } from '../operations';
import { PopoverEditor } from './popover_editor';
import { DragContextState, ChildDragDropProvider, DragDrop } from '../../drag_drop';
import { changeColumn, deleteColumn } from '../state_helpers';
import { isDraggedField, hasField } from '../utils';

export type IndexPatternDimensionPanelProps = DatasourceDimensionPanelProps & {
  state: IndexPatternPrivateState;
  setState: StateSetter<IndexPatternPrivateState>;
  dragDropContext: DragContextState;
  uiSettings: UiSettingsClientContract;
  storage: Storage;
  savedObjectsClient: SavedObjectsClientContract;
  layerId: string;
  http: HttpServiceBase;
};

export interface OperationFieldSupportMatrix {
  operationByField: Partial<Record<string, OperationType[]>>;
  fieldByOperation: Partial<Record<OperationType, string[]>>;
  operationByDocument: OperationType[];
}

export const IndexPatternDimensionPanel = memo(function IndexPatternDimensionPanel(
  props: IndexPatternDimensionPanelProps
) {
  const layerId = props.layerId;
  const currentIndexPattern = props.state.indexPatterns[props.state.layers[layerId].indexPatternId];

  const operationFieldSupportMatrix = useMemo(() => {
    const filteredOperationsByMetadata = getAvailableOperationsByMetadata(
      currentIndexPattern
    ).filter(operation => props.filterOperations(operation.operationMetaData));

    const supportedOperationsByField: Partial<Record<string, OperationType[]>> = {};
    const supportedFieldsByOperation: Partial<Record<OperationType, string[]>> = {};
    const supportedOperationsByDocument: OperationType[] = [];
    filteredOperationsByMetadata.forEach(({ operations }) => {
      operations.forEach(operation => {
        if (operation.type === 'field') {
          if (supportedOperationsByField[operation.field]) {
            supportedOperationsByField[operation.field]!.push(operation.operationType);
          } else {
            supportedOperationsByField[operation.field] = [operation.operationType];
          }

          if (supportedFieldsByOperation[operation.operationType]) {
            supportedFieldsByOperation[operation.operationType]!.push(operation.field);
          } else {
            supportedFieldsByOperation[operation.operationType] = [operation.field];
          }
        } else {
          supportedOperationsByDocument.push(operation.operationType);
        }
      });
    });
    return {
      operationByField: _.mapValues(supportedOperationsByField, _.uniq),
      fieldByOperation: _.mapValues(supportedFieldsByOperation, _.uniq),
      operationByDocument: _.uniq(supportedOperationsByDocument),
    };
  }, [currentIndexPattern, props.filterOperations]);

  const selectedColumn: IndexPatternColumn | null =
    props.state.layers[layerId].columns[props.columnId] || null;

  function hasOperationForField(field: IndexPatternField) {
    return Boolean(operationFieldSupportMatrix.operationByField[field.name]);
  }

  function canHandleDrop() {
    const { dragging } = props.dragDropContext;
    const layerIndexPatternId = props.state.layers[props.layerId].indexPatternId;

    return (
      isDraggedField(dragging) &&
      layerIndexPatternId === dragging.indexPatternId &&
      Boolean(hasOperationForField(dragging.field))
    );
  }

  return (
    <ChildDragDropProvider {...props.dragDropContext}>
      <DragDrop
        className="lnsConfigPanel__summary"
        data-test-subj="indexPattern-dropTarget"
        droppable={canHandleDrop()}
        onDrop={droppedItem => {
          if (!isDraggedField(droppedItem) || !hasOperationForField(droppedItem.field)) {
            // TODO: What do we do if we couldn't find a column?
            return;
          }

          const operationsForNewField =
            operationFieldSupportMatrix.operationByField[droppedItem.field.name];

          // We need to check if dragging in a new field, was just a field change on the same
          // index pattern and on the same operations (therefore checking if the new field supports
          // our previous operation)
          const hasFieldChanged =
            selectedColumn &&
            hasField(selectedColumn) &&
            selectedColumn.sourceField !== droppedItem.field.name &&
            operationsForNewField &&
            operationsForNewField.includes(selectedColumn.operationType);

          // If only the field has changed use the onFieldChange method on the operation to get the
          // new column, otherwise use the regular buildColumn to get a new column.
          const newColumn = hasFieldChanged
            ? changeField(selectedColumn, currentIndexPattern, droppedItem.field)
            : buildColumn({
                columns: props.state.layers[props.layerId].columns,
                indexPattern: currentIndexPattern,
                layerId,
                suggestedPriority: props.suggestedPriority,
                field: droppedItem.field,
              });

          props.setState(
            changeColumn({
              state: props.state,
              layerId,
              columnId: props.columnId,
              newColumn,
              // If the field has changed, the onFieldChange method needs to take care of everything including moving
              // over params. If we create a new column above we want changeColumn to move over params.
              keepParams: !hasFieldChanged,
            })
          );
        }}
      >
        <PopoverEditor
          {...props}
          currentIndexPattern={currentIndexPattern}
          selectedColumn={selectedColumn}
          operationFieldSupportMatrix={operationFieldSupportMatrix}
        />
        {selectedColumn && (
          <EuiButtonIcon
            data-test-subj="indexPattern-dimensionPopover-remove"
            iconType="cross"
            iconSize="s"
            size="s"
            color="danger"
            aria-label={i18n.translate('xpack.lens.indexPattern.removeColumnLabel', {
              defaultMessage: 'Remove configuration',
            })}
            title={i18n.translate('xpack.lens.indexPattern.removeColumnLabel', {
              defaultMessage: 'Remove configuration',
            })}
            onClick={() => {
              props.setState(
                deleteColumn({
                  state: props.state,
                  layerId,
                  columnId: props.columnId,
                })
              );
              if (props.onRemove) {
                props.onRemove(props.columnId);
              }
            }}
          />
        )}
      </DragDrop>
    </ChildDragDropProvider>
  );
});
