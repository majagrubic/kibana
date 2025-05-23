/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { Position } from '@elastic/charts';
import { euiLightVars } from '@kbn/ui-theme';
import { FieldFormat, FormatFactory } from '@kbn/field-formats-plugin/common';
import { groupBy, orderBy } from 'lodash';
import {
  IconPosition,
  ReferenceLineConfig,
  FillStyle,
  ExtendedReferenceLineDecorationConfig,
  ReferenceLineDecorationConfig,
  CommonXYReferenceLineLayerConfig,
} from '../../../common/types';
import { FillStyles } from '../../../common/constants';
import {
  GroupsConfiguration,
  mapVerticalToHorizontalPlacement,
  Marker,
  MarkerBody,
  getAxisPosition,
  getOriginalAxisPosition,
  AxesMap,
  isReferenceLine,
} from '../../helpers';
import type { ReferenceLineAnnotationConfig } from './reference_line_annotations';

// if there's just one axis, put it on the other one
// otherwise use the same axis
// this function assume the chart is vertical
export function getBaseIconPlacement(
  iconPosition: IconPosition | undefined,
  axesMap?: AxesMap,
  position?: Position
) {
  if (iconPosition === 'auto') {
    if (position === Position.Bottom) {
      return Position.Top;
    }
    if (axesMap) {
      if (position === Position.Left) {
        return axesMap.right ? Position.Left : Position.Right;
      }

      return axesMap.left ? Position.Right : Position.Left;
    }
  }

  if (iconPosition === 'left') {
    return Position.Left;
  }
  if (iconPosition === 'right') {
    return Position.Right;
  }
  if (iconPosition === 'below') {
    return Position.Bottom;
  }
  return Position.Top;
}

export const getSharedStyle = (config: ReferenceLineAnnotationConfig) => ({
  strokeWidth: config.lineWidth || 1,
  stroke: config.color || euiLightVars.euiColorDarkShade,
  dash:
    config.lineStyle === 'dashed'
      ? [(config.lineWidth || 1) * 3, config.lineWidth || 1]
      : config.lineStyle === 'dotted'
      ? [config.lineWidth || 1, config.lineWidth || 1]
      : config.lineStyle === 'dot-dashed'
      ? [
          (config.lineWidth || 1) * 5,
          config.lineWidth || 1,
          config.lineWidth || 1,
          config.lineWidth || 1,
        ]
      : undefined,
});

export const getLineAnnotationProps = (
  config: ReferenceLineAnnotationConfig,
  label: string | undefined,
  axesMap: AxesMap,
  isHorizontal: boolean,
  isTextOnlyMarker: boolean
) => {
  // get the position for vertical chart
  const markerPositionVertical = getBaseIconPlacement(
    config.iconPosition,
    axesMap,
    getOriginalAxisPosition(config.axisGroup?.position ?? Position.Bottom, isHorizontal)
  );

  const markerPosition = isHorizontal
    ? mapVerticalToHorizontalPlacement(markerPositionVertical)
    : markerPositionVertical;

  const isMarkerLabelHorizontal =
    markerPosition === Position.Bottom || markerPosition === Position.Top;

  return {
    groupId: config.axisGroup?.groupId || 'bottom',
    marker: (
      <Marker
        config={config}
        label={label}
        isHorizontal={isMarkerLabelHorizontal}
        hasReducedPadding={isTextOnlyMarker}
      />
    ),
    markerBody:
      config.textVisibility && !isTextOnlyMarker && label ? (
        <MarkerBody label={label} isHorizontal={isMarkerLabelHorizontal} />
      ) : undefined,
    // rotate the position if required
    markerPosition,
  };
};

export const getBottomRect = (
  headerLabel: string | undefined,
  isFillAbove: boolean,
  formatter: FieldFormat | undefined,
  currentValue?: number,
  nextValue?: number
) => ({
  coordinates: {
    x0: isFillAbove ? currentValue : nextValue,
    y0: undefined,
    x1: isFillAbove ? nextValue : currentValue,
    y1: undefined,
  },
  header: headerLabel,
  details: formatter?.convert(currentValue) || currentValue?.toString(),
});

export const getHorizontalRect = (
  headerLabel: string | undefined,
  isFillAbove: boolean,
  formatter: FieldFormat | undefined,
  currentValue?: number,
  nextValue?: number
) => ({
  coordinates: {
    x0: undefined,
    y0: isFillAbove ? currentValue : nextValue,
    x1: undefined,
    y1: isFillAbove ? nextValue : currentValue,
  },
  header: headerLabel,
  details: formatter?.convert(currentValue) || currentValue?.toString(),
});

const sortReferenceLinesByGroup = (referenceLines: ReferenceLineConfig[], group: FillStyle) => {
  if (group === FillStyles.ABOVE || group === FillStyles.BELOW) {
    const order = group === FillStyles.ABOVE ? 'asc' : 'desc';
    return orderBy(referenceLines, ({ decorations: [{ value }] }) => value, [order]);
  }
  return referenceLines;
};

export const getNextValuesForReferenceLines = (referenceLines: ReferenceLineConfig[]) => {
  const grouppedReferenceLines = groupBy(
    referenceLines,
    ({ decorations: [decorationConfig] }) => decorationConfig.fill
  );
  const groups = Object.keys(grouppedReferenceLines) as FillStyle[];

  return groups.reduce<Record<FillStyle, Record<string, number | undefined>>>(
    (nextValueByDirection, group) => {
      const sordedReferenceLines = sortReferenceLinesByGroup(grouppedReferenceLines[group], group);

      const nv = sordedReferenceLines.reduce<Record<string, number | undefined>>(
        (nextValues, referenceLine, index, lines) => {
          let nextValue: number | undefined;
          if (index < lines.length - 1) {
            const [decorationConfig] = lines[index + 1].decorations;
            nextValue = decorationConfig.value;
          }

          return { ...nextValues, [referenceLine.layerId]: nextValue };
        },
        {}
      );

      return { ...nextValueByDirection, [group]: nv };
    },
    {} as Record<FillStyle, Record<string, number>>
  );
};

export const computeChartMargins = (
  referenceLinePaddings: Partial<Record<Position, number>>,
  labelVisibility: Partial<Record<'x' | 'yLeft' | 'yRight', boolean>>,
  titleVisibility: Partial<Record<'x' | 'yLeft' | 'yRight', boolean>>,
  axesMap: AxesMap,
  isHorizontal: boolean
) => {
  const result: Partial<Record<Position, number>> = {};
  if (!labelVisibility?.x && !titleVisibility?.x && referenceLinePaddings.bottom) {
    const placement = isHorizontal ? mapVerticalToHorizontalPlacement('bottom') : 'bottom';
    result[placement] = referenceLinePaddings.bottom;
  }
  if (
    referenceLinePaddings.left &&
    (isHorizontal || !axesMap.left || (!labelVisibility?.yLeft && !titleVisibility?.yLeft))
  ) {
    const placement = isHorizontal ? mapVerticalToHorizontalPlacement('left') : 'left';
    result[placement] = referenceLinePaddings.left;
  }
  if (
    referenceLinePaddings.right &&
    (isHorizontal || !axesMap.right || (!labelVisibility?.yRight && !titleVisibility?.yRight))
  ) {
    const placement = isHorizontal ? mapVerticalToHorizontalPlacement('right') : 'right';
    result[placement] = referenceLinePaddings.right;
  }
  // there's no top axis, so just check if a margin has been computed
  if (referenceLinePaddings.top) {
    const placement = isHorizontal ? mapVerticalToHorizontalPlacement('top') : 'top';
    result[placement] = referenceLinePaddings.top;
  }

  return result;
};

export function getAxisGroupForReferenceLine(
  axesConfiguration: GroupsConfiguration,
  decorationConfig: ReferenceLineDecorationConfig | ExtendedReferenceLineDecorationConfig,
  shouldRotate: boolean
) {
  return axesConfiguration.find(
    (axis) =>
      (decorationConfig.axisId && axis.groupId.includes(decorationConfig.axisId)) ||
      getAxisPosition(decorationConfig.position ?? Position.Left, shouldRotate) === axis.position
  );
}

export type FormattersMap = Record<string, FieldFormat>;

export function getReferenceLinesFormattersMap(
  referenceLinesLayers: CommonXYReferenceLineLayerConfig[],
  formatFactory: FormatFactory
): FormattersMap {
  const formattersMap: Record<string, FieldFormat> = {};
  for (const layer of referenceLinesLayers) {
    if (isReferenceLine(layer)) {
      for (const { valueMeta, forAccessor } of layer.decorations) {
        if (valueMeta?.params?.params?.formatOverride) {
          formattersMap[forAccessor] = formatFactory(valueMeta.params);
        }
      }
    } else {
      for (const { forAccessor } of layer.decorations || []) {
        const columnFormat = layer.table.columns.find(({ id }) => id === forAccessor)?.meta.params;
        if (columnFormat?.params?.formatOverride) {
          formattersMap[forAccessor] = formatFactory(columnFormat);
        }
      }
    }
  }
  return formattersMap;
}
