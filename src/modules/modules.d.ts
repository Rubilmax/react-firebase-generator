/// <reference path="./LoggedUser/LoggedUser.types.d.ts" />
/// <reference path="./Snackbar/Snackbar.types.d.ts" />
/// <reference path="./User/User.types.d.ts" />
import createRootReducer from 'modules/reducers';

declare module 'react-redux' {
  interface DefaultRootState extends ReturnType<ReturnType<typeof createRootReducer>> {}
}
