import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '@/store/hooks';
import styled from 'styled-components';
import {FilterWrap} from '@/styles/FilterLayout';
import InfoIcon from '@assets/img/info.svg?react';
import {setTime} from '@/store/modules/courseRegisteredSlice';
import {defaultTime, maxTime, minTime} from '@/assets/data/constant';

interface TimeoutProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  handleClick: () => void;
}

function Timeout({timeLeft, setTimeLeft, handleClick}: TimeoutProps) {
  const dispatch = useDispatch();
  const time = useAppSelector(state => state.courseRegistered.time);
  const [timeout, setTimeout] = useState<number | string>(time);
  const [popup, setPopup] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeInput = parseInt(e.target.value);

    if (e.target.value) {
      if (timeInput <= minTime) {
        setTimeLeft(minTime);
        dispatch(setTime(minTime));
      } else if (timeInput >= maxTime) {
        setTimeLeft(maxTime);
        dispatch(setTime(maxTime));
      } else {
        setTimeLeft(timeInput);
        dispatch(setTime(timeInput));
      }

      setTimeout(timeInput);
    } else {
      setTimeout('');
      setTimeLeft(defaultTime);
      dispatch(setTime(defaultTime));
    }
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <>
      <TimeoutTitleBox>
        <TimeoutTitleWrap>
          <p>제한 시간</p>
          <InfoButton
            onMouseOver={() => setPopup(true)}
            onMouseOut={() => setPopup(false)}
          >
            <InfoIcon />
          </InfoButton>
          {popup && (
            <PopupWrap>
              <p>- 기본 설정: 35초</p>
              <p>- 최소 시간: 10초 (10초 이하 입력 시 자동으로 10초로 조정)</p>
              <p>
                - 최대 시간: 1시간(3600초) (1시간 이상 입력 시 자동으로
                1시간으로 조정)
              </p>
              <p>
                - 설정한 제한 시간이 지나면 모든 과목의 수강여석이 없음으로
                변경됩니다.
              </p>
            </PopupWrap>
          )}
        </TimeoutTitleWrap>
        <h5>※ 초단위로 입력해주세요!</h5>
      </TimeoutTitleBox>
      <TimeoutWrap $isAlmostDone={timeLeft <= 5}>
        <span>{formatTime(Math.floor(timeLeft / 60))}:</span>
        <span>{formatTime(timeLeft % 60)}</span>
      </TimeoutWrap>
      <InputWrap>
        <InputBox type='number' value={timeout} onChange={handleInput} />
        <ButtonWrap onClick={handleClick}>시작 / 초기화</ButtonWrap>
      </InputWrap>
    </>
  );
}

const TimeoutTitleBox = styled.div`
  margin-bottom: 1rem;
  position: relative;
  > h5 {
    font-size: 1.4rem;
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const TimeoutTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const InfoButton = styled.button`
  display: flex;
`;

const PopupWrap = styled.div`
  ${props => props.theme.texts.tabTitle};
  position: absolute;
  top: 0.6rem;
  left: 9.5rem;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.neutral4};
  padding: 0.7rem;

  > p {
    font-size: 1.4rem;
    padding: 0.5rem;
  }
`;

const TimeoutWrap = styled.div<{$isAlmostDone: boolean}>`
  ${props => props.theme.texts.title};
  margin: 1rem 0;
  font-size: 2.5rem;
  letter-spacing: 0.5rem;
  color: ${props =>
    props.$isAlmostDone ? props.theme.colors.primary : 'inherit'};
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

export default Timeout;
