import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {closeHandler} from '@components/common/Modal/handlers/handler.tsx';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {getWishlist} from '@/apis/api/course';
import {useAppSelector} from '@/store/hooks';
import WishTimetable from './WishTimetable';
import {
  CloseImage,
  Modal,
  ModalContainer,
  ModalHeader,
  Title,
} from '@/styles/ModalLayout';

interface WishlistData {
  curiNm: string | undefined;
  lesnTime: string | undefined;
}

function TimetableModal() {
  const studentId = useAppSelector(state => state.userInfo.username);
  const [wishlistData, setWishlistData] = useState<WishlistData[]>([]);
  const dispatch = useDispatch();

  const fetchWishlist = useCallback(async () => {
    try {
      const data = await getWishlist(studentId);
      const processedData = data.map(({curiNm, lesnTime}) => ({
        curiNm,
        lesnTime,
      }));
      setWishlistData(processedData);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  }, [studentId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isEmpty = useMemo(
    () => (wishlistData.length === 0 ? true : false),
    [wishlistData],
  );

  const closeButton = () => {
    closeHandler(dispatch);
    document.body.style.overflow = 'auto';
  };

  return (
    <TimetableModalContainer $isEmpty={isEmpty}>
      <ModalWrap $isEmpty={isEmpty}>
        <ModalHeader>
          <Title>관심과목 강의 시간표</Title>
          <CloseImage onClick={closeButton} />
        </ModalHeader>
        <ModalBody>
          {isEmpty ? (
            <EmptyContent>관심과목이 없습니다.</EmptyContent>
          ) : (
            <WishTimetable wishlistData={wishlistData} />
          )}
        </ModalBody>
        <FooterWrap>
          <InfoMessage>
            ※ 시간표가 표시되지 않는 경우 잠시 기다리거나 관심과목 강의 시간표
            창을 닫고 새로 열어주세요.
          </InfoMessage>
          <ModalFooter>
            <FooterBtn style={{marginRight: '20px'}} onClick={closeButton}>
              닫기
            </FooterBtn>
          </ModalFooter>
        </FooterWrap>
      </ModalWrap>
    </TimetableModalContainer>
  );
}

const TimetableModalContainer = styled(ModalContainer)<{$isEmpty: boolean}>`
  overflow: auto;
  position: ${({$isEmpty}) => ($isEmpty ? 'absolute' : 'fixed')};
  align-items: ${({$isEmpty}) => ($isEmpty ? 'center' : 'flex-start')};
`;

const ModalWrap = styled(Modal)<{$isEmpty: boolean}>`
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 3rem;
  width: ${({$isEmpty}) => ($isEmpty ? '60rem' : '82rem')};
  height: ${({$isEmpty}) => ($isEmpty ? '24rem' : '108rem')};
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const EmptyContent = styled.div`
  font-size: 1.8rem;
`;

const FooterWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const InfoMessage = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1rem;
`;

const ModalFooter = styled.div`
  background: ${props => props.theme.colors.neutral5};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5rem;
`;

const FooterBtn = styled.div`
  font-size: 1.4rem;
  border: 1px solid #000000;
  background: #ffffff;
  padding: 0.6rem 1.5rem;
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;

export default TimetableModal;
