import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Loader from '../Components/loader/loader';
import { LoaderContext, UserContext } from '../Context';


const AppLayout = () => {

  const [loaderState, setLoaderState] = useState(true);
  const [user, setUser] = useState({
    email: null,
    id: null,
    loggedIn: false
  });


  return (
    <>
      <LoaderContext.Provider value={{ loaderState, setLoaderState }}>
        <Loader />
          <UserContext.Provider value={{ user, setUser }}>
            
          <Header />
          <main>
            <Outlet />
          </main>
          </UserContext.Provider>
      </LoaderContext.Provider>
    </>
  );
};

export default AppLayout;