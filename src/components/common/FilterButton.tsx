import styled from 'styled-components';
import search from '@assets/img/search.png';
import {LectureProps} from '@components/LectureList/Filters';

interface ButtonProps {
  label: string;
  lecture: LectureProps | undefined;
}

function FilterButton({label, lecture}: ButtonProps) {
  const handleClick = () => {
    console.log(lecture);
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
