import styled, {css} from 'styled-components';
import close from '@assets/img/close-line-red.png';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {delTab, setFocused} from '@/store/modules/tabSlice';

interface TabProps {
  id: number;
  label: string;
  isActive: boolean;
  onClick: (id: number) => void;
}

function Tab({id, label, isActive, onClick}: TabProps) {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector(state => state.tabs.tab);
  const idx = tabs.findIndex(item => item.id === id);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (idx === 0) {
      dispatch(setFocused(tabs[idx + 1].id));
    } else {
      dispatch(setFocused(tabs[idx - 1].id));
    }
    dispatch(delTab(id));
  };

  return (
    <TabContainer onClick={() => onClick(id)} $isactive={isActive}>
      <p>{label}</p>
      <CloseBtn onClick={handleClose} />
    </TabContainer>
  );
}

const TabContainer = styled.a<{$isactive: boolean}>`
  ${props =>
    props.$isactive
      ? props.theme.texts.tabTitleFocus
      : props.theme.texts.tabTitle};
  background-color: ${props =>
    props.$isactive ? props.theme.colors.white : 'transparent'};
  width: calc(99% / 7);
  height: 102%;
  border-bottom: none;
  border-right: 1px solid #ccc;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  filter: ${props => (props.$isactive ? 'grayscale(0)' : 'grayscale(100%)')};
  position: relative;
  overflow: hidden;

  > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    margin-right: 1rem;
  }

  ${props =>
    !props.$isactive &&
    css`
      &:hover {
        color: ${props => props.theme.colors.primary};
        filter: grayscale(0);
      }
    `}
`;

const CloseBtn = styled.button`
  z-index: 5;
  width: 1.8rem;
  height: 100%;
  background-image: url(${close});
  background-size: 1.8rem;
  background-repeat: no-repeat;
  background-position-y: center;
`;

export default Tab;
