import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {
  CloseImage,
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  Title,
} from '@/styles/ModalLayout';
import {closeHandler} from './handlers/handler';
import styled from 'styled-components';

function RankInfoModal() {
  const dispatch = useAppDispatch();
  const courseData = useAppSelector(state => state.modalInfo.courseData);

  const closeButton = () => {
    closeHandler(dispatch);
  };

  return (
    <ModalContainer>
      <WishModal>
        <ModalHeader>
          <Title>강의 정보</Title>
          <CloseImage onClick={closeButton} />
        </ModalHeader>
        <WishModalBody>
          <InfoBox>
            <InfoWrap>
              <LabelWrap>과목명</LabelWrap>
              <ContentWrap>{courseData.curiNm}</ContentWrap>
            </InfoWrap>
            <InfoWrap>
              <LabelWrap>분반</LabelWrap>
              <ContentWrap>{courseData.classNo}</ContentWrap>
            </InfoWrap>
            <InfoWrap>
              <LabelWrap>관심 과목 담은 수</LabelWrap>
              <ContentWrap>{courseData.wishCount}</ContentWrap>
            </InfoWrap>
            <InfoWrap>
              <LabelWrap>개설학과</LabelWrap>
              <ContentWrap>{courseData.manageDeptNm}</ContentWrap>
            </InfoWrap>
            <InfoWrap>
              <LabelWrap>담당 교수명</LabelWrap>
              <ContentWrap>{courseData.lesnEmp}</ContentWrap>
            </InfoWrap>
            <InfoWrap>
              <LabelWrap>강의시간</LabelWrap>
              <ContentWrap>{courseData.lesnTime}</ContentWrap>
            </InfoWrap>
            <InfoWrap>
              <LabelWrap>강의실</LabelWrap>
              <ContentWrap>{courseData.lesnRoom}</ContentWrap>
            </InfoWrap>
          </InfoBox>
        </WishModalBody>
        <ModalFooter>
          <FooterBtn style={{marginRight: '20px'}} onClick={closeButton}>
            닫기
          </FooterBtn>
        </ModalFooter>
      </WishModal>
    </ModalContainer>
  );
}

const WishModal = styled(Modal)`
  min-height: 26rem;
  height: fit-content;
`;

const WishModalBody = styled(ModalBody)`
  margin: 1.5rem 3rem;
`;

const InfoBox = styled.div`
  border: 0.1rem solid #714656;
  display: flex;
  flex-wrap: wrap;
  width: 73rem;
  padding: 1.5rem 1rem;
  gap: 1.2rem 1rem;
`;

const InfoWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  display: flex;
  align-items: center;
`;

const LabelWrap = styled.div`
  min-width: 6rem;
`;

const ContentWrap = styled.div`
  ${props => props.theme.texts.content};
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.neutral5};
  border-radius: 2px;
  background: ${props => props.theme.colors.neutral5};
  height: 2.4rem;
  margin-left: 1rem;
  padding: 1rem 5rem;
`;

const FooterBtn = styled.div`
  font-size: 1.4rem;
  border: 1px solid #000000;
  background: #ffffff;
  padding: 0.6rem 1.5rem;
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;

export default RankInfoModal;
