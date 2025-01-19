import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {deleteAllRegistrations} from '@apis/api/course.ts';
import {setEndCount} from '@/store/modules/courseRegisteredSlice';
import {useAppSelector} from '@/store/hooks';
import Timeout from './Timeout';

interface StartBtnProps {
  onClick: () => void;
}

function StartButton({onClick}: StartBtnProps) {
  const dispatch = useDispatch();
  const time = useAppSelector(state => state.courseRegistered.time);
  const [timeLeft, setTimeLeft] = useState(time);
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

  return (
    <Container>
      <p>
        시작 버튼을 누르면 수강 신청이 시작됩니다. 다시 연습하고 싶다면 한번 더
        버튼을 눌러주세요.
      </p>
      <p>현재 상태를 확인하고 싶다면, 재조회 버튼을 눌러주세요.</p>
      <Timeout
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        handleClick={handleClick}
      />
    </Container>
  );
}

const Container = styled.div`
  font-weight: normal;
  > p {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
`;
export default StartButton;
