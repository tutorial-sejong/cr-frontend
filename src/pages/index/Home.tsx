import {useEffect, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {clearModalInfo} from '@/store/modules/modalSlice';
import ErrorModal from '@components/common/Modal/ErrorModal.tsx';
import {useMediaQuery} from 'react-responsive';
import TimetableModal from '@/components/common/Modal/TimetableModal';
import WishRank from '@/components/WishRank';
import RankInfoModal from '@/components/common/Modal/RankInfoModal';

function Home() {
  const isPc = useMediaQuery({query: '(min-width: 1024px)'});
  const {tab, focused} = useAppSelector(state => state.tabs);
  const [barOpen, setBarOpen] = useState(isPc);

  useEffect(() => {
    setBarOpen(isPc);
  }, [isPc]);

  const {modalName, courseData} = useAppSelector(state => state.modalInfo);

  const focusedTab = tab.find(tab => tab.id === focused);
  const focusedTabName = focusedTab ? focusedTab.name : '선택된 탭이 없습니다.';

  const dispatch = useDispatch();

  window.addEventListener('beforeunload', () => {
    dispatch(clearModalInfo());
  });

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
        return <InfoModal curiNm={courseData.curiNm} type={'check'} />;
      case 'loading':
        return (
          <LoadingModal
            scheduleId={courseData.scheduleId}
            schDeptAlias={courseData.schDeptAlias}
            curiTypeCdNm={courseData.curiTypeCdNm}
          />
        );
      case 'reload':
        return <InfoModal curiNm={courseData.curiNm} type={'reload'} />;
      case 'fail':
        return <ErrorModal />;
      case 'timetable':
        return <TimetableModal />;
      case 'enrollment':
        return <EnrollmentInfoModal />;
      case 'wishrank':
        return <RankInfoModal />;
      default:
        return <></>;
    }
  };

  return (
    <Container>
      {renderModal()}
      <Header />
      <Box>
        <Menubar open={barOpen} setOpen={setBarOpen} />
        {barOpen && <WishRank />}
        <Main $isOpen={barOpen}>
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
  max-width: 100vw;
`;

const Main = styled.div<{$isOpen: boolean}>`
  width: ${props =>
    props.$isOpen ? 'calc(100% - 23rem)' : 'calc(100% - 2rem)'};
`;

const Article = styled.div`
  padding: 2rem 1rem;
  > p {
    margin-bottom: 1.5rem;
  }
`;

export default Home;
