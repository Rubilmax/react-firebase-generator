import {
  NormalizedSchema,
  schema,
  normalize as normalizr,
  denormalize as denormalizr,
} from 'normalizr';
import isEqual from 'react-fast-compare';
import { createSelectorCreator, defaultMemoize } from 'reselect';

const userSchema = new schema.Entity<User>('users');

const normalizeSchema = {
  user: [userSchema],
};

export const normalize = (values: {
  users?: WithId<IUser>[];
}): NormalizedSchema<NormalizedEntities, NormalizedResult> => normalizr(values, normalizeSchema);

export const denormalize = (
  ids: NormalizedResult,
  entities: Partial<NormalizedEntities>,
): DenormalizedEntities => denormalizr(ids, normalizeSchema, entities);

export const denormalizeAll = <T extends Partial<NormalizedEntities>>(
  key: keyof T,
  entities: T,
): DenormalizedEntities => denormalize({ [key]: Object.keys({ ...entities[key] }) }, entities);

export const createDeepSelector = createSelectorCreator(defaultMemoize, isEqual);
export const identity = <T>(res: T) => res;
