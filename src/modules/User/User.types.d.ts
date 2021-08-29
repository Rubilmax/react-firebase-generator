declare interface UserState extends NormalizedState<IUser> {}

declare interface UserInfos {
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

declare interface IUser extends UserInfos {}

declare interface User extends IUser {}
