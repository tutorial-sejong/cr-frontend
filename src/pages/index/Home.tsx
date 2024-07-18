import styled from 'styled-components';
import Menubar from '@components/Menubar';
import Header from '@components/Header.tsx';

function Home() {
  return (
    <Container>
      <Header />
      <Box>
        <Menubar />
        강의시간표/수업계획서조회
      </Box>
    </Container>
  );
}

const Container = styled.div`
  ${props => props.theme.texts.title};
`;

const Box = styled.div`
  display: flex;
`;

export default Home;
