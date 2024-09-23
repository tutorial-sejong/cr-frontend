import styled from 'styled-components';
import logo from '@assets/img/tutorial_sejong_logo.webp';
import TopNav from './TopNav';
import TopMenu from './TopMenu';

function Header() {
  return (
    <HeaderContainer>
      <LogoBox>
        <img src={logo} />
        <TopNav />
      </LogoBox>
      <HeaderBox>
        <TopMenu />
      </HeaderBox>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  border-top: 0.5rem solid ${props => props.theme.colors.primary};
  max-width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  > img {
    height: 6rem;
    display: block;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

export default Header;
