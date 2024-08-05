import styled from 'styled-components';
import Bg from '@assets/img/login_bg.png';
import Logo from '@assets/img/logo.png';
import LoginForm from '@components/LoginForm/index';
import githubIcon from '@assets/img/github-fill.svg';
function Login() {
  return (
    <Container>
      <Box>
        <LogoWrap>
          <img src={Logo} />
        </LogoWrap>
        <TitleWrap>
          <Title>통합 로그인</Title>
          <p>
            서비스 이용을 끝낸 후에는 개인정보보호를 위하여 꼭 <em>로그아웃</em>
            을 해주시기 바랍니다.
            <br /> 아이디는 학생은 <em>학번</em>, 교수/직원은{' '}
            <em>포털 아이디(이메일아이디)</em>
            또는 <em>직번</em>입니다.
          </p>
        </TitleWrap>
        <FormWrap>
          <LoginForm />
          <WarningWrap>
            동일한 학번으로 로그인하면 이전의 관심과목을 불러옵니다.
          </WarningWrap>
          <WarningWrap>
            비밀번호도 임의의 비밀번호를 입력해주시면 됩니다.
          </WarningWrap>
          <FaqWrap>[ 장애 문의 ]: tutorialsejong@gmail.com</FaqWrap>
          <FaqWrap><img src={githubIcon} alt="github" onClick={() =>  window.open('https://github.com/tutorial-sejong')}/></FaqWrap>
        </FormWrap>
        {/*<FooterWrap>*/}
        {/*  <em>세종대학교</em> 05006 서울특별시 광진구 능동로 209 (군자동) |{' '}*/}
        {/*  <em>TEL </em>*/}
        {/*  02.3408.3114 | <em>E-MAIL</em> itservice@sejong.ac.kr*/}
        {/*  <br />*/}
        {/*  <p>COPYRIGHT 2012 SEJONG UNIVERSITY. ALL RIGHTS RESVERED.</p>*/}
        {/*</FooterWrap>*/}
      </Box>
    </Container>
  );
}

const Container = styled.div`
    background: url(${Bg}) 50% 50% no-repeat;
    background-size: cover;
    height: 480px;
    background-color: #fafafa;
    width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrap = styled.div`
  margin: 3rem 0;
`;

const TitleWrap = styled.div`
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-bottom: 2.5rem;
  > p {
    line-height: 2.5rem;
    font-weight: 600;
    font-size: 1.35rem;
  }
  > p > em {
    color: #ffea9b;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const FormWrap = styled.div`
  margin-bottom: 2.5rem;
`;

const WarningWrap = styled.p`
  ${props => props.theme.texts.loginContent};
  margin-bottom: 2.5rem;
`;

const FaqWrap = styled.div`
  ${props => props.theme.texts.loginContent};
    > img {
        width: 30px;
        cursor: pointer;
        display: block;
        text-align: center;
        margin: 20px auto;
    }
`;

const FooterWrap = styled.div`
  ${props => props.theme.texts.loginContent};
  letter-spacing: 0;
  > em {
    color: ${props => props.theme.colors.black};
  }
  > p {
    color: gray;
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;
    margin: 0.7rem 0 3rem 0;
  }
`;

export default Login;
