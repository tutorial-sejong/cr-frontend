import styled from 'styled-components';
import warning from '@assets/img/warning.png';
import {useDispatch} from 'react-redux';
import {closeHandler} from '@components/common/Modal/handlers/handler.tsx';
import {useAppSelector} from '@/store/hooks';
import {
  CloseImage,
  Modal,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from '@/styles/ModalLayout';

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
      case 500:
        return '대상학년 또는 대상학과가 아니므로 수강신청할 수 없습니다!';
      default:
        return '알 수 없는 오류';
    }
  };

  return (
    <ModalContainer>
      <WarningModal>
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
      </WarningModal>
    </ModalContainer>
  );
}

const WarningModal = styled(Modal)`
  width: 50rem;
  height: 40rem;
`;

const WarningImage = styled.img.attrs({
  src: `${warning}`,
})`
  display: block;
  width: 5rem;
  margin: 0 auto 1rem;
`;

const InfoMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 25px;
  line-height: 2.7rem;
  padding: 0 3.4rem;
`;

const FooterBtn = styled.div<{type: string}>`
  font-size: 1.4rem;
  border: 1px solid #000000;
  background: ${props =>
    props.type === 'check' ? props.theme.colors.primary : '#ffffff'};
  color: ${props => (props.type === 'cancel' ? '#000000' : '#ffffff')};
  padding: 0.6rem 1.5rem;
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;

export default ErrorModal;
