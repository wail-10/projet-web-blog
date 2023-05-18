import React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import NavBar from './components/NavBar';
import SubNavBar from './components/SubNavBar';
import HeroSection from './components/HeroSection';
import ArticleSection from './components/ArticleSection';
import Footer from './components/Footer';
import ArticlesByCategory from './components/ArticlesByCategory';

const Layout = () => {
  return (
    <>
      <NavBar />
      <SubNavBar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <>
          <HeroSection />
          <ArticleSection />
        </>,
      },
      {
        path: "/categories/:id",
        element: <ArticlesByCategory />,
      }
    ]
  },
  {
    path: "/signin",
    element: <div>signin</div>,
    
  },
  {
    path: "/signup",
    element: <div>signup</div>,
    
  },
]);

function App() {

  return (
    // <ThemeProvider theme={darkTheme}>
      <div className="App">
          
          {/* <NavBar /> */}
          <RouterProvider router={router} />
          {/* <SubNavBar />
          <HeroSection />
          <ArticleSection />
          <Footer /> */}
      </div>
    // </ThemeProvider>
  );
}

export default App;
