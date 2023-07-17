import { createContext, useState } from 'react';

const initialState = "To be started"
export const TypeContext = createContext();
export const MissionContext = createContext(initialState);

export function TypeProvider({ children }) {
  const [userType, setUserType] = useState('User');

  return (
    <TypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </TypeContext.Provider>
  );
}


