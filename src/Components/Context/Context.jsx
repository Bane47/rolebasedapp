// context.js
import React from 'react';
import Login from '../Pages/Login';
import {Type} from '../Pages/Login'
const CustomContext = React.createContext();

const CustomProvider = ({ children }) => {
  const value = {
    userType: 'Admin', // Replace with the actual userType value based on your logic
  };

  
  

  return (
    <>
    
    <CustomContext.Provider value={value}>

        {console.log(value.userType)}
      {value.userType=="Admin" && <>{children}</>}
    </CustomContext.Provider>
    
    </>
  );
};

export { CustomContext, CustomProvider };
