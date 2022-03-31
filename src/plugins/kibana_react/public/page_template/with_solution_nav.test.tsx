/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { shallow } from 'enzyme';
import React from 'react';
import { withSolutionNav } from './with_solution_nav';
import { KibanaPageTemplateProps } from './page_template';
import { KibanaPageTemplateSolutionNavProps } from './solution_nav';

const TestComponent = (props: KibanaPageTemplateProps) => {
  return <div>This is a wrapped component</div>;
};

const WithSolutionNavTestComponent = withSolutionNav(TestComponent);

const items: KibanaPageTemplateSolutionNavProps['items'] = [
  {
    name: 'Ingest',
    id: '1',
    items: [
      {
        name: 'Ingest Node Pipelines',
        id: '1.1',
      },
      {
        name: 'Logstash Pipelines',
        id: '1.2',
      },
      {
        name: 'Beats Central Management',
        id: '1.3',
      },
    ],
  },
  {
    name: 'Data',
    id: '2',
    items: [
      {
        name: 'Index Management',
        id: '2.1',
      },
      {
        name: 'Index Lifecycle Policies',
        id: '2.2',
      },
      {
        name: 'Snapshot and Restore',
        id: '2.3',
      },
    ],
  },
];

const solutionNav: KibanaPageTemplateSolutionNavProps = {
  items,
  name: 'Kibana',
  isOpenOnDesktop: false,
  isOpenOnMobile: false,
};

describe('WithSolutionNav', () => {
  test('renders wrapped component', () => {
    const component = shallow(<WithSolutionNavTestComponent solutionNav={solutionNav} />);
    expect(component).toMatchSnapshot();
  });
});
