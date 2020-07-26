import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';

import { NavProvider } from './NavProvider';

interface NavProps {
  componentId: string;
}

export const withNavProvider = <P extends Dict = Dict>(
  Comp: React.ComponentType<P>,
) => {
  const WrappedComp = (props: P & NavProps) => {
    return (
      <NavProvider componentId={props.componentId}>
        <Comp {...props} />
      </NavProvider>
    );
  };

  return hoistNonReactStatics(WrappedComp, Comp);
};
