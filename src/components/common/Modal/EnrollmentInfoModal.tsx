import styled, {css} from 'styled-components';
import {closeHandler} from './handlers/handler';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {
  CloseImage,
  Modal,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  Title,
} from '@/styles/ModalLayout';

function EnrollmentInfoModal() {
  const dispatch = useAppDispatch();
  const courseData = useAppSelector(state => state.modalInfo.courseData);

  const closeButton = () => {
    closeHandler(dispatch);
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <Title>수강인원</Title>
          <CloseImage onClick={closeButton} />
        </ModalHeader>
        <ModalBody>
          <LectureInfoContainer>
            <LectureInfoArea>
              <LectureInfoBox>
                <LectureInfoWrap>
                  <span>조직분류</span>
                  <InputWrap sizes={'s'}>
                    <p>학부</p>
                  </InputWrap>
                </LectureInfoWrap>
                <LectureInfoWrap>
                  <span>년도</span>
                  <InputWrap sizes={'s'}>
                    <p>2024</p>
                  </InputWrap>
                </LectureInfoWrap>
                <LectureInfoWrap>
                  <span>학기</span>
                  <InputWrap sizes={'s'}>
                    <p>2학기</p>
                  </InputWrap>
                </LectureInfoWrap>
                <LectureInfoWrap>
                  <span>개설학과전공</span>
                  <InputWrap sizes={'l'}>
                    <p>{courseData.schDeptAlias}</p>
                  </InputWrap>
                </LectureInfoWrap>
                <LectureInfoWrap>
                  <span>학년(학기)</span>
                  <InputWrap sizes={'s'}>
                    <p></p>
                  </InputWrap>
                </LectureInfoWrap>
                <LectureInfoWrap>
                  <span>교과목번호-분반</span>
                  <InputWrap sizes={'s'}>
                    <p>
                      {courseData.curiNo}-{courseData.classNo}
                    </p>
                  </InputWrap>
                  <InputWrap sizes={'l'}>
                    <p>{courseData.curiNm}</p>
                  </InputWrap>
                </LectureInfoWrap>
              </LectureInfoBox>
            </LectureInfoArea>
          </LectureInfoContainer>
          <LectureInfoContainer>
            <LectureInfoArea>
              <LectureEnrollmentBox>
                <LectureInfoWrap>
                  <span>총 수강인원</span>
                  <InputWrap
                    sizes={'s'}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        paddingLeft: 0,
                        fontWeight: 600,
                      }}
                    >
                      9
                    </p>
                  </InputWrap>
                  <span>명</span>
                </LectureInfoWrap>
                <LectureInfoWrap>
                  <span>남은 자리</span>
                  <InputWrap
                    sizes={'s'}
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        paddingLeft: 0,
                        fontWeight: 600,
                      }}
                    >
                      0
                    </p>
                  </InputWrap>
                  <span>명</span>
                </LectureInfoWrap>
              </LectureEnrollmentBox>
            </LectureInfoArea>
          </LectureInfoContainer>
        </ModalBody>
        <ModalFooter>
          <FooterBtn style={{marginRight: '20px'}} onClick={closeButton}>
            닫기
          </FooterBtn>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
}

const ModalBody = styled.div``;

const LectureInfoContainer = styled.div`
  width: 72rem;
  border: 0.1rem solid #714656;
  border-radius: 2px;
  padding: 0.5rem 1.5rem;
  margin: 3rem auto;
`;

const LectureInfoArea = styled.div``;

const LectureInfoBox = styled.div`
  width: 71rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem 2.7rem;
`;

const LectureInfoWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  display: flex;
  align-items: center;

  > span {
    display: inline-block;
    text-align: right;
    min-width: 3rem;
  }
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

const InputWrap = styled.div<{sizes: string}>`
  ${props => props.theme.texts.content};

  ${props =>
    props.sizes === 's' &&
    css`
      width: 14rem;
    `};
  ${props =>
    props.sizes === 'm' &&
    css`
      width: 19.5rem;
    `};
  ${props =>
    props.sizes === 'l' &&
    css`
      width: 37.3rem;
    `};
  ${props =>
    props.sizes === 'xl' &&
    css`
      width: 45.8rem;
    `};
  height: 2.4rem;
  border: 1px solid ${props => props.theme.colors.neutral5};
  margin-left: 0.8rem;
  background: ${props => props.theme.colors.neutral5};
  display: flex;
  align-items: center;

  > p {
    width: 100%;
    padding-left: 0.8rem;
  }
`;

const LectureEnrollmentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 7rem;
`;

export default EnrollmentInfoModal;
