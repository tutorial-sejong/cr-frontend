import {useCallback, useEffect, useState} from 'react';
import {CourseTypes} from '@/assets/types/tableType';
import RegisterFilters from './RegisterFilters';
import Table from '../common/Table';
import {TableTitle, TableTitleWrap} from '../LectureList';
import RegisteredList from './RegisteredList';
import {useDispatch} from 'react-redux';
import {
  setCourseName,
  setModalName,
  setScheduleId,
} from '@/store/modules/modalSlice';
import StartButton from '@components/CourseRegister/StartButton.tsx';
import {getCourseList, getRegisterdList, getWishlist} from '@/apis/api/course';
import {useAppSelector} from '@/store/hooks';
import {openModalHandler} from '../common/Modal/handlers/handler';
import {setEndCount} from '@/store/modules/courseRegisteredSlice';
import RegisterInfo from './RegisterInfo';

const colData = [
  {name: 'action', value: '신청', initialWidth: 50, enableFilters: false},
  {name: 'curiNo', value: '학수번호', initialWidth: 92},
  {name: 'classNo', value: '분반', initialWidth: 58},
  {name: 'schDeptAlias', value: '개설학과', initialWidth: 177},
  {name: 'curiNm', value: '교과목명', initialWidth: 242},
  {name: 'curiLangNm', value: '강의언어', initialWidth: 73},
  {name: 'tmNum', value: '학점/이론/실습', initialWidth: 144},
  {name: 'curiTypeCdNm', value: '이수구분'},
  {name: 'studentYear', value: '학년 (학기)'},
  {name: 'lesnTime', value: '요일 및 강의시간', initialWidth: 183},
  {name: 'lesnEmp', value: '교수명', initialWidth: 238},
  {name: 'lesnRoom', value: '강의실', initialWidth: 114},
  {name: 'remark', value: '수강대상및유의사항', initialWidth: 610},
];

function CourseRegister() {
  const [isConfirm, setIsConfirm] = useState(false);
  const [list, setList] = useState<CourseTypes[]>([]);
  const [registeredList, setRegisteredList] = useState<CourseTypes[]>([]);
  const [currentFilter, setCurrentFilter] = useState<CourseTypes>({});
  const [currentSearchOption, setCurrentSearchOption] =
    useState<string>('관심과목');
  const [isRegistrationStarted, setIsRegistrationStarted] =
    useState<boolean>(false);
  const [isFirstSearch, setIsFirstSearch] = useState<boolean>(true);

  const dispatch = useDispatch();
  const studentId = useAppSelector(state => state.userInfo.username);

  useEffect(() => {
    dispatch(setEndCount(false));
  }, []);

  const refreshAll = useCallback(async () => {
    const registeredCourses = await getRegisterdList();
    setRegisteredList(registeredCourses || []);

    let searchResult: CourseTypes[] = [];
    if (currentSearchOption === '관심과목') {
      searchResult = await getWishlist(studentId);
    } else {
      searchResult = await getCourseList(currentFilter);
    }
    setList(searchResult);
  }, [currentFilter, currentSearchOption, studentId]);

  const handleSearch = async (
    newList: CourseTypes[],
    filter: CourseTypes,
    searchOption: string,
  ) => {
    if (isRegistrationStarted && isFirstSearch) {
      openModalHandler(dispatch, 'waiting');
      setIsFirstSearch(false);
    }
    setList(newList);
    setCurrentFilter(filter);
    setCurrentSearchOption(searchOption);
    const registeredCourses = await getRegisterdList();
    setRegisteredList(registeredCourses || []);
  };

  const handleStartButtonClick = () => {
    setList([]);
    setRegisteredList([]);
    setIsRegistrationStarted(true);
    setIsFirstSearch(true);
    dispatch(setEndCount(false));

    setTimeout(() => {
      console.log('35초 지남');
      dispatch(setEndCount(true));
    }, 35000);
  };

  const handleAction = async (
    _action: string,
    scheduleId: number | undefined,
    curiNm: string | undefined,
  ) => {
    if (scheduleId && curiNm) {
      dispatch(setScheduleId(scheduleId));
      dispatch(setCourseName(curiNm));
      dispatch(setModalName('macro'));
    }
  };

  return (
    <>
      {!isConfirm ? (
        <RegisterInfo onClickNext={() => setIsConfirm(true)} />
      ) : (
        <>
          <StartButton onClick={handleStartButtonClick} />
          <RegisterFilters
            onSearch={handleSearch}
            isRegistrationStarted={isRegistrationStarted}
          />
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
          <RegisteredList list={registeredList} refreshAll={refreshAll} />
        </>
      )}
    </>
  );
}

export default CourseRegister;
