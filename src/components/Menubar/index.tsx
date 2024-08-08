import styled from 'styled-components';
import BarTitle from './BarTitle';
import Menu from './Menu';

function Menubar() {
  return (
    <BarContainer>
      <BarTitle />
      <Menu />
    </BarContainer>
  );
}

const BarContainer = styled.div`
  width: 23rem;
`;

export default Menubar;
