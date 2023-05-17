import React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import NavBar from './components/NavBar';
import SubNavBar from './components/SubNavBar';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import ArticlesGrid from './components/ArticlesGrid';
// import ResponsiveAppBar from './components/ResponsiveAppBar';
// import ResponsiveDrawer from './components/ResponsiveDrawer';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

function App() {

  return (
    // <ThemeProvider theme={darkTheme}>
      <div className="App">
          {/* <ResponsiveAppBar /> */}
          {/* <ResponsiveDrawer /> */}
          <NavBar />
          <SubNavBar />
          <Footer />
          {/* <SideBar />
          <ArticlesGrid /> */}
      </div>
    // </ThemeProvider>
  );
}

export default App;
