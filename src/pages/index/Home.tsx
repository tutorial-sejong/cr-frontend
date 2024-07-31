import styled from 'styled-components';
import Menubar from '@components/Menubar';
import Header from '@components/Header';
import LectureList from '@components/LectureList';
import TabMenu from '@components/TabMenu';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {RootState} from '@/store/store';
import WaitingModal from '@components/common/Modal/WaitingModal.tsx';

function Home() {
  const {accessToken} = useSelector((state: RootState) => state.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  if (!accessToken) {
    return null;
  }

  return (
    <Container>
      <WaitingModal progress={60}/>
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
