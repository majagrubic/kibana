/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { useEffect, useState } from 'react';
import { EuiLoadingElastic } from '@elastic/eui';
import { useData } from '@kbn/shared-ux-services';
import { NoDataConfigPage, NoDataPageProps } from '../page_template';
import { NoDataViews } from './no_data_views';

export interface Props {
  onDataViewCreated: (dataView: unknown) => void;
  noDataConfig: NoDataPageProps;
}

export const KibanaNoDataPage = ({ onDataViewCreated, noDataConfig }: Props) => {
  const { hasESData, hasUserDataView } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [dataExists, setDataExists] = useState(false);
  const [hasUserDataViews, setHasUserDataViews] = useState(false);

  useEffect(() => {
    const checkData = async () => {
      setDataExists(await hasESData());
      setHasUserDataViews(await hasUserDataView());
      setIsLoading(false);
    };
    // TODO: add error handling
    // https://github.com/elastic/kibana/issues/130913
    checkData().catch(() => {
      setIsLoading(false);
    });
  }, [hasESData, hasUserDataView]);

  if (isLoading) {
    return <EuiLoadingElastic css={{ alignSelf: 'center', justifySelf: 'center' }} size="xxl" />;
  }

  if (!dataExists) {
    return <NoDataConfigPage noDataConfig={noDataConfig} />;
  }

  if (!hasUserDataViews) {
    return <NoDataViews onDataViewCreated={onDataViewCreated} />;
  }

  return null;
};
