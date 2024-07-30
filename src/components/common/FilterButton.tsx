import styled from 'styled-components';
import search from '@assets/img/search.png';
import {CourseTypes} from '@/assets/types/tableType';
import {getCourseList} from '@/apis/api/course';

interface ButtonProps {
  label: string;
  filter?: CourseTypes;
  setList: React.Dispatch<React.SetStateAction<CourseTypes[]>>;
}

function FilterButton({label, filter = {}, setList}: ButtonProps) {
  const handleClick = async () => {
    await getCourseList(filter).then(res => {
      setList(res);
    });
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
