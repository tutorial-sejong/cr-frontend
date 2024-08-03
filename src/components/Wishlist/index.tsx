import styled from 'styled-components';
import Table from '@components/common/Table';
import Filters from './Filters';
import {CourseTypes} from '@/assets/types/tableType';
import {useCallback, useEffect, useState} from 'react';
import {deleteWishlistItem, getWishlist, saveWishlist} from '@/apis/api/course';
import {RootState} from '@/store/store';
import {useSelector} from 'react-redux';
import {TableTitle, TableTitleWrap} from '../LectureList';

const searchResultColData = [
  {name: 'action', value: '신청', initialWidth: 30, enableFilters: false},
  {name: 'schDeptAlias', value: '개설학과전공', initialWidth: 167},
  {name: 'curiNo', value: '학수번호', initialWidth: 92},
  {name: 'classNo', value: '분반', initialWidth: 58},
  {name: 'curiNm', value: '교과목명', initialWidth: 232},
  {name: 'curiTypeCdNm', value: '이수구분'},
  {name: 'tmNum', value: '학점/이론/실습', initialWidth: 134},
  {name: 'lesnEmp', value: '교수명'},
  {name: 'lesnTime', value: '요일 및 강의시간', initialWidth: 130},
  {name: 'lesnRoom', value: '강의실', initialWidth: 114},
];

const wishlistColData = [
  {name: 'action', value: '삭제', initialWidth: 30, enableFilters: false},
  {name: 'schDeptAlias', value: '개설학과전공', initialWidth: 167},
  {name: 'curiNo', value: '학수번호', initialWidth: 92},
  {name: 'classNo', value: '분반', initialWidth: 58},
  {name: 'curiNm', value: '교과목명', initialWidth: 232},
  {name: 'curiTypeCdNm', value: '이수구분'},
  {name: 'tmNum', value: '학점/이론/실습', initialWidth: 134},
  {name: 'lesnEmp', value: '교수명'},
  {name: 'lesnTime', value: '요일 및 강의시간', initialWidth: 130},
  {name: 'lesnRoom', value: '강의실', initialWidth: 114},
];

function Wishlist() {
  const [searchResultsData, setSearchResultsData] = useState<CourseTypes[]>([]);
  const [wishlistData, setWishlistData] = useState<CourseTypes[]>([]);
  const [registeredCourseCount, setRegisteredCourseCount] = useState(0);
  const [registeredCredits, setRegisteredCredits] = useState(0);
  const {username} = useSelector((state: RootState) => state.userInfo);

  const fetchWishlist = useCallback(async () => {
    try {
      const data = await getWishlist(username);
      setWishlistData(data);
      updateWishlistStats(data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  }, [username]);

  const updateWishlistStats = (data: CourseTypes[]) => {
    setRegisteredCourseCount(data.length);
    const totalCredits = data.reduce((sum, course) => {
      if (course.tmNum) {
        const creditMatch = course.tmNum.match(/^(\d+)/);
        const credit = creditMatch ? parseInt(creditMatch[1], 10) : 0;
        return sum + (isNaN(credit) ? 0 : credit);
      }
      return sum;
    }, 0);
    setRegisteredCredits(totalCredits);
  };

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleAction = async (
    action: string,
    scheduleId: number | undefined,
    _curiNm: string | undefined
  ) => {
    if (action === '신청' && scheduleId) {
      try {
        await saveWishlist(username, [scheduleId]);
        console.log('관심과목 담기 성공');
        fetchWishlist();
      } catch (error) {
        console.error('관심과목 담기 실패:', error);
      }
    } else if (action === '삭제' && scheduleId) {
      try {
        await deleteWishlistItem(username, scheduleId);
        console.log('관심과목 삭제 성공');
        fetchWishlist();
      } catch (error) {
        console.error('관심과목 삭제 실패:', error);
      }
    }
  };

  return (
    <WishlistContainer>
      <Filters setSearchResults={setSearchResultsData} />
      <WishlistInfo>
        <InfoBox>
          <InfoLabel>등록가능학점(임시):</InfoLabel>
          <InfoValue>24</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoLabel>등록과목수:</InfoLabel>
          <InfoValue>{registeredCourseCount}</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoLabel>등록학점:</InfoLabel>
          <InfoValue>{registeredCredits}</InfoValue>
        </InfoBox>
      </WishlistInfo>
      <TableWrapper>
        <TableSection>
          <TableTitleWrap>
            <TableTitle>관심과목 대상교과목</TableTitle>
          </TableTitleWrap>
          <Table
            colData={searchResultColData}
            data={searchResultsData}
            width='100%'
            height='calc(100vh - 200px)'
            onAction={handleAction}
          />
        </TableSection>
        <TableSection>
          <TableTitleWrap>
            <TableTitle>관심과목내역</TableTitle>
          </TableTitleWrap>
          <Table
            colData={wishlistColData}
            data={wishlistData}
            width='100%'
            height='calc(100vh - 200px)'
            onAction={handleAction}
          />
        </TableSection>
      </TableWrapper>
    </WishlistContainer>
  );
}

const WishlistContainer = styled.div`
  width: 100%;
`;

const TableWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const TableSection = styled.div`
  flex: 1;
  width: 50%;
  min-width: 0;
`;

const WishlistInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;

  span {
    margin-left: 20px;
  }
`;

const InfoBox = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 2px;
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  margin-right: 5px;
`;

const InfoValue = styled.span`
  font-size: 12px;
  font-weight: bold;
`;

export default Wishlist;
