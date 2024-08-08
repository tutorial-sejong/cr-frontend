import {useAppDispatch, useAppSelector} from '@/store/hooks';
import styled from 'styled-components';
import Tab from './Tab';
import {deleteAll, setFocused} from '@/store/modules/tabSlice';

function TabMenu() {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector(state => state.tabs.tab);
  const focused = useAppSelector(state => state.tabs.focused);

  const handleClick = (id: number) => {
    dispatch(setFocused(id));
  };

  const handleCloseAll = () => {
    dispatch(deleteAll());
  };

  return (
    <TabMenuContainer>
      <TabWrap>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.name}
            onClick={handleClick}
            isActive={focused === tab.id}
          />
        ))}
      </TabWrap>
    </TabMenuContainer>
  );
}

const TabMenuContainer = styled.div`
  width: 100%;
  height: 4rem;
  background-color: ${props => props.theme.colors.neutral6};
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const TabWrap = styled.div`
  width: 100%;
  display: flex;
`;


export default TabMenu;
