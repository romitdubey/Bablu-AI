import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom';
import Loader from '../Components/loader/loader';
import { LoaderContext } from '../context/loaderContext';


const AppLayout = () => {

  const [loaderState, setLoaderState] = useState(true);

  return (
    <>
      <LoaderContext.Provider value={{ loaderState, setLoaderState }}>
        <Loader />
        <Header />
        <main>
          <Outlet />
        </main>
      </LoaderContext.Provider>
    </>
  );
};

export default AppLayout;