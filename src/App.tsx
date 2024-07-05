import {Route, Routes} from 'react-router-dom';
import Home from '@pages/index/Home.tsx';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme/Theme';

function App() {

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </ThemeProvider>
    );
}

export default App;