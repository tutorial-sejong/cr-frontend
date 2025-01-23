import styled from 'styled-components';
import close from '@assets/img/close-line.png';
import {useDispatch} from 'react-redux';
import {closeHandler} from '@components/common/Modal/handlers/handler.tsx';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {getWishlist} from '@/apis/api/course';
import {useAppSelector} from '@/store/hooks';
import WishTimetable from './WishTimetable';

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
    <ModalContainer $isEmpty={isEmpty}>
      <Modal $isEmpty={isEmpty}>
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
        <ModalFooter>
          <InfoMessage>
            ※ 시간표가 표시되지 않는 경우 잠시 기다리거나 관심과목 강의 시간표
            창을 닫고 새로 열어주세요.
          </InfoMessage>
          <FooterWrap>
            <FooterBtn style={{marginRight: '20px'}} onClick={closeButton}>
              닫기
            </FooterBtn>
          </FooterWrap>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
}

const ModalContainer = styled.div<{$isEmpty: boolean}>`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  z-index: 10;
  overflow: auto;
  position: ${({$isEmpty}) => ($isEmpty ? 'absolute' : 'fixed')};
  align-items: ${({$isEmpty}) => ($isEmpty ? 'center' : 'flex-start')};
`;

const Modal = styled.div<{$isEmpty: boolean}>`
  position: relative;
  width: 82rem;
  height: 100%;
  border: 1px solid #000000;
  background: #ffffff;
  font-weight: lighter;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 3rem;
  width: ${({$isEmpty}) => ($isEmpty ? '60rem' : '82rem')};
  height: ${({$isEmpty}) => ($isEmpty ? '24rem' : '108rem')};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ababab;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  padding: 15px 30px;
`;

const CloseImage = styled.img.attrs({
  src: `${close}`,
})`
  display: block;
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
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

const ModalFooter = styled.div`
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

const FooterWrap = styled.div`
  background: ${props => props.theme.colors.neutral5};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
`;

const FooterBtn = styled.div`
  font-size: 1.4rem;
  border: 1px solid #000000;
  background: #ffffff;
  padding: 6px 15px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;

export default TimetableModal;
