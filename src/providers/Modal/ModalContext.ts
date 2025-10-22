import { createContext, type ComponentType } from 'react';

export type OpenWindowFunc = <T extends object>(
  Component: ComponentType<T>,
  props?: T extends Record<string, never> ? undefined : T,
) => void;

export type ModalContextProps = {
  openWindow: OpenWindowFunc;
  closeWindow: () => void;
};

const ModalContext = createContext<ModalContextProps>({
  openWindow: () => {},
  closeWindow: () => {},
});

export default ModalContext;
