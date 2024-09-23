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
      <p>시작 버튼을 누르면 수강 신청이 시작됩니다. 다시 연습하고 싶다면 한번 더 버튼을 눌러주세요.</p>
      <p>시작 후, 35초가 지나면 모든 과목이 수강여석 없음으로 변경됩니다.</p>
      <p>현재 상태를 확인하고 싶다면, 재조회 버튼을 눌러주세요.</p>
      <ButtonWrap onClick={handleClick}>시작 / 초기화</ButtonWrap>
    </Container>
  );
}

const Container = styled.div`
    > p {
        font-weight: normal;
        font-size: 1.6rem;
        margin-bottom: 15px;
    }
`;
const ButtonWrap = styled.button`
  ${props => props.theme.texts.content};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  width: 8rem;
  height: 2.4rem;
  margin-bottom: 10px;

  &:hover {
    filter: grayscale(15%);
  }
`;
export default StartButton;
