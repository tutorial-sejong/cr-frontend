import styled from 'styled-components';
import Bg from '@assets/img/login_bg.webp';
import Logo from '@assets/img/tutorial_sejong_logo.webp';

import LoginForm from '@components/LoginForm/index';
import githubIcon from '@assets/img/github-fill.svg';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {

  const [isTermsCheck, setTermsCheck] = useState(false);

  const navigate = useNavigate();

  const handleTermsCheck = (e: React.ChangeEvent<HTMLInputElement>) => {

    setTermsCheck(e.target.checked);
  };

  return (
    <Container>
      <Box>
        <LogoWrap>
          <img src={Logo} />
        </LogoWrap>
        <TitleWrap>
          <Title>로그인</Title>
          <SubTitle>본 서비스는 실제 수강신청 시스템이 아닙니다.</SubTitle>
          <p>
            수강신청 연습사이트 <em>tutorial-sejong</em> 입니다.
            <br />
            <em>임의</em>의 <em>학번</em>을 입력해주시면 됩니다.
            <br />
            동일한 학번으로 로그인하면 <em>이전</em>의 <em>관심과목</em>을 불러옵니다.
            {/*서비스 이용을 끝낸 후에는 개인정보보호를 위하여 꼭 <em>로그아웃</em>*/}
            {/*을 해주시기 바랍니다.*/}
            {/*<br /> 아이디는 학생은 <em>학번</em>, 교수/직원은{' '}*/}
            {/*<em>포털 아이디(이메일아이디)</em>*/}
            {/*또는 <em>직번</em>입니다.*/}
          </p>
        </TitleWrap>
        <FormWrap>
          <LoginForm isTermsCheck={isTermsCheck} />
          {/*<WarningWrap>*/}
          {/*</WarningWrap>*/}
          {/*<WarningWrap>*/}
          {/*</WarningWrap>*/}
          <FaqWrap>[ 장애 문의 ]: tutorialsejong@gmail.com</FaqWrap>
          <FaqWrap><img src={githubIcon} alt="github"
                        onClick={() => window.open('https://github.com/tutorial-sejong')} /></FaqWrap>
        </FormWrap>
        <TermsContainer>
          <TermsTitle>서비스 이용약관 동의</TermsTitle>
          <List>
            <ListItem>
              본 서비스는 <Highlight>실제 수강신청 사이트가 아닙니다.</Highlight>
            </ListItem>
            <ListItem>
              본 서비스에서 사용하는 학번은 <Highlight>실제 학번이 아닌 11자리 이상의 임의의 학번</Highlight>입니다.
            </ListItem>
            <ListItem>
              입력하신 비밀번호는 <Highlight>암호화 기술을 사용하여 보호</Highlight>됩니다. <Highlight>실제 사용하는 비밀번호가 아닌 임의의 비밀번호</Highlight>를
              사용하는 것이 좋습니다.
            </ListItem>
            <ListItem>
              본 서비스에서는 사용자가 입력한 학번, 비밀번호, 관심과목, 수강신청 목록이 저장됩니다.
            </ListItem>
            <ListItem>
              수집된 정보는 <Highlight>저장된 과목들을 사용자에게 불러오는 용도</Highlight>로만 사용되며, 다른 용도로는 사용되지 않습니다.
            </ListItem>
            <ListItem>
              저장된 정보는 <Highlight>매주 일요일에 자동으로 삭제</Highlight>됩니다.
            </ListItem>
            <ListItem>
              일요일 전에 관심과목 목록을 삭제하고 싶으시면, <Highlight
              onClick={() => navigate('/delete')}>https://tutorial-sejong.com/delete</Highlight>로 접속하여 로그인 시 입력한 학번을
              입력하시면 됩니다.
            </ListItem>
            <ListItem>
              학번을 기억하지 못하실 경우, <Highlight>tutorialsejong@gmail.com</Highlight>으로 메일 주시면, 관심과목 목록 및 로그인 시간을 기준으로 삭제를
              도와드리겠습니다.
            </ListItem>
            <ListItem>
              만약 관심과목 목록과 로그인 시간으로 확인할 수 없는 경우, 모든 정보를 삭제하도록 하겠습니다.
            </ListItem>
          </List>

          <CheckboxWrap>
            <input type="checkbox" id="keyboardSecurity" checked={isTermsCheck} onChange={handleTermsCheck} />
            <label htmlFor="keyboardSecurity">이용약관동의</label>
          </CheckboxWrap>
        </TermsContainer>
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
    height: 700px;
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

    > img {
        width: 150px;
    }
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

const SubTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
`;

const FormWrap = styled.div`
    margin-bottom: 2.5rem;
`;

// const WarningWrap = styled.p`
//     ${props => props.theme.texts.loginContent};
//     margin-bottom: 2.5rem;
// `;

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

/*const FooterWrap = styled.div`
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
`;*/

const TermsContainer = styled.div`
    max-width: 880px;
    margin: 0 auto 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CheckboxWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -0.5rem;
    margin-top: 1rem;
`;

const TermsTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;

    &::before {
        content: '•';
        color: #007bff;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
    }
`;

const Highlight = styled.span`
    cursor: pointer;
    font-weight: bold;
    color: #007bff;
`;
export default Login;
