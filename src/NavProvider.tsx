import React, { Component, createContext } from 'react';

export const NavContext = createContext({
  componentId: '',
});

interface Props {
  componentId: string;
  children: React.ReactChild;
}

export class NavProvider extends Component<Props> {
  public render() {
    const { componentId, children } = this.props;
    return (
      <NavContext.Provider value={{ componentId }}>
        {children}
      </NavContext.Provider>
    );
  }
}
