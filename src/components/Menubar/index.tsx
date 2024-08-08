import styled from 'styled-components';
import BarTitle from './BarTitle';
import Menu from './Menu';

function Menubar() {

  return (
    <BarContainer>
        <OpendBar>
          <BarTitle />
          <Menu />
        </OpendBar>
    </BarContainer>
  );
}

const BarContainer = styled.div`
  height: 100vh;
`;

const OpendBar = styled.div`
  width: 23rem;
`;

const ClosedBar = styled.div`
  width: 2rem;
  height: 100%;
  background-color: ${props => props.theme.colors.neutral4};
`;

const OpenBtn = styled.button`
  width: 100%;
  height: 4rem;
  background-color: ${props => props.theme.colors.primary};
  > img {
    transform: rotate(180deg);
  }
`;

export default Menubar;
