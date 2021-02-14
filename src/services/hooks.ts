/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import isEqual from 'react-fast-compare';
import { useSelector, DefaultRootState } from 'react-redux';
import { useLocation } from 'react-router';

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

export const useForm = ({
  defaultValues,
  ...formOptions
}: {
  [key: string]: any;
  defaultValues: { [key: string]: any };
}) => {
  const form = ReactHookForm.useForm({
    shouldUnregister: false, // needed to keep state of form through pages
    defaultValues: defaultValues as any,
    ...formOptions,
  });

  const listeners: { [inputName: string]: (value: any) => any } = {};
  const useListen = (inputName: string, callback: (newValue: any) => void) => {
    listeners[inputName] = callback;
  };

  const transforms: { [inputName: string]: (value: any) => any } = {};
  const useTransform = (inputName: string, callback: (newValue: any) => any) => {
    transforms[inputName] = callback;
  };

  const resetFields = (fields: string | string[]) => {
    form.unregister(fields);
    form.clearErrors(fields);
  };

  const { reset } = form;
  useDeepEffect(() => reset(defaultValues), [defaultValues, reset]);

  return {
    ...form,
    resetFields,
    useListen,
    useTransform,
    transforms,
    listeners,
  };
};
