import { ReactNode, createContext, useState } from 'react';

import { createPortal } from 'react-dom';

const PortalContext = createContext<HTMLDivElement | null>(null);

interface PortalProviderProps {
  children: ReactNode;
}

const PortalProvider = ({ children }: PortalProviderProps) => {
  const [portalContainerRef, setPortalContainerRef] = useState<HTMLDivElement | null>(null);
  return (
    <PortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        id='global-portal'
        ref={(el) => {
          if (portalContainerRef !== null || el === null) return;
          setPortalContainerRef(el);
        }}
      />
    </PortalContext.Provider>
  );
};

/**
 * 원래 사용하던 코드이고 children 타입이 ReactNode라는데 왜 타입 에러 발생하는지 모르겠음
 */
interface PortalConsumerProps {
  children: ReactNode;
}

const PortalConsumer = ({ children }: any) => {
  return (
    <PortalContext.Consumer>
      {(portalContainerRef) => {
        if (portalContainerRef === null) {
          return null;
        }
        return createPortal(children, portalContainerRef);
      }}
    </PortalContext.Consumer>
  );
};

export const GlobalPortal = {
  Provider: PortalProvider,
  Consumer: PortalConsumer,
};
