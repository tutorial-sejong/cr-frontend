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
          <SubTitle>
            본 서비스는 실제 세종대학교 수강신청 시스템이 아닙니다.
          </SubTitle>
          <p>
            수강신청 연습사이트 <em>tutorial-sejong</em> 입니다.
            <br />
            <em>임의</em>의 <em>학번</em>을 입력해주시면 됩니다.
            <br />
            동일한 학번으로 로그인하면 <em>이전</em>의 <em>관심과목</em>을
            불러옵니다.
          </p>
        </TitleWrap>
        <FormWrap>
          <LoginForm isTermsCheck={isTermsCheck} />
          <FaqWrap>[ 장애 문의 ]: tutorialsejong@gmail.com</FaqWrap>
          <FaqWrap>
            <img
              src={githubIcon}
              alt='github'
              onClick={() => window.open('https://github.com/tutorial-sejong')}
            />
          </FaqWrap>
        </FormWrap>
        <TermsContainer>
          <TermsTitle>서비스 이용약관 동의</TermsTitle>

          <List>
            <ListTitle>1. 서비스 목적</ListTitle>
            <List>
              <ListItem>
                본 서비스는 <Highlight>실제 수강신청 사이트가 아니며</Highlight>
                , 학습 목적으로 제공되는 모의 수강신청 시스템입니다. 본
                서비스에서 사용하는 학번은{' '}
                <Highlight>
                  실제 학번이 아닌, 11자리 이상의 임의로 생성된 학번
                </Highlight>
                입니다.
              </ListItem>
            </List>
          </List>

          <List>
            <ListTitle>2. 개인정보의 수집 및 이용</ListTitle>
            <List>
              <ListItem>
                수집하는 개인정보 항목: 본 서비스에서는 사용자가 입력한 임의의{' '}
                <Highlight>
                  학번, 비밀번호, 관심과목, 수강신청 목록을 수집
                </Highlight>
                합니다.
              </ListItem>
              <ListItem>
                개인정보 수집 목적: 수집된 정보는{' '}
                <Highlight>
                  사용자가 저장한 과목 목록을 불러오기 위한 용도
                </Highlight>
                로만 사용됩니다.{' '}
                <Highlight>
                  그 외 다른 목적으로는 절대 사용되지 않습니다.
                </Highlight>
              </ListItem>
              <ListItem>
                개인정보의 보유 및 이용 기간: 수집된 정보는{' '}
                <Highlight>매일 자정에 자동으로 삭제</Highlight>되며, 추가적인
                보관 기간은 없습니다.
              </ListItem>
              <ListItem>
                수집된 정보의 저장 위치: 수집된 정보는{' '}
                <Highlight>안전한 서버에 저장</Highlight>되며,{' '}
                <Highlight>외부로 유출되지 않도록 보호</Highlight>됩니다.
              </ListItem>
            </List>
          </List>

          <List>
            <ListTitle>3. 비밀번호 및 보안</ListTitle>
            <List>
              <ListItem>
                본 서비스에 입력된 비밀번호는{' '}
                <Highlight>암호화 알고리즘을 사용하여 안전하게 보호</Highlight>
                됩니다. 비밀번호는 복호화가 불가능하며,{' '}
                <Highlight>
                  실제 사용하는 비밀번호가 아닌 임의의 비밀번호를 사용하는 것을
                  권장
                </Highlight>
                합니다.
              </ListItem>
            </List>
          </List>

          <List>
            <ListTitle>4. 개인정보의 파기</ListTitle>
            <List>
              <ListItem>
                수집된 개인정보는{' '}
                <Highlight>매일 자정에 자동으로 서버에서 삭제</Highlight>됩니다.
                만약 자정 전에 정보를 삭제하고 싶으신 경우,{' '}
                <Highlight onClick={() => navigate('/delete')}>
                  https://tutorial-sejong.com/delete
                </Highlight>{' '}
                페이지에서 로그인 시 입력한{' '}
                <Highlight>학번을 입력하여 직접 삭제</Highlight>할 수 있습니다.
              </ListItem>
              <ListItem>
                학번을 기억하지 못할 경우,{' '}
                <Highlight>tutorialsejong@gmail.com</Highlight>으로 메일을
                보내주시면 관심과목 목록 및 로그인 시간을 기준으로 삭제를
                도와드리겠습니다. 만약 확인이 불가능한 경우,{' '}
                <Highlight>모든 정보를 일괄적으로 삭제 처리</Highlight>
                하겠습니다.
              </ListItem>
            </List>
          </List>

          <List>
            <ListTitle>5. 개인정보의 파기</ListTitle>
            <List>
              <ListItem>
                사용자는 언제든지 본 서비스에 제공된 개인정보의 삭제를 요청할 수
                있으며, 삭제 요청은 위의 방법을 통해 처리됩니다.
              </ListItem>
              <ListItem>
                개인정보와 관련된 문의는{' '}
                <Highlight>tutorialsejong@gmail.com</Highlight>으로 문의하시면
                신속히 대응해드리겠습니다.
              </ListItem>
            </List>
          </List>

          <List>
            <ListTitle>6. 개인정보의 보호</ListTitle>
            <List>
              <ListItem>
                본 서비스는 개인정보 보호법과 정보통신망법에 따라 사용자의
                개인정보를 보호하기 위해 최선을 다하고 있습니다. 수집된
                개인정보는 불법적인 접근, 유출, 사용을 방지하기 위해 방화벽,
                암호화 통신, 접근 통제 등 적절한 보안 조치를 취하고 있습니다.
              </ListItem>
            </List>
          </List>

          <List>
            <ListTitle>7. 개인정보 처리방침 변경</ListTitle>
            <List>
              <ListItem>
                본 서비스의 개인정보 처리방침은 법률 개정이나 서비스 변경에 따라
                수정될 수 있으며, 수정된 내용은 이 페이지에서 확인 가능합니다.
              </ListItem>
            </List>
          </List>

          <CheckboxWrap>
            <input
              type='checkbox'
              id='keyboardSecurity'
              checked={isTermsCheck}
              onChange={handleTermsCheck}
            />
            <label htmlFor='keyboardSecurity'>
              안내사항을 확인하였고 서비스 이용약관 및 개인정보 수집에
              동의합니다.
            </label>
          </CheckboxWrap>
        </TermsContainer>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  background: url(${Bg}) 50% 50% no-repeat;
  background-size: cover;
  height: 70rem;
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
    width: 15rem;
  }
`;

const TitleWrap = styled.div`
  color: ${props => props.theme.colors.white};
  text-align: center;
  padding: 0 1rem;
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
  width: 46rem;
  margin-bottom: 2.5rem;

  @media ${props => props.theme.device.mobile} {
    width: 100%;
  }
`;

const FaqWrap = styled.div`
  ${props => props.theme.texts.loginContent};

  > img {
    width: 3rem;
    cursor: pointer;
    display: block;
    text-align: center;
    margin: 2rem auto;
  }
`;

const TermsContainer = styled.div`
  max-width: 89rem;
  margin: 0 auto 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 1rem;
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
  font-size: 2.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListTitle = styled.li`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #555;
  line-height: 2.5rem;

  &::before {
    content: '•';
    color: #007bff;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: 0.5em;
  }
`;

const Highlight = styled.span`
  cursor: pointer;
  font-weight: bold;
  color: #007bff;
`;
export default Login;
