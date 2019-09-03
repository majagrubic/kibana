/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { mount } from 'enzyme';
import React from 'react';
import { TestingContext } from '../../../test';
import { Scrubber } from '../scrubber.container';
import {
  getScrubberSlideContainer as container,
  getRenderedElement as element,
} from '../../../test/selectors';

describe('<Scrubber />', () => {
  test('null workpad renders nothing', () => {
    expect(mount(<Scrubber />).isEmptyRender());
  });

  const wrapper = mount(
    <TestingContext>
      <Scrubber />
    </TestingContext>
  );

  test('renders as expected', () => {
    expect(container(wrapper).children().length === 1);
    expect(element(wrapper).text()).toEqual('markdown mock');
  });
});
