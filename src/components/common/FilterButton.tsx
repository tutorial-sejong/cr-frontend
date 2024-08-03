import styled from 'styled-components';
import search from '@assets/img/search.png';
import {CourseTypes} from '@/assets/types/tableType';
import {getCourseList, getWishlist} from '@/apis/api/course';
import {useAppSelector} from '@/store/hooks';

interface ButtonProps {
  label: string;
  filter: CourseTypes;
  onSearch: (newList: CourseTypes[], filter: CourseTypes, searchOption: string) => Promise<void>;
  searchOption: string;
}

function FilterButton({label, filter, onSearch, searchOption}: ButtonProps) {
  const studentId = useAppSelector(state => state.userInfo.username);

  const searchLecture = async () => {
    let result: CourseTypes[] = [];
    if (searchOption === '관심과목') {
      result = await getWishlist(studentId);
    } else {
      result = await getCourseList(filter);
    }
    onSearch(result, filter, searchOption);
  };

  const handleClick = async () => {
    searchLecture();
  };

  return (
    <ButtonWrap onClick={handleClick}>
      <img src={search} />
      {label}
    </ButtonWrap>
  );
}

const ButtonWrap = styled.button`
  ${props => props.theme.texts.content};
  background: linear-gradient(
    90deg,
    rgba(163, 20, 50, 1) 0%,
    rgba(51, 77, 97, 1) 100%
  );
  color: ${props => props.theme.colors.white};
  min-width: 6.5rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

export default FilterButton;
