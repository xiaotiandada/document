import type { RootType } from './ReactDOMRoot';

export type Instance = Element;

export type Container =
  | (Element & { _reactRootContainer?: RootType })
  | (Document & { _reactRootContainer?: RootType });

export const noTimeout = -1;

export function getPublicInstance(instance: Instance): any {
  return instance;
}
