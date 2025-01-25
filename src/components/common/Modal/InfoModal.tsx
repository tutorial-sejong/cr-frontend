import styled from 'styled-components';
import check from '@assets/img/check.png';
import {useDispatch} from 'react-redux';
import {
  closeHandler,
  openModalHandler,
} from '@components/common/Modal/handlers/handler.tsx';
import {
  CloseImage,
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
} from '@/styles/ModalLayout';

function InfoModal({curiNm, type}: {curiNm?: string; type: string}) {
  const dispatch = useDispatch();

  const eventHandler = async () => {
    // 수강신청 확인 모달
    if (type === 'check') {
      openModalHandler(dispatch, 'loading');

      return;
    }

    // 수강신청 완료 후 모달
    closeHandler(dispatch);
    alert('새로고침으로 수강신청 실패!');
    location.reload();
  };

  const closeButton = () => {
    closeHandler(dispatch);
  };

  return (
    <ModalContainer>
      <InfoModalBox>
        <ModalHeader>
          <CloseImage onClick={closeButton} />
        </ModalHeader>
        <ModalBody>
          <CheckImage />
          {type === 'check' ? (
            <>
              <InfoMessage>선택한 과목을 수강신청 하시겠습니까?</InfoMessage>
              <InfoMessage>교과목명(Course Title) : {curiNm}</InfoMessage>
            </>
          ) : (
            <>
              <InfoMessage>
                과목이 신청 되었습니다. 수강신청내역을 재 조회 하시겠습니까?
              </InfoMessage>
              <InfoMessage>
                ※ 취소를 선택하실 경우 [수강신청내역]이 갱신되지 않습니다.
              </InfoMessage>
              <InfoMessage>
                취소를 선택하실 경우 수강신청 최종 완료 후 반드시 [수강신청내역]
                재조회를 눌러 신청내역을 확인하세요. [수강신청내역]에 조회된
                과목만이 정상적으로 수강신청된 과목입니다.
              </InfoMessage>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <FooterBtn
            type='cancel'
            style={{marginRight: '10px'}}
            onClick={closeButton}
          >
            취소
          </FooterBtn>
          <FooterBtn
            type='check'
            style={{marginRight: '20px'}}
            onClick={eventHandler}
          >
            확인
          </FooterBtn>
        </ModalFooter>
      </InfoModalBox>
    </ModalContainer>
  );
}

const InfoModalBox = styled(Modal)`
  width: 50rem;
  height: 40rem;
`;

const ModalHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #ababab;
`;

const CheckImage = styled.img.attrs({
  src: `${check}`,
})`
  display: block;
  width: 50px;
  margin: 0 auto 10px;
`;

const InfoMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 25px;
  line-height: 2.7rem;
  padding: 0 34px;
`;

const FooterBtn = styled.div<{type: string}>`
  font-size: 1.4rem;
  border: 1px solid #000000;
  background: ${props =>
    props.type === 'check' ? props.theme.colors.primary : '#ffffff'};
  color: ${props => (props.type === 'cancel' ? '#000000' : '#ffffff')};
  padding: 6px 15px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;

export default InfoModal;
