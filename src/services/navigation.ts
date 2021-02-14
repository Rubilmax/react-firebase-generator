import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

export const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const useNavigate = (
  pathname: string,
  {
    scrollTop = true,
    search = '',
  }: {
    scrollTop?: boolean;
    search?: string;
  } = {},
) => {
  const dispatch = useDispatch();

  return React.useCallback(() => {
    dispatch(push(pathname + search));
    if (!!scrollTop) window.scroll({ top: 0 });
  }, [dispatch, pathname, search, scrollTop]);
};

export const handleEnterSubmit = (
  handleSubmit: (event: React.KeyboardEvent<HTMLDivElement>) => any,
  needCtrlKey?: boolean,
) => (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (event?.key === 'Enter' && (!needCtrlKey || !!event?.metaKey || !!event?.ctrlKey)) {
    handleSubmit(event);
  }
};
