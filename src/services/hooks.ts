/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import isEqual from 'react-fast-compare';
import { useSelector, DefaultRootState } from 'react-redux';
import { useLocation } from 'react-router';
import _debounce from 'lodash/debounce';

const shouldUpdate = (
  depsRef: React.MutableRefObject<React.DependencyList>,
  deps: React.DependencyList,
) => {
  if (depsRef.current !== deps && !isEqual(depsRef.current, deps)) {
    depsRef.current = deps;
  }

  return depsRef.current;
};

export const useDeepEffect = (effect: React.EffectCallback, deps: React.DependencyList) => {
  const depsRef = React.useRef(deps);

  React.useEffect(effect, [shouldUpdate(depsRef, deps)]);
};

export const useDeepCallback = (effect: React.EffectCallback, deps: React.DependencyList) => {
  const depsRef = React.useRef(deps);

  return React.useCallback(effect, [shouldUpdate(depsRef, deps)]);
};

export const useDeepMemo = <T>(factory: () => T, deps: React.DependencyList): T => {
  const depsRef = React.useRef(deps);

  return React.useMemo(factory, [shouldUpdate(depsRef, deps)]);
};

export const useDeepSelector = <T>(selector: (state: DefaultRootState) => T) =>
  useSelector(selector, isEqual);

export const useToggle = (defaultFlag: boolean): [boolean, () => void, () => void, () => void] => {
  const [flag, setFlag] = React.useState(defaultFlag);

  return [flag, () => setFlag(true), () => setFlag(false), () => setFlag(!flag)];
};

export const createContext = <T>(defaultValue?: T) =>
  React.createContext<T | null>(defaultValue || null);

export const useQueryParams = () => {
  const location = useLocation();

  return new URLSearchParams(location.search);
};

export const useTimeout = (handler: Parameters<typeof window.setTimeout>[0], timeout?: number) =>
  React.useEffect(() => {
    const timeoutId = window.setTimeout(handler, timeout);

    return () => window.clearTimeout(timeoutId);
  }, [handler, timeout]);

export const useEventListener = (
  type: keyof WindowEventMap,
  handler: Parameters<typeof window.addEventListener>[1],
  cleanup?: () => void,
) =>
  React.useEffect(() => {
    window.addEventListener(type, handler);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener(type, handler);
    };
  }, []);

export const useDebouncedEventListener = (
  type: keyof WindowEventMap,
  handler: Parameters<typeof window.addEventListener>[1],
  cleanup?: () => void,
) => useEventListener(type, _debounce(handler, 10), cleanup);
