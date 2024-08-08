import styled from 'styled-components';
import logo from '@assets/img/tutorial_sejong_logo.webp';
import TopNav from './TopNav';
import TopMenu from './TopMenu';

function Header() {
  return (
    <HeaderContainer>
      <div>
        <img src={logo} />
      </div>
      <HeaderBox>
        <TopNav />
        <TopMenu />
      </HeaderBox>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  border-top: 0.5rem solid ${props => props.theme.colors.primary};
  max-width: 100%;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
    > div >img {
        height: 60px;
        padding-left: 5rem;
        padding-right: 3.5rem;
    }
`;

const HeaderBox = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  margin-left: 7.5rem;
`;

export default Header;
