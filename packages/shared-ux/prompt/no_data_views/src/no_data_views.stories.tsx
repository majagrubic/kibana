/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { NoDataViewsPrompt as NoDataViewsPromptComponent } from './no_data_views.component';
import { NoDataViewsPrompt } from './no_data_views';
import { NoDataViewsPromptProvider } from './services';

import mdx from '../README.mdx';
import { Params, getStoryArgTypes, getStoryServices } from './mocks';

const argTypes = getStoryArgTypes();

export default {
  title: 'No Data/Prompt',
  description: 'A component to display when there are no user-created data views available.',
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const NoDataViews = (params: Params) => {
  return (
    <NoDataViewsPromptProvider {...getStoryServices(params)}>
      <NoDataViewsPrompt onDataViewCreated={action('onDataViewCreated')} />
    </NoDataViewsPromptProvider>
  );
};

NoDataViews.argTypes = argTypes;

const componentArgTypes = {
  ...argTypes,
  emptyPromptColor: {
    options: [
      'plain',
      'transparent',
      'subdued',
      'accent',
      'primary',
      'success',
      'warning',
      'danger',
    ],
    control: { type: 'select' },
    defaultValue: 'plain',
  },
};

export const NoDataViewsComponent = (params: Record<keyof typeof componentArgTypes, any>) => {
  return <NoDataViewsPromptComponent {...params} />;
};

NoDataViewsComponent.play = async ({
  args,
  canvasElement,
}: {
  args: Record<keyof typeof componentArgTypes, any>;
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);

  const createDataViewButton = canvas.getByRole('button');
  await userEvent.click(createDataViewButton);

  expect(args.onClickCreate).toHaveBeenCalled();
};

NoDataViewsComponent.argTypes = componentArgTypes;
