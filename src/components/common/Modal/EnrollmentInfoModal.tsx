import styled, {css} from 'styled-components';
import close from '@assets/img/close-line.png';

interface EnrollmentsProps {
  schDeptAlias: string;
  curiNo: string;
  curiNm: string;
  classNo: string;
}

function EnrollmentInfoModal({
  schDeptAlias,
  curiNo,
  curiNm,
  classNo,
}: EnrollmentsProps) {
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <Title>수강인원</Title>
          <CloseImage />
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
                    <p>{schDeptAlias}</p>
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
                      {curiNo}-{classNo}
                    </p>
                  </InputWrap>
                  <InputWrap sizes={'xl'}>
                    <p>{curiNm}</p>
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
                </LectureInfoWrap>
                <LectureInfoWrap>
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
                </LectureInfoWrap>
                <LectureInfoWrap>
                  <span>명</span>
                </LectureInfoWrap>
              </LectureEnrollmentBox>
            </LectureInfoArea>
          </LectureInfoContainer>
        </ModalBody>
        <ModalFooter>
          <FooterBtn style={{marginRight: '20px'}}>닫기</FooterBtn>
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
  width: 790px;
  height: 355px;
  border: 2px solid #000000;
  background: #ffffff;
  font-weight: lighter;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ababab;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  padding: 15px 30px;
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

const ModalBody = styled.div``;

const LectureInfoContainer = styled.div`
  width: 720px;
  border: 0.1rem solid #714656;
  border-radius: 2px;
  padding: 0.5rem 1.5rem;
  margin: 30px auto;
`;

const LectureInfoArea = styled.div``;

const LectureInfoBox = styled.div`
  width: 710px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 0.7rem 2.7rem;
`;

const LectureInfoWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  display: flex;
  align-items: center;

  > span {
    display: inline-block;
    margin-right: 1rem;
    text-align: right;
    min-width: 4.7rem;
  }
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

const FooterBtn = styled.div`
  font-size: 1.4rem;
  border: 1px solid #000000;
  background: #ffffff;
  padding: 6px 15px;
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
  width: 710px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 0.7rem 4.9rem;
`;

export default EnrollmentInfoModal;
