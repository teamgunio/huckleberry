import React, { useContext, useState, useEffect } from 'react';
import { get } from '../services/api';

const AppContext = React.createContext('app');
export const useApp = () => useContext(AppContext)
export const AppProvider = ({
  children,
  ...initOptions
}) => {

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const res = await get('activities');
    setActivities(await res.json());
  }

  useEffect(() => {
    const initContext = async () => {
      await fetchActivities();
    };
    initContext();
  }, []);

  return (
    <AppContext.Provider
      value={{
        activities,
        fetchActivities,
      }}
    >
      {children}
    </AppContext.Provider>
  )
};
