import styled from 'styled-components';
import Menubar from '@components/Menubar';
import Header from '@components/Header';
import LectureList from '@components/LectureList';
import TabMenu from '@components/TabMenu';
import {useAppSelector} from '@/store/hooks';
import CourseRegister from '@/components/CourseRegister';
import Wishlist from '@/components/Wishlist';

function Home() {
  const {tab, focused} = useAppSelector(state => state.tabs);

  const focusedTab = tab.find(tab => tab.id === focused);
  const focusedTabName = focusedTab ? focusedTab.name : '선택된 탭이 없습니다.';

  const renderContent = () => {
    switch (focused) {
      case 0:
        return <LectureList />;
      case 1:
        return <Wishlist />;
      case 2:
        return <CourseRegister />;
      default:
        return <div>선택된 탭이 없습니다.</div>;
    }
  };

  return (
    <Container>
      <Header />
      <Box>
        <Menubar />
        <Main>
          <TabMenu />
          <Article>
            <p>{focusedTabName}</p>
            {renderContent()}
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
