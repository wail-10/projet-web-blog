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
import Login from './components/Login';
import Registration from './components/Registration';
import BlogArticlePage from './components/BlogArticlePage';

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
      },
      {
        path: "/articles/:id",
        element: <BlogArticlePage />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
    
  },
  {
    path: "/register",
    element: <Registration />,
    
  },
]);

function App() {

  return (
      <div className="App">
          <RouterProvider router={router} />
      </div>
  );
}

export default App;
