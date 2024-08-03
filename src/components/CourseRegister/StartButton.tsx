import styled from 'styled-components';
import {openModalHandler} from '@components/common/Modal/handlers/handler.tsx';
import {getCourseList, getWishlist} from '@apis/api/course.ts';
import {FiltersProps} from '@components/LectureList/Filters.tsx';
import {useAppSelector} from '@store/hooks';
import {useDispatch} from 'react-redux';

function StartButton({setList, setStartVisible}: {setList: FiltersProps}) {

  const studentId = useAppSelector(state => state.userInfo.username);

  const dispatch = useDispatch();

  const searchLecture = async () => {
    await getWishlist(studentId).then(res => {
      setList(res);
    });
  };

  const handleClick = () => {
    if (!confirm('수강신청 연습 시작하시겠습니까?')) return;

    openModalHandler(dispatch, 'waiting');
    setStartVisible(false);
    searchLecture();
  };

  return (
    <Container>
      <p>시작 버튼을 누르면, 수강 신청이 시작됩니다.</p>
      <ButtonWrap onClick={handleClick}>시작</ButtonWrap>
    </Container>
  );
}

const Container = styled.div`
    > p {
        font-weight: normal;
        font-size: 1.6rem;
        margin-bottom: 5px;
    }
`;
const ButtonWrap = styled.button`
    ${props => props.theme.texts.content};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    width: 6rem;
    height: 2.4rem;
    margin-bottom: 10px;

    &:hover {
        filter: grayscale(15%);
    }
`;
export default StartButton;