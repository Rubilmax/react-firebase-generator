import {
  NormalizedSchema,
  schema,
  normalize as normalizr,
  denormalize as denormalizr,
} from 'normalizr';

const dataSchema = new schema.Entity<never>('datas');

const normalizeSchema = {
  data: [dataSchema],
};

export const normalize = (values: {
  //   data?: WithId<never>[];
}): NormalizedSchema<NormalizedEntities, NormalizedResult> => normalizr(values, normalizeSchema);

export const denormalize = (ids: NormalizedResult, entities: any): DenormalizedEntities =>
  denormalizr(ids, normalizeSchema, entities);
