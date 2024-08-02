import {useEffect, useState} from 'react';
import styled from 'styled-components';

interface ClockProps {
  name: string;
}

function Clock({name}: ClockProps) {
  const [time, setTime] = useState(35985000);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  const resetTime = () => {
    setTime(35985000);
  };

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(prev => prev + 1000);
    }, 1000);

    if (time === 36000000) {
      clearInterval(clock);
    }

    return () => clearInterval(clock);
  }, [time]);

  return (
    <ClockWrap onClick={resetTime}>
      {name}
      <span>
        님 [{formatTime(Math.floor(time / 1000 / 3600))}:
        {formatTime(Math.floor(((time / 1000) % 3600) / 60))}:
        {formatTime(Math.floor(((time / 1000) % 3600) % 60))}]
      </span>
    </ClockWrap>
  );
}

const ClockWrap = styled.button`
  ${props => props.theme.texts.tableTitle};
  font-size: 1.3rem;

  > span {
    color: ${props => props.theme.colors.neutral4};
    font-weight: 400;
  }
`;

export default Clock;
