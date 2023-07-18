import { createContext, useState } from 'react';

export const TypeContext = createContext();

export function TypeProvider({ children }) {
  const [userType, setUserType] = useState('User');
  const [admin, setAdmin] = useState('');

  return (
    <TypeContext.Provider value={{ userType, setUserType , admin,setAdmin }}>
      {children}
    </TypeContext.Provider>
  );
}


