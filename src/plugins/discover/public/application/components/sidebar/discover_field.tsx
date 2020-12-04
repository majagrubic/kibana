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
import './discover_field.scss';

import React, { useState } from 'react';
import { EuiPopover, EuiPopoverTitle, EuiButtonIcon, EuiToolTip, EuiTitle } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { UiStatsMetricType } from '@kbn/analytics';
import classNames from 'classnames';
import { DiscoverFieldDetails } from './discover_field_details';
import { FieldIcon, FieldButton } from '../../../../../kibana_react/public';
import { FieldDetails } from './types';
import { IndexPatternField, IndexPattern } from '../../../../../data/public';
import { getFieldTypeName } from './lib/get_field_type_name';
import { DiscoverFieldDetailsFooter } from './discover_field_details_footer';

export interface DiscoverFieldProps {
  /**
   * Determines whether add/remove button is displayed not only when focused
   */
  alwaysShowActionButton?: boolean;
  /**
   * The displayed field
   */
  field: IndexPatternField;
  /**
   * The currently selected index pattern
   */
  indexPattern: IndexPattern;
  /**
   * Callback to add/select the field
   */
  onAddField: (fieldName: string) => void;
  /**
   * Callback to add a filter to filter bar
   */
  onAddFilter: (field: IndexPatternField | string, value: string, type: '+' | '-') => void;
  /**
   * Callback to remove/deselect a the field
   * @param fieldName
   */
  onRemoveField: (fieldName: string) => void;
  /**
   * Retrieve details data for the field
   */
  getDetails: (field: IndexPatternField) => FieldDetails;
  /**
   * Determines whether the field is selected
   */
  selected?: boolean;
  /**
   * Metric tracking function
   * @param metricType
   * @param eventName
   */
  trackUiMetric?: (metricType: UiStatsMetricType, eventName: string | string[]) => void;

  multiFields?: IndexPatternField[];
}

export function DiscoverField({
  alwaysShowActionButton = false,
  field,
  indexPattern,
  onAddField,
  onRemoveField,
  onAddFilter,
  getDetails,
  selected,
  trackUiMetric,
  multiFields,
}: DiscoverFieldProps) {
  const addLabelAria = i18n.translate('discover.fieldChooser.discoverField.addButtonAriaLabel', {
    defaultMessage: 'Add {field} to table',
    values: { field: field.name },
  });
  const removeLabelAria = i18n.translate(
    'discover.fieldChooser.discoverField.removeButtonAriaLabel',
    {
      defaultMessage: 'Remove {field} from table',
      values: { field: field.name },
    }
  );

  const [infoIsOpen, setOpen] = useState(false);

  const toggleDisplay = (f: IndexPatternField) => {
    if (selected) {
      onRemoveField(f.name);
    } else {
      onAddField(f.name);
    }
  };

  function togglePopover() {
    setOpen(!infoIsOpen);
  }

  function wrapOnDot(str?: string) {
    // u200B is a non-width white-space character, which allows
    // the browser to efficiently word-wrap right after the dot
    // without us having to draw a lot of extra DOM elements, etc
    return str ? str.replace(/\./g, '.\u200B') : '';
  }

  const getDscFieldIcon = (indexPatternField: IndexPatternField) => {
    return (
      <FieldIcon
        type={indexPatternField.type}
        label={getFieldTypeName(indexPatternField.type)}
        scripted={indexPatternField.scripted}
      />
    );
  };

  const dscFieldIcon = getDscFieldIcon(field);

  const getTitle = (indexPatternField: IndexPatternField) => {
    return indexPatternField.displayName !== indexPatternField.name
      ? `${indexPatternField.name} (${indexPatternField.displayName} )`
      : indexPatternField.displayName;
  };

  const getFieldName = (indexPatternField: IndexPatternField) => {
    return (
      <span
        data-test-subj={`field-${indexPatternField.name}`}
        title={getTitle(indexPatternField)}
        className="dscSidebarField__name"
      >
        {wrapOnDot(indexPatternField.displayName)}
      </span>
    );
  };
  const fieldName = getFieldName(field);

  const actionBtnClassName = classNames('dscSidebarItem__action', {
    ['dscSidebarItem__mobile']: alwaysShowActionButton,
  });
  const getActionButton = (indexPatternField: IndexPatternField, isSelected?: boolean) => {
    if (indexPatternField.name !== '_source' && !isSelected) {
      return (
        <EuiToolTip
          delay="long"
          content={i18n.translate('discover.fieldChooser.discoverField.addFieldTooltip', {
            defaultMessage: 'Add field as column',
          })}
        >
          <EuiButtonIcon
            iconType="plusInCircleFilled"
            className={actionBtnClassName}
            onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
              if (ev.type === 'click') {
                ev.currentTarget.focus();
              }
              ev.preventDefault();
              ev.stopPropagation();
              toggleDisplay(indexPatternField);
            }}
            data-test-subj={`fieldToggle-${indexPatternField.name}`}
            aria-label={addLabelAria}
          />
        </EuiToolTip>
      );
    } else if (indexPatternField.name !== '_source' && isSelected) {
      return (
        <EuiToolTip
          delay="long"
          content={i18n.translate('discover.fieldChooser.discoverField.removeFieldTooltip', {
            defaultMessage: 'Remove field from table',
          })}
        >
          <EuiButtonIcon
            color="danger"
            iconType="cross"
            className={actionBtnClassName}
            onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
              if (ev.type === 'click') {
                ev.currentTarget.focus();
              }
              ev.preventDefault();
              ev.stopPropagation();
              toggleDisplay(indexPatternField);
            }}
            data-test-subj={`fieldToggle-${indexPatternField.name}`}
            aria-label={removeLabelAria}
          />
        </EuiToolTip>
      );
    }
  };

  const actionButton = getActionButton(field, selected);

  if (field.type === '_source') {
    return (
      <FieldButton
        size="s"
        className="dscSidebarItem"
        dataTestSubj={`field-${field.name}-showDetails`}
        fieldIcon={dscFieldIcon}
        fieldAction={actionButton}
        fieldName={fieldName}
      />
    );
  }

  const shouldRenderMultiFields = !!multiFields;
  const renderMultiFields = () => {
    if (!multiFields) {
      return null;
    }
    return (
      <React.Fragment>
        <EuiTitle size="xs">
          <h5>
            {i18n.translate('discover.fieldChooser.discoverField.multiFields', {
              defaultMessage: 'Multi fields',
            })}
          </h5>
        </EuiTitle>
        {multiFields.map((multiField) => (
          <FieldButton
            size="s"
            className="dscSidebarItem"
            isActive={false}
            onClick={() => {}}
            dataTestSubj={`field-${multiField.name}-showDetails`}
            fieldIcon={getDscFieldIcon(multiField)}
            fieldAction={getActionButton(multiField, false)}
            fieldName={getFieldName(multiField)}
          />
        ))}
      </React.Fragment>
    );
  };

  return (
    <EuiPopover
      ownFocus
      display="block"
      button={
        <FieldButton
          size="s"
          className="dscSidebarItem"
          isActive={infoIsOpen}
          onClick={() => {
            togglePopover();
          }}
          dataTestSubj={`field-${field.name}-showDetails`}
          fieldIcon={dscFieldIcon}
          fieldAction={actionButton}
          fieldName={fieldName}
        />
      }
      isOpen={infoIsOpen}
      closePopover={() => setOpen(false)}
      anchorPosition="rightUp"
      panelClassName="dscSidebarItem__fieldPopoverPanel"
    >
      <EuiPopoverTitle style={{ textTransform: 'none' }}>{field.displayName}</EuiPopoverTitle>
      <EuiTitle size="xs">
        <h5>
          {i18n.translate('discover.fieldChooser.discoverField.fieldTopValuesLabel', {
            defaultMessage: 'Top 5 values',
          })}
        </h5>
      </EuiTitle>
      {infoIsOpen && (
        <DiscoverFieldDetails
          indexPattern={indexPattern}
          field={field}
          details={getDetails(field)}
          onAddFilter={onAddFilter}
          trackUiMetric={trackUiMetric}
          showFooter={!shouldRenderMultiFields}
        />
      )}
      {shouldRenderMultiFields ? renderMultiFields() : null}
      {shouldRenderMultiFields ? (
        <DiscoverFieldDetailsFooter
          indexPattern={indexPattern}
          field={field}
          details={getDetails(field)}
          onAddFilter={onAddFilter}
        />
      ) : null}
    </EuiPopover>
  );
}
