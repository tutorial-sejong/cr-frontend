import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import MenuItem from './MenuItem';
import {addTab, setFocused} from '@/store/modules/tabSlice';

interface ItemProps {
  id: number;
  name: string;
  type: string;
}

const menuItems: ItemProps[] = [
  {id: 0, name: '강의시간표/수업계획서조회', type: 'search'},
  {id: 1, name: '관심과목 담기', type: 'bookmark'},
  {id: 2, name: '수강신청', type: 'study'},
];

function Menu() {
  const dispatch = useAppDispatch();
  const focused = useAppSelector(state => state.tabs.focused);

  const handleClick = (id: number) => {
    dispatch(addTab({id: id, name: menuItems[id].name}));
    dispatch(setFocused(id));
  };

  return (
    <MenuContainer>
      <MenuSubtitleBox>수강신청 및 기타</MenuSubtitleBox>
      <DetailBox>
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            id={item.id}
            onClick={handleClick}
            type={item.type}
            name={item.name}
            isActive={focused === item.id}
          />
        ))}
      </DetailBox>
    </MenuContainer>
  );
}

const MenuContainer = styled.div``;
const MenuTitleBox = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.neutral5};
`;

const MenuSubtitleBox = styled(MenuTitleBox)`
  ${props => props.theme.texts.menuTitle};
  justify-content: flex-start;
  column-gap: 1rem;
`;

const DetailBox = styled.div`
  background-color: ${props => props.theme.colors.neutral6};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export default Menu;
