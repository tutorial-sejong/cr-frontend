import styled from 'styled-components';
import {CourseTypes} from '@/assets/types/tableType';
import {getCourseList, getWishlist} from '@/apis/api/course';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {setField, setType} from '@/store/modules/errorSlice';
import {openModalHandler} from './Modal/handlers/handler';

interface ButtonProps {
  label: string;
  filter: CourseTypes;
  isRegister?: boolean;
  onSearch: (
    newList: CourseTypes[],
    filter: CourseTypes,
    searchOption: string,
  ) => Promise<void>;
  searchOption: string;
  isRegistrationStarted?: boolean;
}

function FilterButton({
  label,
  filter,
  onSearch,
  searchOption,
  isRegister = false,
  isRegistrationStarted,
}: ButtonProps) {
  const dispatch = useAppDispatch();
  const studentId = useAppSelector(state => state.userInfo.username);

  const setError = () => {
    openModalHandler(dispatch, 'fail');
    dispatch(setType(422));
    dispatch(setField(searchOption));
  };

  const searchLecture = async () => {
    let result: CourseTypes[] = [];

    if (searchOption === '관심과목') {
      result = await getWishlist(studentId);
    } else {
      if (isRegister) {
        if (Object.keys(filter).length == 0 && filter.constructor === Object) {
          setError();
          return;
        } else {
          const checked = Object.values(filter).filter(item => item.length < 2);
          if (checked.length !== 0) {
            setError();
            return;
          }
        }
      }
      result = await getCourseList(filter);
    }
    onSearch(result, filter, searchOption);
  };

  const handleClick = async () => {
    if (label === '조회') {
      searchLecture();
      return;
    }

    if (label === '검색' && isRegistrationStarted) searchLecture();
    return;
  };

  return <ButtonWrap onClick={handleClick}>{label}</ButtonWrap>;
}

const ButtonWrap = styled.button`
  ${props => props.theme.texts.content};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  min-width: 6.5rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

export default FilterButton;
