import {useEffect, useState} from 'react';
import {useAppSelector} from '@/store/hooks';
import {CourseTypes} from '@/assets/types/tableType';
import RegisterFilters from './RegisterFilters';
import Table from '../common/Table';
import {TableTitle, TableTitleWrap} from '../LectureList';
import {getWishlist, postCourse} from '@/apis/api/course';
import RegisteredList from './RegisteredList';

const colData = [
  {name: 'action', value: '신청', initialWidth: 30, enableFilters: false},
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

function CourseRegister() {
  const studentId = useAppSelector(state => state.userInfo.username);
  const [list, setList] = useState<CourseTypes[]>([]);

  useEffect(() => {
    const getList = async () => {
      await getWishlist(studentId).then(res => {
        setList(res);
      });
    };

    getList();
  }, []);

  const handleAction = async (
    action: string,
    scheduleId: number | undefined,
  ) => {
    if (scheduleId) {
      await postCourse(scheduleId).then(() => {
        console.log('register success');
      });
    }
  };

  return (
    <>
      <RegisterFilters setList={setList} />
      <TableTitleWrap>
        <TableTitle>수강대상교과목</TableTitle>
      </TableTitleWrap>
      <Table
        colData={colData}
        data={list}
        width='100%'
        height='35rem'
        onAction={handleAction}
      />
      <RegisteredList />
    </>
  );
}

export default CourseRegister;
