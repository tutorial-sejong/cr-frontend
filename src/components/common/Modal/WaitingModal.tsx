import styled, { css, keyframes } from 'styled-components';
import logo from '@/assets/img/logo.webp';
import close from '@/assets/img/tab_close_all.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearModalInfo } from '@store/modalSlice.ts';
import { getRandomInt } from '@/utils/randomUtils.ts';

function WaitingModal({ progress }) {
  const dispatch = useDispatch();
  const initialWaitingNumber = getRandomInt(100, 800);
  const [waitingNumber, setWaitingNumber] = useState(initialWaitingNumber);
  const initialEstimatedTime = getRandomInt(2, 5);
  const [estimatedTime, setEstimatedTime] = useState(initialEstimatedTime);

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

  const ProgressBar = ({ value }) => {
    return (
      <ProgressBarContainer>
        <ProgressBarFill progress={value} />
      </ProgressBarContainer>
    );
  };

  return (
    <ModalContainer>
      <Modal>
        <Logo />
        <Title>서비스 <TextStrong color="#838fe2" fontSize={2.5}>접속대기 중</TextStrong> 입니다.</Title>
        <SubTitle>예상대기시간 <TextStrong fontSize={2}>:</TextStrong> <TextStrong color="#838fe2" fontSize={4.3} fontWeight="normal">{estimatedTime}</TextStrong>
          <TextStrong fontSize={2.2} fontWeight="normal">초</TextStrong> </SubTitle>
        <ProgressBar value={progress} />
        <Contents>
          고객님 앞에 <TextStrong fontSize={3} fontWeight="bold" color="#00cc09">{waitingNumber}</TextStrong><TextStrong
          color="#00cc09">명</TextStrong> 의 대기자가 있습니다.
        </Contents>
        <Contents>
          현재 접속 사용자가 많아 대기 중이며, 잠시만 기다리시면 서비스로 자동 접속 됩니다.
        </Contents>
        <StopButton onClick={stopButton}>
          <CloseImage src={close} /> 중지
        </StopButton>
        <Contents>
          재 접속하시면 대기시간이 더 길어집니다.
        </Contents>
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
    text-align: center;
    z-index: 10;
`;

const Modal = styled.div`
    width: 390px;
    height: 430px;
    min-width: 390px;
    min-height: 430px;
    border: 1px solid #000000;
    background: #ffffff;
    font-weight: lighter;
    padding: 20px 40px;
    word-break: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.img.attrs({
  src: `${logo}`,
})`
    width: 55px;
    margin-right: auto;
    display: block;
    margin-top: 10px;
`;

const Title = styled.p`
    font-size: 2.5rem;
    font-weight: bold;
    color: #676763;
    margin-bottom: 20px;
`;

const SubTitle = styled.p`
    font-size: 2.2rem;
    font-weight: bold;
    color: #676763;
`;

const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const ProgressBarFill = styled.div`
    height: 10px;
    background-color: #a0a0a0;
    width: ${props => `${props.progress}%`};
    border-radius: 10px 0 0 10px;
    transition: width 0.3s ease;
`;

const Contents = styled.p`
    font-size: 1.7rem;
    color: #676763;
    line-height: 3rem;
`;

const TextStrong = styled.span`
    color: ${props => props.color};
    font-size: ${props => `${props.fontSize}rem`};
    font-weight: ${props => props.fontWeight};
`;

const StopButton = styled.div`
    text-align: center;
    font-size: 1.5rem;
    border: 1px solid #8d8d87;
    padding: 8px 13px;
    color: #676763;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 10px;
    &:hover {
        border: 1px solid #a6a69e;
        color: #a6a69e;
    }
`;

const CloseImage = styled.img.attrs({
  src: `${close}`,
})`
    width: 10px;
    margin-right: 10px;
`;

export default WaitingModal;
