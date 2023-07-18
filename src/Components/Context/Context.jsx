import { createContext, useState } from 'react';

export const TypeContext = createContext();

export function TypeProvider({ children }) {
  const [userType, setUserType] = useState('User');
  const [admin, setAdmin] = useState('');
  const [hitman, setHitman] = useState('');


  return (
    <TypeContext.Provider value={{ userType, setUserType , admin,setAdmin , hitman , setHitman}}>
      {children}
    </TypeContext.Provider>
  );
}


