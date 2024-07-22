import {useState} from 'react';
import styled from 'styled-components';
import Tab from './Tab';
import closeAll from '@assets/img/tab_close_all.png';
import up from '@assets/img/btn_gnb_cu.png';

function TabMenu() {
  const [focused, setFocused] = useState<number>(0);
  const [close, setClose] = useState(false);

  const handleClick = (id: number) => {
    console.log('click ' + id);

    setFocused(id);
  };

  return (
    <TabMenuContainer>
      <TabWrap>
        {!close && (
          <>
            <Tab
              id={0}
              label='강의시간표/수업계획서'
              onClick={handleClick}
              isActive={focused === 0}
            />
            <Tab
              id={1}
              label='수강신청'
              onClick={handleClick}
              isActive={focused === 1}
            />
          </>
        )}
      </TabWrap>
      <ButtonWrap>
        <CloseAllBtn onClick={() => setClose(true)} />
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
