import styled from 'styled-components';
import Menubar from '@components/Menubar';
import Header from '@components/Header';
import LectureList from '@components/LectureList';
import TabMenu from '@components/TabMenu';

function Home() {
  return (
    <Container>
      <Header />
      <Box>
        <Menubar />
        <Main>
          <TabMenu />
          <Article>
            <p>강의시간표/수업계획서조회</p>
            <LectureList />
          </Article>
        </Main>
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

const Main = styled.div`
  width: calc(100% - 23rem);
`;

const Article = styled.div`
  padding: 2rem 1rem;
  > p {
    margin-bottom: 1.5rem;
  }
`;

export default Home;
