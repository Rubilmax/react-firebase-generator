declare type WithId<T extends object> = T & { id: string };

declare type WithHistory<T extends object> = T & {
  lastUpdatedAt: string;
  lastUpdatedBy: string;
};

declare interface ByIds<T extends object> {
  [id: string]: WithId<T>;
}

declare interface NormalizedState<T extends object> {
  byIds: ByIds<T>;
  isCreating?: boolean;
  isFetching?: string[];
  isUpdating?: string[];
  isDeleting?: string[];
}

declare interface NormalizedEntities {
  users: ByIds<IUser>;
}

declare interface NormalizedResult {
  users?: string[];
}

declare interface DenormalizedEntities {
  users?: WithId<User>[];
}
