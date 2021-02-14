import createRootReducer from 'modules/reducers';

declare module 'react-redux' {
  interface DefaultRootState extends ReturnType<ReturnType<typeof createRootReducer>> {}
}
