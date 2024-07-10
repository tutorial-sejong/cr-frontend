import styled from 'styled-components';
import Menubar from '@components/Menubar';

function Home() {
  return (
    <Container>
      <Menubar />
      강의시간표/수업계획서조회
    </Container>
  );
}

const Container = styled.div`
  ${props => props.theme.texts.title};
  display: flex;
`;

export default Home;
