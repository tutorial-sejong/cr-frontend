import styled from 'styled-components';
import Filters from './Filters';
import Table from '@components/common/Table';

const data = [
  {
    schDeptAlias: '대양휴머니티칼리지',
    curiNo: '011312',
    class_: '001',
    schCollegeAlias: '대양휴머니티칼리지',
    curiNm: '경영학',
    curiLangNm: null,
    curiTypeCdNm: '균형교양필수',
    sltDomainCdNm: '경제와사회',
    tmNum: '3.0 / 3 / 0',
    studentYear: '2',
    corsUnitGrpCdNm: '학사',
    manageDeptNm: '대양휴머니티칼리지',
    lesnEmp: '이지훈',
    lesnTime: '목 18:00~19:00',
    lesnRoom: '집301',
    cyberTypeCdNm: '본교 e-러닝강의',
    internshipTypeCdNm: null,
    inoutSubCdtExchangeYn: null,
    remark: '사회과학,경영경제,호텔관광대학2 제외',
  },
  {
    schDeptAlias: '대양휴머니티칼리지',
    curiNo: '011312',
    class_: '001',
    schCollegeAlias: '대양휴머니티칼리지',
    curiNm: '경영학',
    curiLangNm: null,
    curiTypeCdNm: '균형교양필수',
    sltDomainCdNm: '경제와사회',
    tmNum: '3.0 / 3 / 0',
    studentYear: '2',
    corsUnitGrpCdNm: '학사',
    manageDeptNm: '대양휴머니티칼리지',
    lesnEmp: '이지훈',
    lesnTime: '목 18:00~19:00',
    lesnRoom: '집301',
    cyberTypeCdNm: '본교 e-러닝강의',
    internshipTypeCdNm: null,
    inoutSubCdtExchangeYn: null,
    remark: '사회과학,경영경제,호텔관광대학2 제외',
  },
  {
    schDeptAlias: '대양휴머니티칼리지',
    curiNo: '011312',
    class_: '001',
    schCollegeAlias: '대양휴머니티칼리지',
    curiNm: '경제학',
    curiLangNm: null,
    curiTypeCdNm: '균형교양필수',
    sltDomainCdNm: '경제와사회',
    tmNum: '3.0 / 3 / 0',
    studentYear: '2',
    corsUnitGrpCdNm: '학사',
    manageDeptNm: '대양휴머니티칼리지',
    lesnEmp: '이지훈',
    lesnTime: '목 18:00~19:00',
    lesnRoom: '집301',
    cyberTypeCdNm: '본교 e-러닝강의',
    internshipTypeCdNm: null,
    inoutSubCdtExchangeYn: null,
    remark: '사회과학,경영경제,호텔관광대학2 제외',
  },
];

const colData = [
  {name: 'schDeptAlias', value: '개설학과전공', initialWidth: 167},
  {name: 'curiNo', value: '학수번호', initialWidth: 92},
  {name: 'class_', value: '분반', initialWidth: 58},
  {name: 'curiNm', value: '교과목명', initialWidth: 232},
  {name: 'curiLangNm', value: '강의언어', initialWidth: 73},
  {name: 'curiTypeCdNm', value: '이수구분'},
  {name: 'sltDomainCdNm', value: '선택영역', initialWidth: 136},
  {name: 'tmNum', value: '학점/이론/실습', initialWidth: 134},
  {name: 'studentYear', value: '학년 (학기)'},
  {name: 'corsUnitGrpCdNm', value: '대상과정'},
  {name: 'manageDeptNm', value: '주관학과', initialWidth: 135},
  {name: 'lesnEmp', value: '교수명'},
  {name: 'lesnTime', value: '요일 및 강의시간', initialWidth: 130},
  {name: 'lesnRoom', value: '강의실', initialWidth: 114},
  {name: 'cyberTypeCdNm', value: '사이버강좌', initialWidth: 104},
  {name: 'internshipTypeCdNm', value: '강좌유형', initialWidth: 126},
  {name: 'inoutSubCdtExchangeYn', value: '학점교류수강가능', initialWidth: 130},
  {name: 'remark', value: '수강대상및유의사항', initialWidth: 230},
];

function LectureList() {
  return (
    <ListContainer>
      <Filters />
      <Table
        colData={colData}
        data={data}
        initialWidth='126.9rem'
        height='57.2rem'
      />
    </ListContainer>
  );
}

const ListContainer = styled.div``;

export default LectureList;
