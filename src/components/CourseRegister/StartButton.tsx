import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {deleteAllRegistrations} from '@apis/api/course.ts';
import {setEndCount, setTime} from '@/store/modules/courseRegisteredSlice';
import {FilterWrap} from '@/styles/FilterLayout';
import {useAppSelector} from '@/store/hooks';

interface StartBtnProps {
  onClick: () => void;
}

function StartButton({onClick}: StartBtnProps) {
  const dispatch = useDispatch();
  const time = useAppSelector(state => state.courseRegistered.time);
  const [timeout, setTimeout] = useState<number | string>(time);
  const [timeLeft, setTimeLeft] = useState(35);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const countdown = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      setTimeLeft(time);
      dispatch(setEndCount(true));
      console.log('제한 시간 초과');
    }
  }, [timeLeft, dispatch]);

  const handleClick = async () => {
    if (!confirm('수강신청 연습 시작하시겠습니까?')) return;

    //카운트다운 중에 재시작
    if (isRunning) {
      setTimeLeft(time);
    }

    setIsRunning(true);
    await deleteAllRegistrations();
    onClick();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeInput = parseInt(e.target.value);

    if (e.target.value) {
      setTimeout(timeInput);
      setTimeLeft(timeInput);
      dispatch(setTime(timeInput));
    } else {
      setTimeout('');
      setTimeLeft(35);
      dispatch(setTime(35));
    }
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
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
        <li>최소 시간: 10초 (10초 이하 입력 시 자동으로 10초로 조정)</li>
        <li>
          최대 시간: 1시간(3600초) (1시간 이상 입력 시 자동으로 1시간으로 조정)
        </li>
        <li>
          설정한 제한 시간이 지나면 모든 과목의 수강여석이 없음으로 변경됩니다.
        </li>
        <h5>※ 초단위로 입력해주세요!</h5>
      </ul>
      <TimerWrap $isAlmostDone={timeLeft <= 5}>
        <span>{formatTime(Math.floor(timeLeft / 60))}:</span>
        <span>{formatTime(timeLeft % 60)}</span>
      </TimerWrap>
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
    > h5 {
      color: ${props => props.theme.colors.primary};
      font-weight: bold;
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

const TimerWrap = styled.div<{$isAlmostDone: boolean}>`
  ${props => props.theme.texts.title};
  margin: 1.5rem 0;
  font-size: 2.5rem;
  letter-spacing: 0.5rem;
  color: ${props =>
    props.$isAlmostDone ? props.theme.colors.primary : 'inherit'};
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
