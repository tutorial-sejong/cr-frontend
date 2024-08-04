import styled from 'styled-components';
import {deleteAllRegistrations} from '@apis/api/course.ts';

interface StartBtnProps {
  onClick: () => void;
}

function StartButton({onClick}: StartBtnProps) {
  const handleClick = async () => {
    if (!confirm('수강신청 연습 시작하시겠습니까?')) return;

    await deleteAllRegistrations();
    onClick();
  };

  return (
    <Container>
      <p>시작 버튼을 누르면, 수강 신청이 시작됩니다. 연습이 끝나면 탭을 변경하고 다시 접속해주세요.</p>
      <ButtonWrap onClick={handleClick}>시작</ButtonWrap>
    </Container>
  );
}

const Container = styled.div`
  > p {
    font-weight: normal;
    font-size: 1.6rem;
    margin-bottom: 5px;
  }
`;
const ButtonWrap = styled.button`
  ${props => props.theme.texts.content};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  width: 6rem;
  height: 2.4rem;
  margin-bottom: 10px;

  &:hover {
    filter: grayscale(15%);
  }
`;
export default StartButton;
