import styled from 'styled-components';
import logo from '@assets/img/tutorial_sejong_logo.webp';
import TopNav from './TopNav';
import TopMenu from './TopMenu';

function Header() {
  return (
    <HeaderContainer>
      <div>
        <img src={logo} />
        세종 튜토리얼
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
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  > div > img {
    height: 6rem;
    padding-right: 1rem;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  justify-content: space-between;
  margin-left: 2rem;
`;

export default Header;
