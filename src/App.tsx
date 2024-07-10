import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import {theme} from './styles/theme/Theme';
import Home from '@pages/index/Home';
import Login from '@pages/index/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
