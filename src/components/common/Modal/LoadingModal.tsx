import styled, {keyframes} from 'styled-components';
import {useEffect} from 'react';
import {getRandomInt} from '@/utils/randomUtils.ts';
import {openModalHandler} from '@components/common/Modal/handlers/handler.tsx';
import {useDispatch} from 'react-redux';

function LoadingModal() {
  const dispatch = useDispatch();

  useEffect(() => {

    const endCount = getRandomInt(1, 4) * 1000;

    console.log(endCount);

    setTimeout(() => {
      openModalHandler(dispatch, 'reload');
    }, endCount);
    
  }, []);

  return (
    <ModalContainer>
      <LoadingContainer>
        <LoadingText>데이터 처리중 입니다.</LoadingText>
        <LoadingBar>
          <LoadingProgress />
        </LoadingBar>
      </LoadingContainer>
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
    z-index: 10;
`;

const LoadingContainer = styled.div`
    background: #ffffff;
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
`;

const LoadingText = styled.div`
    margin-bottom: 10px;
    font-size: 16px;
`;

const move = keyframes`
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 50px 0;
    }
`;

const LoadingBar = styled.div`
    width: 100%;
    height: 20px;
    border-radius: 4px;
    background-color: #e0e0e0;
    overflow: hidden;
    position: relative;
`;

const LoadingProgress = styled.div`
    width: 150%;
    height: 100%;
    background: repeating-linear-gradient(
            45deg,
            #6a91d7,
            #6a91d7 10px,
            #87aaeb 10px,
            #87aaeb 20px
    );
    position: absolute;
    top: 0;
    left: -50%;
    animation: ${move} 1s linear infinite;
`;

export default LoadingModal;
