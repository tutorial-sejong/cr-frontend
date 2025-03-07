import styled, {keyframes} from 'styled-components';
import {useEffect, useRef} from 'react';
import {getRandomInt} from '@/utils/randomUtils.ts';
import {openModalHandler} from '@components/common/Modal/handlers/handler.tsx';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '@store/hooks';
import {postCourse} from '@apis/api/course.ts';
import {setType} from '@/store/modules/errorSlice';
import {ModalContainer} from '@/styles/ModalLayout';

interface LoadingModalProps {
  scheduleId?: number;
  schDeptAlias?: string;
  curiTypeCdNm?: string;
}

function LoadingModal({
  scheduleId = 0,
  schDeptAlias,
  curiTypeCdNm,
}: LoadingModalProps) {
  const dispatch = useDispatch();
  const userMajor = useAppSelector(state => state.dateMode.userMajor);
  const selectedDate = useAppSelector(state => state.dateMode.selectedDate);
  const endCount = useAppSelector(state => state.courseRegistered.endCount);
  const isRequesting = useRef(false);

  useEffect(() => {
    const endRandomCount = getRandomInt(0.5, 1) * 1000;

    // 시간 이내여도 10%의 확률로 실패
    const randomFailNumber = getRandomInt(1, 10);

    const timer = setTimeout(async () => {
      if (isRequesting.current) return; //이미 서버에 요청 중이면 취소
      isRequesting.current = true;

      try {
        if (endCount || randomFailNumber === 1) {
          dispatch(setType(410));
          openModalHandler(dispatch, 'fail');
          return;
        }

        // 본인학년 (학과 제한 있음) 선택 시 학과 제한
        if (
          selectedDate === '본인학년 (학과 제한 있음)' &&
          schDeptAlias !== '대양휴머니티칼리지' &&
          schDeptAlias !== userMajor
        ) {
          dispatch(setType(500));
          openModalHandler(dispatch, 'fail');
          return;
        }

        //교직은 교육학과만 수강가능
        if (curiTypeCdNm === '교직') {
          if (schDeptAlias !== '교육학과') {
            dispatch(setType(500));
            openModalHandler(dispatch, 'fail');
            return;
          }
        }
        // 수강신청 요청
        const res = await postCourse(scheduleId);

        if (res.status === 409) {
          return;
        }
      } catch (error) {
        console.error(error);
        return;
      }

      openModalHandler(dispatch, 'reload');
      return () => clearTimeout(timer);
    }, endRandomCount);
  }, [
    curiTypeCdNm,
    dispatch,
    endCount,
    schDeptAlias,
    scheduleId,
    selectedDate,
    userMajor,
  ]);

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

const LoadingContainer = styled.div`
  background: #ffffff;
  width: 30rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const LoadingText = styled.div`
  margin-bottom: 1rem;
  font-size: 1.6rem;
`;

const move = keyframes`
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 5rem 0;
    }
`;

const LoadingBar = styled.div`
  width: 100%;
  height: 2rem;
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
