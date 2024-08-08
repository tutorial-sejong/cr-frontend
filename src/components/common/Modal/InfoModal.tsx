import styled from 'styled-components';
import close from '@assets/img/close-line.png';
import check from '@assets/img/check.png';
import {useDispatch} from 'react-redux';
import {
  closeHandler,
  openModalHandler,
} from '@components/common/Modal/handlers/handler.tsx';

function InfoModal({
                     curiNm,
                     type,
                   }: {
  curiNm: string;
  type: string;
}) {
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
      <Modal>
        <ModalHeader>
          <CloseImage onClick={closeButton} />
        </ModalHeader>
        <ModalBody>
          <CheckImage />
          {type === 'check' ? (
            <>
              <InfoMessage>
                선택한 과목을 수강신청 하시겠습니까?
              </InfoMessage>
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
                취소를 선택하실 경우 수강신청 최종 완료 후 반드시
                [수강신청내역] 재조회를 눌러 신청내역을 확인하세요.
                [수강신청내역]에 조회된 과목만이 정상적으로 수강신청된
                과목입니다.
              </InfoMessage>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <FooterBtn
            type="cancel"
            style={{marginRight: '10px'}}
            onClick={closeButton}
          >
            취소
          </FooterBtn>
          <FooterBtn
            type="check"
            style={{marginRight: '20px'}}
            onClick={eventHandler}
          >
            확인
          </FooterBtn>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

const Modal = styled.div`
    position: relative;
    width: 500px;
    height: 400px;
    border: 1px solid #000000;
    background: #ffffff;
    font-weight: lighter;
`;

const ModalHeader = styled.div`
    height: 50px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #ababab;
`;

const CloseImage = styled.img.attrs({
  src: `${close}`,
})`
    display: block;
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 10px;
`;
const CheckImage = styled.img.attrs({
  src: `${check}`,
})`
    display: block;
    width: 50px;
    margin: 0 auto 10px;
`;

const ModalBody = styled.div`
    text-align: center;
    margin-top: 15px;
`;

const InfoMessage = styled.p`
    font-size: 1.5rem;
    margin-bottom: 25px;
    line-height: 2.7rem;
    padding: 0 34px;
`;
const ModalFooter = styled.div`
    background: ${props => props.theme.colors.neutral5};
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
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
