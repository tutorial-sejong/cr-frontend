import {useAppDispatch, useAppSelector} from '@/store/hooks';
import styled from 'styled-components';
import Tab from './Tab';
import closeAll from '@assets/img/tab_close_all.png';
import up from '@assets/img/btn_gnb_cu.png';
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
      <ButtonWrap>
        <CloseAllBtn onClick={handleCloseAll} />
        <img src={up} />
      </ButtonWrap>
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

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  column-gap: 0.8rem;
`;

const CloseAllBtn = styled.button`
  width: 1.2rem;
  height: 100%;
  background-image: url(${closeAll});
  background-repeat: no-repeat;
  background-position-y: center;
`;

export default TabMenu;
