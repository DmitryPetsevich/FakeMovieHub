import {
  createElement,
  useCallback,
  useEffect,
  useState,
  type FC,
  type JSX,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import ModalContext, { type OpenWindowFunc } from './ModalContext';
import Box from '@mui/material/Box';

type Props = {
  children?: ReactNode;
};

const ModalProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  const openWindow = useCallback<OpenWindowFunc>((Component, props) => {
    setOpen(true);
    setComponent(createElement(Component, props));
  }, []);

  const closeWindow = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        openWindow,
        closeWindow,
      }}
    >
      {children}
      {open &&
        createPortal(
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'rgba(0, 0, 0, 0.75)',
            }}
          >
            {component}
          </Box>,
          document.body,
        )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
