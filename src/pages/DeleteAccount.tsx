import styled from 'styled-components';
import Bg from '@assets/img/delete_bg.webp';
import Logo from '@assets/img/tutorial_sejong_logo.webp';

import githubIcon from '@assets/img/github-fill.svg';
import DeleteAccountForm from '@components/DeleteAccount/DeleteAccountForm.tsx';

function DeleteAccount() {

  return (
    <Container>
      <Box>
        <LogoWrap>
          <img src={Logo} />
        </LogoWrap>
        <TitleWrap>
          <Title>유저정보 제거</Title>
          <SubTitle>가입하신 학번을 입력하면, 정보가 제거됩니다.</SubTitle>
        </TitleWrap>
        <FormWrap>
          <DeleteAccountForm />
          <FaqWrap>[ 장애 문의 ]: tutorialsejong@gmail.com</FaqWrap>
          <FaqWrap><img src={githubIcon} alt="github"
                        onClick={() => window.open('https://github.com/tutorial-sejong')} /></FaqWrap>
        </FormWrap>
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

const FaqWrap = styled.div`
    ${props => props.theme.texts.loginContent};
    text-align: center;
    color: #fff;
    > img {
        width: 30px;
        cursor: pointer;
        display: block;
        text-align: center;
        margin: 20px auto;
    }
`;

export default DeleteAccount;
