/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { flow, omit } from 'lodash';
import { SavedObjectMigrationFn } from 'kibana/server';
import moment from "moment";

const migrateAttributeTypeAndAttributeTypeMeta: SavedObjectMigrationFn<any, any> = (doc) => ({
  ...doc,
  attributes: {
    ...doc.attributes,
    type: doc.attributes.type || undefined,
    typeMeta: doc.attributes.typeMeta || undefined,
  },
});

const migrateSubTypeAndParentFieldProperties: SavedObjectMigrationFn<any, any> = (doc) => {
  if (!doc.attributes.fields) return doc;

  const fieldsString = doc.attributes.fields;
  const fields = JSON.parse(fieldsString) as any[];
  const migratedFields = fields.map((field) => {
    if (field.subType === 'multi') {
      return {
        ...omit(field, 'parent'),
        subType: { multi: { parent: field.parent } },
      };
    }

    return field;
  });

  return {
    ...doc,
    attributes: {
      ...doc.attributes,
      fields: JSON.stringify(migratedFields),
    },
  };
};

const addAllowNoIndex: SavedObjectMigrationFn<any, any> = (doc) => ({
  ...doc,
  attributes: {
    ...doc.attributes,
    allowNoIndex: doc.id === 'logs-*' || doc.id === 'metrics-*' || undefined,
  },
});

const addDescription: SavedObjectMigrationFn<any, any> = (doc) => ({
  ...doc,
  attributes: {
    ...doc.attributes,
    description: doc.attributes.description || '',
    created_at: doc.attributes.createdAt || moment().utc().toISOString(),
  },
});

export const indexPatternSavedObjectTypeMigrations = {
  '6.5.0': flow(migrateAttributeTypeAndAttributeTypeMeta),
  '7.6.0': flow(migrateSubTypeAndParentFieldProperties),
  '7.11.0': flow(addAllowNoIndex),
  '7.16.0': flow(addDescription),
};
