declare type WithId<T extends object> = T & { id: string };
declare type WithoutId<T extends object> = Omit<T, 'id'>;

declare interface ByIds<T extends object> {
  [id: string]: WithId<T>;
}

declare interface NormalizedState<T extends object> {
  allIds: string[];
  byIds: ByIds<T>;
  isCreating: boolean;
  isFetching: string[];
  isUpdating: string;
  isDeleting: string;
}

declare interface NormalizedEntities {}

declare interface NormalizedResult {}

declare interface DenormalizedEntities {}
