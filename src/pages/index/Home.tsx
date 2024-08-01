import styled from 'styled-components';
import Menubar from '@components/Menubar';
import Header from '@components/Header';
import LectureList from '@components/LectureList';
import TabMenu from '@components/TabMenu';
import {useAppSelector} from '@/store/hooks';
import CourseRegister from '@/components/CourseRegister';
import Wishlist from '@/components/Wishlist';
import AntiMacroCodeModal from '@components/common/Modal/AntiMacroCodeModal.tsx';
import InfoModal from '@components/common/Modal/InfoModal.tsx';
import EnrollmentInfoModal from '@components/common/Modal/EnrollmentInfoModal.tsx';
import LoadingModal from '@components/common/Modal/LoadingModal.tsx';
import WaitingModal from '@components/common/Modal/WaitingModal.tsx';

function Home() {
  const {tab, focused} = useAppSelector(state => state.tabs);

  const {modalName, scheduleId, courseName} = useAppSelector(state => state.modalInfo);

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

  const renderModal = () => {
    switch (modalName) {
      case 'waiting':
        return <WaitingModal />;
      case 'macro':
        return <AntiMacroCodeModal />;
      case 'check':
        return <InfoModal scheduleId={scheduleId} curiNm={courseName} type={'check'} />;
      case 'loading':
        return <LoadingModal />;
      case 'reload':
        return <InfoModal scheduleId={scheduleId} curiNm={courseName} type={'reload'} />;
      case 'fail':
        return <InfoModal scheduleId={scheduleId} curiNm={courseName} type={''} />;
      case 'enrollment':
        return <EnrollmentInfoModal schDeptAlias={''} curiNo={''} classNo={''} curiNm={courseName} />;
      default:
        return <></>;
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
