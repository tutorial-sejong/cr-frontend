import styled from 'styled-components';
import BarTitle from './BarTitle';
import Menu from './Menu';
import Open from '@assets/img/close-sidebar.svg?react';

interface BarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Menubar({open, setOpen}: BarProps) {
  return (
    <BarContainer $open={open}>
      {open ? (
        <BarBox>
          <BarTitle setOpen={setOpen} />
          <Menu />
        </BarBox>
      ) : (
        <OpenBtnWrap onClick={() => setOpen(true)}>
          <OpenBtn />
        </OpenBtnWrap>
      )}
    </BarContainer>
  );
}

const BarContainer = styled.div<{$open: boolean}>`
  min-width: ${props => (props.$open ? '23rem' : '2rem')};
  background-color: ${props => props.theme.colors.white};
  height: 100%;
`;

const BarBox = styled.div``;

const OpenBtnWrap = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  width: 100%;
  height: 4rem;
`;

const OpenBtn = styled(Open)`
  transform: rotate(180deg);
`;

export default Menubar;
