import styled from 'styled-components';
import {CourseTypes} from '@/assets/types/tableType';
import {useAppDispatch} from '@/store/hooks';
import {setCourseData} from '@/store/modules/modalSlice';
import {openModalHandler} from '../common/Modal/handlers/handler';

interface RankItemProps {
  courseData: CourseTypes;
}

function RankItem({courseData}: RankItemProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    openModalHandler(dispatch, 'wishrank');
    dispatch(setCourseData(courseData));
  };

  return (
    <RankWrap onClick={handleClick}>
      <RankNo>{courseData.rank}</RankNo>
      <p>{courseData.curiNm}</p>
      <p>{courseData.lesnEmp}</p>
    </RankWrap>
  );
}

const RankWrap = styled.button`
  ${props => props.theme.texts.tabTitle};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 6fr 3fr;
  align-items: center;
  column-gap: 0.5rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.neutral5};

  > p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  &:hover {
    background-color: ${props => props.theme.colors.neutral6};
  }
`;

const RankNo = styled.p`
  color: ${props => props.theme.colors.primary};
`;

export default RankItem;
