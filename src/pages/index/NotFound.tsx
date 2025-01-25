import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import Bg from '@assets/img/login_bg.webp';
import Logo from '@assets/img/tutorial_sejong_logo.webp';

function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <Container>
      <Box>
        <LogoWrap>
          <img src={Logo} />
        </LogoWrap>
        <TextWrap>
          해당 페이지를 찾을 수 없습니다.
          <p>
            찾으시는 페이지의 주소를 잘못 입력하였거나,
            <br /> 해당 페이지의 주소가 변경 또는 삭제되었을 수 있습니다.
          </p>
        </TextWrap>
        <HomeBtn onClick={handleClick}>홈으로 이동</HomeBtn>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  background: url(${Bg}) 50% 50% no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrap = styled.div`
  margin-bottom: 1.7rem;

  > img {
    width: 15rem;
  }
`;

const TextWrap = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.neutral6};
  text-align: center;

  > p {
    ${props => props.theme.texts.tabTitle};
    color: ${props => props.theme.colors.neutral6};
    line-height: 2rem;
    margin-top: 1.5rem;
  }
`;

const HomeBtn = styled.button`
  ${props => props.theme.texts.subtitle};
  color: ${props => props.theme.colors.neutral6};
  text-decoration: underline;
  margin-top: 2.5rem;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export default NotFound;
