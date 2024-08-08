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
    width: 210px;
    margin-left: 10px;
    margin-right: 10px;
`;


export default Menubar;
