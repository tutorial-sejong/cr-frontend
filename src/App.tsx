import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import {theme} from './styles/theme/Theme';
import ReactGA from 'react-ga4';
import ProtectedRoute from '@components/ProtectedRoute.tsx';
import Home from '@pages/index/Home.tsx';
import Login from '@pages/index/Login.tsx';
import DeleteAccount from '@pages/DeleteAccount.tsx';
import ScrollToTop from './utils/scrollToTop';

function initializeAnalytics() {
  ReactGA.initialize(import.meta.env.VITE_GTM_ID);
  ReactGA.send({hitType: 'pageview', page: '/'});
}

function App() {
  useEffect(() => {
    initializeAnalytics();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ScrollToTop />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/delete' element={<DeleteAccount />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
