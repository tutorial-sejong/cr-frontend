import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import {theme} from './styles/theme/Theme';
// import Home from '@pages/index/Home';
// import Login from '@pages/index/Login';
// import ProtectedRoute from './components/ProtectedRoute';
import {useEffect} from 'react';

import ReactGA from 'react-ga4';
import Maintenance from '@pages/Maintenance.tsx';
import ProtectedRoute from '@components/ProtectedRoute.tsx';
import Home from '@pages/index/Home.tsx';
import Login from '@pages/index/Login.tsx';

function initializeAnalytics() {
  ReactGA.initialize(import.meta.env.VITE_GTM_ID);
  ReactGA.send({ hitType: 'pageview', page: '/' });
}
function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            // <Maintenance />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
