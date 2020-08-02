import React, { createContext } from 'react';

export const NavContext = createContext({
  componentId: '',
});

interface Props {
  componentId: string;
  children: React.ReactChild;
}

export const NavProvider = ({ children, componentId }: Props) => {
  return (
    <NavContext.Provider value={{ componentId }}>
      {children}
    </NavContext.Provider>
  );
};
