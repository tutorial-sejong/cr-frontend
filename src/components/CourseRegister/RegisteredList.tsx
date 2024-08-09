import styled from 'styled-components';
import {deleteCourse} from '@/apis/api/course';
import {CourseTypes} from '@/assets/types/tableType';
import {TableTitle, TableTitleWrap} from '../LectureList';
import Table from '../common/Table';

const colData = [
  {name: 'action', value: '삭제', initialWidth: 30, enableFilters: false},
  {name: 'curiNo', value: '학수번호', initialWidth: 92},
  {name: 'classNo', value: '분반', initialWidth: 58},
  {name: 'schDeptAlias', value: '개설학과', initialWidth: 167},
  {name: 'curiNm', value: '교과목명', initialWidth: 232},
  {name: 'curiLangNm', value: '강의언어', initialWidth: 73},
  {name: 'tmNum', value: '학점/이론/실습', initialWidth: 134},
  {name: 'curiTypeCdNm', value: '이수구분'},
  {name: 'studentYear', value: '학년 (학기)'},
  {name: 'lesnTime', value: '요일 및 강의시간', initialWidth: 130},
  {name: 'lesnEmp', value: '교수명'},
  {name: 'lesnRoom', value: '강의실', initialWidth: 114},
  {name: 'remark', value: '수강대상및유의사항', initialWidth: 230},
];

interface RegisteredListProps {
  list: CourseTypes[];
  refreshAll: () => Promise<void>;
}

function RegisteredList({list, refreshAll}: RegisteredListProps) {
  const handleAction = async (
    _action: string,
    scheduleId: number | undefined,
  ) => {
    if (scheduleId) {
      await deleteCourse(scheduleId);
      await refreshAll();
    }
  };

  return (
    <ListContainer>
      <RegisteredTitleWrap>
        <TableTitle>수강신청내역</TableTitle>
        <ButtonWrap onClick={refreshAll}>재조회</ButtonWrap>
      </RegisteredTitleWrap>
      <Table
        data={list}
        colData={colData}
        width='100%'
        height='20rem'
        onAction={handleAction}
      />
    </ListContainer>
  );
}

const RegisteredTitleWrap = styled(TableTitleWrap)`
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

const ListContainer = styled.div`
  margin-top: 2rem;
`;

const ButtonWrap = styled.button`
  ${props => props.theme.texts.content};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  width: 6rem;
  height: 2.4rem;

  &:hover {
    filter: grayscale(15%);
  }
`;

export default RegisteredList;
