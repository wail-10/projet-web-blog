import React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ArticlesGrid from './components/ArticlesGrid';
import ResponsiveAppBar from './components/ResponsiveAppBar';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

function App() {

  return (
    // <ThemeProvider theme={darkTheme}>
      <div className="App">
          <ResponsiveAppBar />
          {/* <NavBar /> */}
          <SideBar />
          <ArticlesGrid />
      </div>
    // </ThemeProvider>
  );
}

export default App;
