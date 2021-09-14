/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const largePayload = {
  datatable: {
    type: 'datatable',
    columns: [
      {
        name: '@timestamp',
        type: 'date',
      },
      {
        name: 'time',
        type: 'date',
      },
      {
        name: 'cost',
        type: 'number',
      },
      {
        name: 'username',
        type: 'string',
      },
      {
        name: 'price',
        type: 'number',
      },
      {
        name: 'age',
        type: 'number',
      },
      {
        name: 'country',
        type: 'string',
      },
      {
        name: 'state',
        type: 'string',
      },
      {
        name: 'project',
        type: 'string',
      },
      {
        name: 'percent_uptime',
        type: 'number',
      },
    ],
    rows: [
      {
        age: 63,
        cost: 32.15,
        country: 'US',
        price: 53,
        project: 'elasticsearch',
        state: 'running',
        time: 1546334211208,
        '@timestamp': 1546334211208,
        username: 'aevans2e',
        percent_uptime: 0.83,
      },
      {
        age: 68,
        cost: 20.52,
        country: 'JP',
        price: 33,
        project: 'beats',
        state: 'done',
        time: 1546351551031,
        '@timestamp': 1546351551031,
        username: 'aking2c',
        percent_uptime: 0.9,
      },
      {
        age: 57,
        cost: 21.15,
        country: 'UK',
        price: 59,
        project: 'apm',
        state: 'running',
        time: 1546352631083,
        '@timestamp': 1546352631083,
        username: 'mmoore2o',
        percent_uptime: 0.96,
      },
      {
        age: 73,
        cost: 35.64,
        country: 'CN',
        price: 71,
        project: 'machine-learning',
        state: 'start',
        time: 1546402490956,
        '@timestamp': 1546402490956,
        username: 'wrodriguez1r',
        percent_uptime: 0.61,
      },
      {
        age: 38,
        cost: 27.19,
        country: 'TZ',
        price: 36,
        project: 'kibana',
        state: 'done',
        time: 1546467111351,
        '@timestamp': 1546467111351,
        username: 'wrodriguez1r',
        percent_uptime: 0.72,
      },
      {
        age: 61,
        cost: 49.95,
        country: 'NL',
        price: 65,
        project: 'machine-learning',
        state: 'start',
        time: 1546473771019,
        '@timestamp': 1546473771019,
        username: 'mmoore2o',
        percent_uptime: 0.72,
      },
      {
        age: 53,
        cost: 27.36,
        country: 'JP',
        price: 60,
        project: 'x-pack',
        state: 'running',
        time: 1546482171310,
        '@timestamp': 1546482171310,
        username: 'hcrawford2h',
        percent_uptime: 0.65,
      },
      {
        age: 31,
        cost: 33.77,
        country: 'AZ',
        price: 77,
        project: 'kibana',
        state: 'start',
        time: 1546493451206,
        '@timestamp': 1546493451206,
        username: 'aking2c',
        percent_uptime: 0.92,
      },
      {
        age: 71,
        cost: 20.2,
        country: 'TZ',
        price: 57,
        project: 'swiftype',
        state: 'running',
        time: 1546494651235,
        '@timestamp': 1546494651235,
        username: 'jlawson2p',
        percent_uptime: 0.59,
      },
      {
        age: 54,
        cost: 36.65,
        country: 'TZ',
        price: 72,
        project: 'apm',
        state: 'done',
        time: 1546498431195,
        '@timestamp': 1546498431195,
        username: 'aking2c',
        percent_uptime: 1,
      },
      {
        age: 31,
        cost: 26.57,
        country: 'BR',
        price: 48,
        project: 'logstash',
        state: 'done',
        time: 1546509170962,
        '@timestamp': 1546509170962,
        username: 'hcrawford2h',
        percent_uptime: 0.86,
      },
      {
        age: 99,
        cost: 22.46,
        country: 'TZ',
        price: 66,
        project: 'swiftype',
        state: 'done',
        time: 1546552371305,
        '@timestamp': 1546552371305,
        username: 'bmorris2n',
        percent_uptime: 0.76,
      },
      {
        age: 87,
        cost: 21.54,
        country: 'US',
        price: 43,
        project: 'machine-learning',
        state: 'start',
        time: 1546575231270,
        '@timestamp': 1546575231270,
        username: 'sadams1v',
        percent_uptime: 0.58,
      },
      {
        age: 10,
        cost: 37.68,
        country: 'CN',
        price: 36,
        project: 'x-pack',
        state: 'done',
        time: 1546678071026,
        '@timestamp': 1546678071026,
        username: 'jchavez2a',
        percent_uptime: 0.5,
      },
      {
        age: 30,
        cost: 21.62,
        country: 'DE',
        price: 78,
        project: 'machine-learning',
        state: 'running',
        time: 1546678911351,
        '@timestamp': 1546678911351,
        username: 'kbrooks23',
        percent_uptime: 1,
      },
      {
        age: 49,
        cost: 26.46,
        country: 'BR',
        price: 76,
        project: 'swiftype',
        state: 'start',
        time: 1546701050984,
        '@timestamp': 1546701050984,
        username: 'sadams1v',
        percent_uptime: 0.97,
      },
      {
        age: 81,
        cost: 36.69,
        country: 'TZ',
        price: 80,
        project: 'logstash',
        state: 'done',
        time: 1546702851232,
        '@timestamp': 1546702851232,
        username: 'smurphy1y',
        percent_uptime: 0.92,
      },
      {
        age: 68,
        cost: 28.74,
        country: 'DE',
        price: 56,
        project: 'machine-learning',
        state: 'running',
        time: 1546712451326,
        '@timestamp': 1546712451326,
        username: 'wmontgomery22',
        percent_uptime: 0.85,
      },
      {
        age: 28,
        cost: 21.3,
        country: 'SA',
        price: 72,
        project: 'apm',
        state: 'start',
        time: 1546728771027,
        '@timestamp': 1546728771027,
        username: 'hbowman1s',
        percent_uptime: 0.79,
      },
      {
        age: 57,
        cost: 28.72,
        country: 'UK',
        price: 34,
        project: 'machine-learning',
        state: 'done',
        time: 1546738610972,
        '@timestamp': 1546738610972,
        username: 'pjohnston2l',
        percent_uptime: 0.6,
      },
      {
        age: 35,
        cost: 48.87,
        country: 'US',
        price: 78,
        project: 'apm',
        state: 'running',
        time: 1546761591244,
        '@timestamp': 1546761591244,
        username: 'bfranklin27',
        percent_uptime: 0.52,
      },
      {
        age: 89,
        cost: 29.48,
        country: 'TZ',
        price: 69,
        project: 'beats',
        state: 'done',
        time: 1546791771183,
        '@timestamp': 1546791771183,
        username: 'ccarpenter2m',
        percent_uptime: 0.72,
      },
      {
        age: 14,
        cost: 28.94,
        country: 'BR',
        price: 49,
        project: 'elasticsearch',
        state: 'running',
        time: 1546886211287,
        '@timestamp': 1546886211287,
        username: 'pjohnston2l',
        percent_uptime: 0.75,
      },
      {
        age: 39,
        cost: 27.16,
        country: 'CN',
        price: 49,
        project: 'elasticsearch',
        state: 'start',
        time: 1546934631129,
        '@timestamp': 1546934631129,
        username: 'jlawson2p',
        percent_uptime: 0.7,
      },
      {
        age: 84,
        cost: 35.6,
        country: 'NL',
        price: 76,
        project: 'swiftype',
        state: 'running',
        time: 1546948431271,
        '@timestamp': 1546948431271,
        username: 'hbowman1s',
        percent_uptime: 0.72,
      },
      {
        age: 54,
        cost: 27.08,
        country: 'AZ',
        price: 49,
        project: 'x-pack',
        state: 'start',
        time: 1546986231297,
        '@timestamp': 1546986231297,
        username: 'krobinson2b',
        percent_uptime: 0.89,
      },
      {
        age: 58,
        cost: 26.9,
        country: 'DE',
        price: 43,
        project: 'apm',
        state: 'start',
        time: 1547041191338,
        '@timestamp': 1547041191338,
        username: 'hperez29',
        percent_uptime: 0.63,
      },
      {
        age: 26,
        cost: 48.27,
        country: 'DE',
        price: 36,
        project: 'machine-learning',
        state: 'start',
        time: 1547118111126,
        '@timestamp': 1547118111126,
        username: 'sadams1v',
        percent_uptime: 0.56,
      },
      {
        age: 82,
        cost: 32.13,
        country: 'SA',
        price: 79,
        project: 'elasticsearch',
        state: 'done',
        time: 1547159331136,
        '@timestamp': 1547159331136,
        username: 'dhicks28',
        percent_uptime: 0.71,
      },
      {
        age: 26,
        cost: 20.59,
        country: 'UK',
        price: 52,
        project: 'kibana',
        state: 'done',
        time: 1547174150962,
        '@timestamp': 1547174150962,
        username: 'greynolds2j',
        percent_uptime: 0.94,
      },
      {
        age: 19,
        cost: 25.73,
        country: 'RU',
        price: 45,
        project: 'beats',
        state: 'start',
        time: 1547205411225,
        '@timestamp': 1547205411225,
        username: 'sadams1v',
        percent_uptime: 0.6,
      },
      {
        age: 53,
        cost: 46.19,
        country: 'JP',
        price: 30,
        project: 'apm',
        state: 'done',
        time: 1547217171103,
        '@timestamp': 1547217171103,
        username: 'jlawson2p',
        percent_uptime: 0.54,
      },
      {
        age: 76,
        cost: 40.52,
        country: 'DE',
        price: 43,
        project: 'machine-learning',
        state: 'start',
        time: 1547261271103,
        '@timestamp': 1547261271103,
        username: 'athomas1w',
        percent_uptime: 0.86,
      },
      {
        age: 31,
        cost: 27.62,
        country: 'BR',
        price: 71,
        project: 'machine-learning',
        state: 'start',
        time: 1547262771238,
        '@timestamp': 1547262771238,
        username: 'jhanson1x',
        percent_uptime: 0.79,
      },
      {
        age: 42,
        cost: 30.91,
        country: 'US',
        price: 58,
        project: 'beats',
        state: 'running',
        time: 1547274291106,
        '@timestamp': 1547274291106,
        username: 'amartinez26',
        percent_uptime: 0.82,
      },
      {
        age: 43,
        cost: 23.29,
        country: 'UK',
        price: 41,
        project: 'kibana',
        state: 'start',
        time: 1547293010955,
        '@timestamp': 1547293010955,
        username: 'ediaz2d',
        percent_uptime: 0.93,
      },
      {
        age: 45,
        cost: 21.18,
        country: 'AZ',
        price: 62,
        project: 'logstash',
        state: 'done',
        time: 1547316050970,
        '@timestamp': 1547316050970,
        username: 'hperez29',
        percent_uptime: 0.75,
      },
      {
        age: 39,
        cost: 29.66,
        country: 'IN',
        price: 40,
        project: 'swiftype',
        state: 'start',
        time: 1547320011249,
        '@timestamp': 1547320011249,
        username: 'hcrawford2h',
        percent_uptime: 0.99,
      },
      {
        age: 98,
        cost: 37.42,
        country: 'US',
        price: 58,
        project: 'beats',
        state: 'done',
        time: 1547331051346,
        '@timestamp': 1547331051346,
        username: 'jmills21',
        percent_uptime: 0.51,
      },
      {
        age: 96,
        cost: 40,
        country: 'DE',
        price: 58,
        project: 'apm',
        state: 'start',
        time: 1547425371273,
        '@timestamp': 1547425371273,
        username: 'rsmith25',
        percent_uptime: 0.87,
      },
      {
        age: 13,
        cost: 47.45,
        country: 'AZ',
        price: 30,
        project: 'apm',
        state: 'done',
        time: 1547482911215,
        '@timestamp': 1547482911215,
        username: 'smurphy1y',
        percent_uptime: 0.83,
      },
      {
        age: 100,
        cost: 24.36,
        country: 'IN',
        price: 59,
        project: 'apm',
        state: 'done',
        time: 1547485611233,
        '@timestamp': 1547485611233,
        username: 'jlawson2p',
        percent_uptime: 0.64,
      },
      {
        age: 10,
        cost: 27.59,
        country: 'US',
        price: 53,
        project: 'apm',
        state: 'start',
        time: 1547518911272,
        '@timestamp': 1547518911272,
        username: 'wmontgomery22',
        percent_uptime: 0.93,
      },
      {
        age: 83,
        cost: 37.05,
        country: 'BR',
        price: 77,
        project: 'logstash',
        state: 'running',
        time: 1547521971300,
        '@timestamp': 1547521971300,
        username: 'hperez29',
        percent_uptime: 0.53,
      },
      {
        age: 60,
        cost: 31.19,
        country: 'CN',
        price: 69,
        project: 'kibana',
        state: 'running',
        time: 1547555751264,
        '@timestamp': 1547555751264,
        username: 'aevans2e',
        percent_uptime: 0.99,
      },
      {
        age: 61,
        cost: 27.69,
        country: 'JP',
        price: 39,
        project: 'elasticsearch',
        state: 'start',
        time: 1547564691226,
        '@timestamp': 1547564691226,
        username: 'greynolds2j',
        percent_uptime: 0.72,
      },
      {
        age: 89,
        cost: 33.03,
        country: 'JP',
        price: 75,
        project: 'machine-learning',
        state: 'done',
        time: 1547581671013,
        '@timestamp': 1547581671013,
        username: 'aevans2e',
        percent_uptime: 0.88,
      },
      {
        age: 45,
        cost: 40.38,
        country: 'JP',
        price: 76,
        project: 'x-pack',
        state: 'start',
        time: 1547582451365,
        '@timestamp': 1547582451365,
        username: 'wrodriguez1r',
        percent_uptime: 0.65,
      },
      {
        age: 62,
        cost: 29.53,
        country: 'AZ',
        price: 46,
        project: 'machine-learning',
        state: 'running',
        time: 1547598471186,
        '@timestamp': 1547598471186,
        username: 'aking2c',
        percent_uptime: 0.93,
      },
      {
        age: 69,
        cost: 45.37,
        country: 'AZ',
        price: 35,
        project: 'machine-learning',
        state: 'start',
        time: 1547599370965,
        '@timestamp': 1547599370965,
        username: 'jlawson2p',
        percent_uptime: 0.82,
      },
      {
        age: 46,
        cost: 39.71,
        country: 'UK',
        price: 39,
        project: 'machine-learning',
        state: 'done',
        time: 1547650491235,
        '@timestamp': 1547650491235,
        username: 'wmontgomery22',
        percent_uptime: 0.99,
      },
      {
        age: 62,
        cost: 38.21,
        country: 'SA',
        price: 31,
        project: 'x-pack',
        state: 'start',
        time: 1547667891326,
        '@timestamp': 1547667891326,
        username: 'greynolds2j',
        percent_uptime: 0.73,
      },
      {
        age: 46,
        cost: 28.44,
        country: 'TZ',
        price: 75,
        project: 'apm',
        state: 'running',
        time: 1547685471027,
        '@timestamp': 1547685471027,
        username: 'aking2c',
        percent_uptime: 0.7,
      },
      {
        age: 85,
        cost: 30.5,
        country: 'JP',
        price: 30,
        project: 'beats',
        state: 'running',
        time: 1547694951230,
        '@timestamp': 1547694951230,
        username: 'sjordan2k',
        percent_uptime: 0.5,
      },
      {
        age: 51,
        cost: 27.1,
        country: 'DE',
        price: 37,
        project: 'kibana',
        state: 'done',
        time: 1547699331145,
        '@timestamp': 1547699331145,
        username: 'wmontgomery22',
        percent_uptime: 0.79,
      },
      {
        age: 84,
        cost: 36.47,
        country: 'TZ',
        price: 43,
        project: 'logstash',
        state: 'start',
        time: 1547729571155,
        '@timestamp': 1547729571155,
        username: 'jchavez2a',
        percent_uptime: 0.67,
      },
      {
        age: 66,
        cost: 37.74,
        country: 'PH',
        price: 63,
        project: 'x-pack',
        state: 'start',
        time: 1547738331360,
        '@timestamp': 1547738331360,
        username: 'ccarpenter2m',
        percent_uptime: 0.74,
      },
      {
        age: 87,
        cost: 49.07,
        country: 'BR',
        price: 72,
        project: 'machine-learning',
        state: 'running',
        time: 1547742291143,
        '@timestamp': 1547742291143,
        username: 'hcrawford2h',
        percent_uptime: 0.99,
      },
      {
        age: 92,
        cost: 31.7,
        country: 'TZ',
        price: 55,
        project: 'apm',
        state: 'done',
        time: 1547772651030,
        '@timestamp': 1547772651030,
        username: 'jhanson1x',
        percent_uptime: 0.89,
      },
      {
        age: 98,
        cost: 29.77,
        country: 'US',
        price: 72,
        project: 'logstash',
        state: 'start',
        time: 1547786271226,
        '@timestamp': 1547786271226,
        username: 'wmontgomery22',
        percent_uptime: 0.66,
      },
      {
        age: 10,
        cost: 20.49,
        country: 'DE',
        price: 64,
        project: 'machine-learning',
        state: 'running',
        time: 1547871831230,
        '@timestamp': 1547871831230,
        username: 'dmarshall24',
        percent_uptime: 0.54,
      },
      {
        age: 69,
        cost: 42.89,
        country: 'AZ',
        price: 61,
        project: 'kibana',
        state: 'start',
        time: 1547902191247,
        '@timestamp': 1547902191247,
        username: 'sadams1v',
        percent_uptime: 0.8,
      },
      {
        age: 42,
        cost: 32.31,
        country: 'SA',
        price: 47,
        project: 'swiftype',
        state: 'running',
        time: 1547922591339,
        '@timestamp': 1547922591339,
        username: 'bmorris2n',
        percent_uptime: 0.65,
      },
      {
        age: 100,
        cost: 30.42,
        country: 'BR',
        price: 42,
        project: 'kibana',
        state: 'done',
        time: 1547926491261,
        '@timestamp': 1547926491261,
        username: 'jaustin1z',
        percent_uptime: 0.66,
      },
      {
        age: 34,
        cost: 48.98,
        country: 'DE',
        price: 70,
        project: 'beats',
        state: 'running',
        time: 1547958651364,
        '@timestamp': 1547958651364,
        username: 'jlawson2p',
        percent_uptime: 0.9,
      },
      {
        age: 68,
        cost: 31.64,
        country: 'NL',
        price: 47,
        project: 'machine-learning',
        state: 'done',
        time: 1547967231273,
        '@timestamp': 1547967231273,
        username: 'hbowman1s',
        percent_uptime: 0.55,
      },
      {
        age: 91,
        cost: 46.82,
        country: 'RU',
        price: 62,
        project: 'swiftype',
        state: 'done',
        time: 1547969691305,
        '@timestamp': 1547969691305,
        username: 'wmontgomery22',
        percent_uptime: 0.89,
      },
      {
        age: 17,
        cost: 42.19,
        country: 'IN',
        price: 79,
        project: 'apm',
        state: 'running',
        time: 1547974551309,
        '@timestamp': 1547974551309,
        username: 'hperez29',
        percent_uptime: 0.58,
      },
      {
        age: 83,
        cost: 25.61,
        country: 'CN',
        price: 54,
        project: 'swiftype',
        state: 'running',
        time: 1547977911240,
        '@timestamp': 1547977911240,
        username: 'aking2c',
        percent_uptime: 0.96,
      },
      {
        age: 31,
        cost: 49.49,
        country: 'JP',
        price: 58,
        project: 'elasticsearch',
        state: 'done',
        time: 1547984271197,
        '@timestamp': 1547984271197,
        username: 'dmarshall24',
        percent_uptime: 0.72,
      },
      {
        age: 97,
        cost: 33.33,
        country: 'PH',
        price: 34,
        project: 'logstash',
        state: 'start',
        time: 1547984631153,
        '@timestamp': 1547984631153,
        username: 'hbowman1s',
        percent_uptime: 0.56,
      },
      {
        age: 67,
        cost: 31.1,
        country: 'US',
        price: 73,
        project: 'x-pack',
        state: 'done',
        time: 1548001430974,
        '@timestamp': 1548001430974,
        username: 'ccarpenter2m',
        percent_uptime: 0.78,
      },
      {
        age: 31,
        cost: 21.6,
        country: 'PH',
        price: 73,
        project: 'kibana',
        state: 'running',
        time: 1548014391252,
        '@timestamp': 1548014391252,
        username: 'jmills21',
        percent_uptime: 0.59,
      },
      {
        age: 57,
        cost: 25.84,
        country: 'NL',
        price: 53,
        project: 'swiftype',
        state: 'start',
        time: 1548039051145,
        '@timestamp': 1548039051145,
        username: 'dhicks28',
        percent_uptime: 0.63,
      },
      {
        age: 92,
        cost: 27.09,
        country: 'CN',
        price: 34,
        project: 'apm',
        state: 'done',
        time: 1548052791195,
        '@timestamp': 1548052791195,
        username: 'dramirez2i',
        percent_uptime: 0.98,
      },
      {
        age: 43,
        cost: 36.39,
        country: 'US',
        price: 68,
        project: 'elasticsearch',
        state: 'done',
        time: 1548058071369,
        '@timestamp': 1548058071369,
        username: 'wmontgomery22',
        percent_uptime: 0.55,
      },
      {
        age: 68,
        cost: 44.69,
        country: 'JP',
        price: 66,
        project: 'machine-learning',
        state: 'running',
        time: 1548072471282,
        '@timestamp': 1548072471282,
        username: 'jmills21',
        percent_uptime: 0.68,
      },
      {
        age: 47,
        cost: 25.34,
        country: 'NL',
        price: 32,
        project: 'kibana',
        state: 'running',
        time: 1548075171245,
        '@timestamp': 1548075171245,
        username: 'wrodriguez1r',
        percent_uptime: 0.95,
      },
      {
        age: 19,
        cost: 25.4,
        country: 'SA',
        price: 42,
        project: 'kibana',
        state: 'start',
        time: 1548125331273,
        '@timestamp': 1548125331273,
        username: 'dhicks28',
        percent_uptime: 0.95,
      },
      {
        age: 88,
        cost: 36.38,
        country: 'TZ',
        price: 77,
        project: 'x-pack',
        state: 'start',
        time: 1548126771234,
        '@timestamp': 1548126771234,
        username: 'sjordan2k',
        percent_uptime: 0.84,
      },
      {
        age: 36,
        cost: 28.62,
        country: 'DE',
        price: 34,
        project: 'kibana',
        state: 'start',
        time: 1548128331153,
        '@timestamp': 1548128331153,
        username: 'dramirez2i',
        percent_uptime: 0.72,
      },
      {
        age: 32,
        cost: 48.69,
        country: 'AZ',
        price: 40,
        project: 'swiftype',
        state: 'start',
        time: 1548161391285,
        '@timestamp': 1548161391285,
        username: 'dramirez2i',
        percent_uptime: 0.69,
      },
      {
        age: 53,
        cost: 44.25,
        country: 'UK',
        price: 35,
        project: 'machine-learning',
        state: 'running',
        time: 1548192651185,
        '@timestamp': 1548192651185,
        username: 'wmontgomery22',
        percent_uptime: 0.68,
      },
      {
        age: 37,
        cost: 32.67,
        country: 'DE',
        price: 31,
        project: 'kibana',
        state: 'running',
        time: 1548218751137,
        '@timestamp': 1548218751137,
        username: 'ccarpenter2m',
        percent_uptime: 0.77,
      },
      {
        age: 58,
        cost: 40.83,
        country: 'PH',
        price: 61,
        project: 'logstash',
        state: 'running',
        time: 1548221151061,
        '@timestamp': 1548221151061,
        username: 'dmarshall24',
        percent_uptime: 0.88,
      },
      {
        age: 45,
        cost: 42.97,
        country: 'AZ',
        price: 44,
        project: 'machine-learning',
        state: 'running',
        time: 1548262131313,
        '@timestamp': 1548262131313,
        username: 'dmarshall24',
        percent_uptime: 0.64,
      },
      {
        age: 21,
        cost: 23.16,
        country: 'NL',
        price: 78,
        project: 'machine-learning',
        state: 'start',
        time: 1548265611336,
        '@timestamp': 1548265611336,
        username: 'jlawson2p',
        percent_uptime: 0.88,
      },
      {
        age: 77,
        cost: 31.37,
        country: 'RU',
        price: 52,
        project: 'kibana',
        state: 'start',
        time: 1548274611337,
        '@timestamp': 1548274611337,
        username: 'jhanson1x',
        percent_uptime: 0.68,
      },
      {
        age: 34,
        cost: 41.41,
        country: 'AZ',
        price: 52,
        project: 'elasticsearch',
        state: 'start',
        time: 1548276411368,
        '@timestamp': 1548276411368,
        username: 'agonzales1t',
        percent_uptime: 0.75,
      },
      {
        age: 95,
        cost: 24.93,
        country: 'AZ',
        price: 66,
        project: 'logstash',
        state: 'running',
        time: 1548301071035,
        '@timestamp': 1548301071035,
        username: 'phansen1q',
        percent_uptime: 0.75,
      },
      {
        age: 12,
        cost: 32.33,
        country: 'PH',
        price: 31,
        project: 'elasticsearch',
        state: 'start',
        time: 1548342711164,
        '@timestamp': 1548342711164,
        username: 'amartinez26',
        percent_uptime: 0.96,
      },
      {
        age: 15,
        cost: 44.74,
        country: 'IN',
        price: 41,
        project: 'x-pack',
        state: 'done',
        time: 1548372111228,
        '@timestamp': 1548372111228,
        username: 'rmartinez2g',
        percent_uptime: 0.51,
      },
      {
        age: 83,
        cost: 29.03,
        country: 'DE',
        price: 66,
        project: 'machine-learning',
        state: 'done',
        time: 1548417590970,
        '@timestamp': 1548417590970,
        username: 'agonzales1t',
        percent_uptime: 0.84,
      },
      {
        age: 31,
        cost: 38.12,
        country: 'PH',
        price: 35,
        project: 'logstash',
        state: 'done',
        time: 1548419931271,
        '@timestamp': 1548419931271,
        username: 'lperez2f',
        percent_uptime: 0.69,
      },
      {
        age: 97,
        cost: 38.24,
        country: 'RU',
        price: 32,
        project: 'apm',
        state: 'done',
        time: 1548474651117,
        '@timestamp': 1548474651117,
        username: 'sadams1v',
        percent_uptime: 0.77,
      },
      {
        age: 87,
        cost: 34.16,
        country: 'TZ',
        price: 38,
        project: 'beats',
        state: 'start',
        time: 1548575991155,
        '@timestamp': 1548575991155,
        username: 'bmorris2n',
        percent_uptime: 0.65,
      },
      {
        age: 74,
        cost: 45.69,
        country: 'AZ',
        price: 66,
        project: 'elasticsearch',
        state: 'start',
        time: 1548599391338,
        '@timestamp': 1548599391338,
        username: 'greynolds2j',
        percent_uptime: 0.98,
      },
      {
        age: 83,
        cost: 33.43,
        country: 'BR',
        price: 79,
        project: 'elasticsearch',
        state: 'done',
        time: 1548648171078,
        '@timestamp': 1548648171078,
        username: 'kbrooks23',
        percent_uptime: 0.57,
      },
      {
        age: 89,
        cost: 41.87,
        country: 'SA',
        price: 44,
        project: 'apm',
        state: 'start',
        time: 1548666111256,
        '@timestamp': 1548666111256,
        username: 'hcrawford2h',
        percent_uptime: 0.91,
      },
      {
        age: 83,
        cost: 33.43,
        country: 'BR',
        price: 79,
        project: 'elasticsearch',
        state: 'done',
        time: 1548648171078,
        '@timestamp': 1548648171078,
        username: 'kbrooks23',
        percent_uptime: 0.57,
      },
      {
        age: 89,
        cost: 41.87,
        country: 'SA',
        price: 44,
        project: 'apm',
        state: 'start',
        time: 1548666111256,
        '@timestamp': 1548666111256,
        username: 'hcrawford2h',
        percent_uptime: 0.91,
      },
    ],
  },
  paginate: true,
  perPage: 10,
  showHeader: true,
};

export const smallPayload = {
  datatable: {
    type: 'datatable',
    columns: [
      {
        name: '@timestamp',
        type: 'date',
      },
      {
        name: 'time',
        type: 'date',
      },
      {
        name: 'cost',
        type: 'number',
      },
      {
        name: 'username',
        type: 'string',
      },
      {
        name: 'price',
        type: 'number',
      },
      {
        name: 'age',
        type: 'number',
      },
      {
        name: 'country',
        type: 'string',
      },
      {
        name: 'state',
        type: 'string',
      },
      {
        name: 'project',
        type: 'string',
      },
      {
        name: 'percent_uptime',
        type: 'number',
      },
    ],
    rows: [
      {
        age: 63,
        cost: 32.15,
        country: 'US',
        price: 53,
        project: 'elasticsearch',
        state: 'running',
        time: 1546334211208,
        '@timestamp': 1546334211208,
        username: 'aevans2e',
        percent_uptime: 0.83,
      },
      {
        age: 68,
        cost: 20.52,
        country: 'JP',
        price: 33,
        project: 'beats',
        state: 'done',
        time: 1546351551031,
        '@timestamp': 1546351551031,
        username: 'aking2c',
        percent_uptime: 0.9,
      },
      {
        age: 57,
        cost: 21.15,
        country: 'UK',
        price: 59,
        project: 'apm',
        state: 'running',
        time: 1546352631083,
        '@timestamp': 1546352631083,
        username: 'mmoore2o',
        percent_uptime: 0.96,
      },
      {
        age: 73,
        cost: 35.64,
        country: 'CN',
        price: 71,
        project: 'machine-learning',
        state: 'start',
        time: 1546402490956,
        '@timestamp': 1546402490956,
        username: 'wrodriguez1r',
        percent_uptime: 0.61,
      },
      {
        age: 38,
        cost: 27.19,
        country: 'TZ',
        price: 36,
        project: 'kibana',
        state: 'done',
        time: 1546467111351,
        '@timestamp': 1546467111351,
        username: 'wrodriguez1r',
        percent_uptime: 0.72,
      },
      {
        age: 61,
        cost: 49.95,
        country: 'NL',
        price: 65,
        project: 'machine-learning',
        state: 'start',
        time: 1546473771019,
        '@timestamp': 1546473771019,
        username: 'mmoore2o',
        percent_uptime: 0.72,
      },
      {
        age: 53,
        cost: 27.36,
        country: 'JP',
        price: 60,
        project: 'x-pack',
        state: 'running',
        time: 1546482171310,
        '@timestamp': 1546482171310,
        username: 'hcrawford2h',
        percent_uptime: 0.65,
      },
      {
        age: 31,
        cost: 33.77,
        country: 'AZ',
        price: 77,
        project: 'kibana',
        state: 'start',
        time: 1546493451206,
        '@timestamp': 1546493451206,
        username: 'aking2c',
        percent_uptime: 0.92,
      },
      {
        age: 71,
        cost: 20.2,
        country: 'TZ',
        price: 57,
        project: 'swiftype',
        state: 'running',
        time: 1546494651235,
        '@timestamp': 1546494651235,
        username: 'jlawson2p',
        percent_uptime: 0.59,
      },
      {
        age: 54,
        cost: 36.65,
        country: 'TZ',
        price: 72,
        project: 'apm',
        state: 'done',
        time: 1546498431195,
        '@timestamp': 1546498431195,
        username: 'aking2c',
        percent_uptime: 1,
      },
    ],
  },
  paginate: true,
  perPage: 10,
  showHeader: true,
};
