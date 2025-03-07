import styled from 'styled-components';
import logo from '@/assets/img/logo.webp';
import close from '@/assets/img/close-line.png';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {clearModalInfo} from '@/store/modules/modalSlice';
import {getRandomInt} from '@/utils/randomUtils.ts';
import {Modal, ModalContainer} from '@/styles/ModalLayout';

function WaitingModal() {
  const dispatch = useDispatch();
  const initialWaitingNumber = getRandomInt(100, 800);
  const [waitingNumber, setWaitingNumber] =
    useState<number>(initialWaitingNumber);
  const initialEstimatedTime = getRandomInt(1, 3);
  const [estimatedTime, setEstimatedTime] =
    useState<number>(initialEstimatedTime);
  const [progressBarValue, setProgressBarValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev - 1 <= 0) {
          clearInterval(interval);
          dispatch(clearModalInfo());
          return 0;
        }
        return prev - 1;
      });

      setWaitingNumber(prev => {
        const decrementValue = getRandomInt(20, 90);
        const newWaitingNumber = prev - decrementValue;
        if (newWaitingNumber <= 0) {
          return 0;
        }
        return newWaitingNumber;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const stopButton = () => {
    alert('수강신청에 실패하셨습니다. :(');
    dispatch(clearModalInfo());
    location.reload();
  };

  const ProgressBar = ({value}: {value: number}) => {
    return (
      <ProgressBarContainer>
        <ProgressBarFill $progress={value} />
      </ProgressBarContainer>
    );
  };

  useEffect(() => {
    setProgressBarValue(
      ((initialEstimatedTime - estimatedTime) / initialEstimatedTime) * 100,
    );
  }, [estimatedTime]);

  return (
    <ModalContainer>
      <WaitingModalBox>
        <Logo />
        <Title>
          서비스{' '}
          <TextStrong color='#838fe2' fontSize={2.5}>
            접속대기 중
          </TextStrong>{' '}
          입니다.
        </Title>
        <SubTitle>
          예상대기시간 <TextStrong fontSize={2}>:</TextStrong>{' '}
          <TextStrong color='#838fe2' fontSize={4.3} fontWeight='normal'>
            {estimatedTime}
          </TextStrong>
          <TextStrong fontSize={2.2} fontWeight='normal'>
            초
          </TextStrong>{' '}
        </SubTitle>
        <ProgressBar value={progressBarValue} />
        <Contents>
          고객님 앞에{' '}
          <TextStrong fontSize={3} fontWeight='bold' color='#00cc09'>
            {waitingNumber}
          </TextStrong>
          <TextStrong color='#00cc09'>명</TextStrong> 의 대기자가 있습니다.
        </Contents>
        <Contents>
          현재 접속 사용자가 많아 대기 중이며, 잠시만 기다리시면 서비스로 자동
          접속 됩니다.
        </Contents>
        <StopButton onClick={stopButton}>
          <CloseImage src={close} /> 중지
        </StopButton>
        <Contents>재 접속하시면 대기시간이 더 길어집니다.</Contents>
      </WaitingModalBox>
    </ModalContainer>
  );
}

const WaitingModalBox = styled(Modal)`
  position: static;
  width: 39rem;
  height: 45rem;
  min-width: 39rem;
  min-height: 43rem;
  font-weight: lighter;
  padding: 1rem 4rem;
  word-break: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 5.5rem;
  margin-right: auto;
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  color: #676763;
  margin-bottom: 2rem;
`;

const SubTitle = styled.p`
  font-size: 2.2rem;
  font-weight: bold;
  color: #676763;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 1rem;
  overflow: hidden;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const ProgressBarFill = styled.div<{$progress: number}>`
  height: 1rem;
  background-color: #a0a0a0;
  width: ${props => `${props.$progress}%`};
  border-radius: 1rem 0 0 1rem;
  transition: width 0.3s ease;
`;

const Contents = styled.p`
  font-size: 1.7rem;
  color: #676763;
  line-height: 3rem;
`;

const TextStrong = styled.span<{
  color?: string;
  fontSize?: number;
  fontWeight?: string;
}>`
  color: ${props => props.color};
  font-size: ${props => `${props.fontSize}rem`};
  font-weight: ${props => props.fontWeight};
`;

const StopButton = styled.div`
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid #8d8d87;
  padding: 0.8rem 1.3rem;
  color: #676763;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 2.5rem;
  margin-bottom: 1rem;

  &:hover {
    border: 1px solid #a6a69e;
    color: #a6a69e;
  }
`;

const CloseImage = styled.img.attrs({
  src: `${close}`,
})`
  width: 1.5rem;
  margin-right: 1rem;
`;

export default WaitingModal;
