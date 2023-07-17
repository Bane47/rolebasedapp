import React, { useState, createContext, useContext } from "react";

const initialState = {
    mission: "To be started",
    setMission: () => {}
  };
  
  export const MissionContext = createContext(initialState);
  
  export const MissionProvider = ({ children }) => {
    const [mission, setMission] = useState("To be started");
  
    return (
      <MissionContext.Provider value={{ mission, setMission }}>
        {children}
      </MissionContext.Provider>
    );
  };
  
