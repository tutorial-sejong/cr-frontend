import styled from 'styled-components';
import search from '@assets/img/search.png';
import {CourseTypes} from '@/assets/types/tableType';
import {getCourseList, getWishlist} from '@/apis/api/course';
import {useAppSelector} from '@/store/hooks';
import {openModalHandler} from '@components/common/Modal/handlers/handler.tsx';
import {useDispatch} from 'react-redux';

interface ButtonProps {
  label: string;
  page?: string;
  filter?: CourseTypes;
  setList: React.Dispatch<React.SetStateAction<CourseTypes[]>>;
}

function FilterButton({label, page, filter = {}, setList}: ButtonProps) {
  const studentId = useAppSelector(state => state.userInfo.username);

  const dispatch = useDispatch();
  const handleClick = async () => {

    if (page === '수강신청') {
      if (!confirm('수강신청 연습 시작하시겠습니까?')) return;

      openModalHandler(dispatch, 'waiting');

      const getList = async () => {
        await getWishlist(studentId).then(res => {
          setList(res);
        });
      };

      getList();
      return;
    }

    if (filter.curiNm === 'wish') {
      await getWishlist(studentId).then(res => {
        setList(res);
      });
    }
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
