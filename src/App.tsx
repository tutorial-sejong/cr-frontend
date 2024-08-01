import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import {theme} from './styles/theme/Theme';
import Home from '@pages/index/Home';
import Login from '@pages/index/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
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
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
