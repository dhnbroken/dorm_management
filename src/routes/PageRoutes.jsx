import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/Loading/Loading';
import { adminRoutes, authRoutes, publicRoutes } from './routes';
import NavBar from 'components/Header/NavBar';
import Footer from 'components/Footer/Footer';
import AdminSidebar from 'components/AdminSidebar';

const PageRoutes = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <NavBar />
                  <Page />
                  <Footer />
                </>
              }
            />
          );
        })}

        {/* Authentication Page*/}
        {authRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <Page />
                </>
              }
            />
          );
        })}

        {adminRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <div className="flex min-h-screen">
                  <AdminSidebar />
                  <div className="w-4/5">
                    <Page />
                  </div>
                </div>
              }
            />
          );
        })}
      </Routes>
    </React.Suspense>
  );
};

export default PageRoutes;
