import {useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {deleteAllRegistrations} from '@apis/api/course.ts';
import {setTime} from '@/store/modules/courseRegisteredSlice';
import {FilterWrap} from '@/styles/FilterLayout';
import {useAppSelector} from '@/store/hooks';

interface StartBtnProps {
  onClick: () => void;
}

function StartButton({onClick}: StartBtnProps) {
  const dispatch = useDispatch();
  const time = useAppSelector(state => state.courseRegistered.time);
  const [timeout, setTimeout] = useState<number | string>(time);

  const handleClick = async () => {
    if (!confirm('수강신청 연습 시작하시겠습니까?')) return;

    await deleteAllRegistrations();
    onClick();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseInt(e.target.value);

    if (e.target.value) {
      setTimeout(time);
      dispatch(setTime(time));
    } else {
      setTimeout('');
      dispatch(setTime(35));
    }
  };

  return (
    <Container>
      <p>
        시작 버튼을 누르면 수강 신청이 시작됩니다. 다시 연습하고 싶다면 한번 더
        버튼을 눌러주세요.
      </p>
      <p>현재 상태를 확인하고 싶다면, 재조회 버튼을 눌러주세요.</p>
      <ul>
        <p>제한 시간 안내</p>
        <li>기본 설정: 35초</li>
        <li>최소 시간: 10초 (10초 미만 입력 시 자동으로 10초로 조정)</li>
        <li>
          설정한 제한 시간이 지나면 모든 과목의 수강여석이 없음으로 변경됩니다.
        </li>
      </ul>
      <InputWrap>
        <span>제한 시간</span>
        <InputBox type='number' value={timeout} onChange={handleInput} />
        <ButtonWrap onClick={handleClick}>시작 / 초기화</ButtonWrap>
      </InputWrap>
    </Container>
  );
}

const Container = styled.div`
  font-weight: normal;
  > p {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
  > ul {
    font-size: 1.6rem;
    margin-bottom: 1rem;

    > p {
      font-weight: bold;
      margin-bottom: 1rem;
    }
    > li {
      list-style-type: square;
      margin: 0 0 0.7rem 2rem;
    }
  }
`;

const InputWrap = styled(FilterWrap)`
  margin: 1.5rem 0;
`;

const InputBox = styled.input`
  height: 2.4rem;
  border: 1px solid ${props => props.theme.colors.neutral4};
  padding-left: 0.5rem;
  width: 21.5rem;
`;

const ButtonWrap = styled.button`
  ${props => props.theme.texts.content};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  width: 8rem;
  height: 2.4rem;
  margin-left: 1rem;

  &:hover {
    filter: grayscale(15%);
  }
`;
export default StartButton;
