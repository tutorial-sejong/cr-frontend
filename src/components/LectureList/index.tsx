import styled from 'styled-components';
import Filters from './Filters';
import Table from '@components/common/Table';
import {useEffect, useState} from 'react';
import {CourseTypes} from '@assets/types/tableType';
import {getCourseList} from '@/apis/api/course';

const colData = [
  {name: 'schDeptAlias', value: '개설학과전공', initialWidth: 167},
  {name: 'curiNo', value: '학수번호', initialWidth: 92},
  {name: 'classNo', value: '분반', initialWidth: 58},
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
  const [list, setList] = useState<CourseTypes[]>([]);

  useEffect(() => {
    const getList = async () => {
      await getCourseList({}).then(res => {
        setList(res);
      });
    };

    getList();
  }, []);

  return (
    <ListContainer>
      <Filters setList={setList} />
      <TableTitleWrap>
        <TableTitle>개설강좌</TableTitle>
      </TableTitleWrap>
      <Table colData={colData} data={list} width='100%' height='57.2rem' />
    </ListContainer>
  );
}

const ListContainer = styled.div``;

export const TableTitleWrap = styled.div`
  margin-bottom: 1rem;
`;

export const TableTitle = styled.div`
  ${props => props.theme.texts.subtitle};
  border-left: 4px solid ${props => props.theme.colors.primary};
  padding-left: 0.5rem;
`;

export default LectureList;
