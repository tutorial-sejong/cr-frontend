import styled from 'styled-components';
import close from '@assets/img/close-line.png';
import warning from '@assets/img/warning.png';
import {useDispatch} from 'react-redux';
import {closeHandler} from '@components/common/Modal/handlers/handler.tsx';
import {useAppSelector} from '@/store/hooks';

function ErrorModal() {
  const dispatch = useDispatch();
  const {type, field} = useAppSelector(state => state.error);

  const closeButton = () => {
    closeHandler(dispatch);
  };

  const errorMessage = () => {
    switch (type) {
      case 404:
        return '조회된 내역이 없습니다.';
      case 409:
        return '이미 신청된 정보가 존재하므로 신청할 수 없습니다.';
      case 410:
        return '수강여석이 없습니다!';
      case 422:
        switch (field) {
          case '교수명':
            return '강의 교수명은 2자 이상 반드시 입력하십시오!';
          case '교과목명':
            return '교과목명은 2자 이상 반드시 입력하십시오!';
          case '학수번호':
            return '학수번호를 정확하게 입력하십시오!';
          case '분반':
            return '분반을 정확하게 입력하십시오!';
          default:
            return '422 알 수 없는 오류';
        }
      default:
        return '알 수 없는 오류';
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <CloseImage onClick={closeButton} />
        </ModalHeader>
        <ModalBody>
          <WarningImage />
          <InfoMessage>{errorMessage()}</InfoMessage>
        </ModalBody>
        <ModalFooter>
          <>
            <FooterBtn
              type='check'
              style={{marginRight: '20px'}}
              onClick={closeButton}
            >
              확인
            </FooterBtn>
          </>
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

const WarningImage = styled.img.attrs({
  src: `${warning}`,
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

export default ErrorModal;
