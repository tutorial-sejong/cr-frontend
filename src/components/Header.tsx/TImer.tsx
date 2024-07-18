import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

interface TimerProps {
  name: string;
}

function Timer({name}: TimerProps) {
  const navigate = useNavigate();
  const [time, setTime] = useState(1800);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  const resetTime = () => {
    setTime(1800);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    if (time === 0) {
      navigate('/login');
    }

    return () => clearInterval(timer);
  }, [time]);

  return (
    <TimerWrap onClick={resetTime}>
      {name}
      <span>
        님 [00:{formatTime(Math.floor(time / 60))}:{formatTime(time % 60)}]
      </span>
    </TimerWrap>
  );
}

const TimerWrap = styled.button`
  ${props => props.theme.texts.tableTitle};
  font-size: 1.3rem;

  > span {
    color: ${props => props.theme.colors.neutral4};
    font-weight: 400;
  }
`;

export default Timer;
