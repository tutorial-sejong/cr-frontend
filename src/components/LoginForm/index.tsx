import {useState} from 'react';
import styled from 'styled-components';
import FormInput from './FormInput';
import {login} from '@/apis/api/auth';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setUserInfo} from '@/store/modules/userSlice';
import {baseAPI} from '@/apis/utils/instance';
import Cookies from 'js-cookie';
import {generateRandomStudentId} from '@/utils/randomUtils.ts';

import copyIcon from '@/assets/img/file-copy-line.png';
import reloadIcon from '@/assets/img/refresh-line.png';
import {resetTab} from '@/store/modules/tabSlice';
import ReactGA from 'react-ga4';

export type setType = string | number | undefined;

function LoginForm({isTermsCheck}: {isTermsCheck: boolean}) {
  const [id, setId] = useState<setType>('');
  const [password, setPassword] = useState<setType>('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [randomStudentId, setRandomStudentId] = useState(
    generateRandomStudentId,
  );

  const handleRandomStudentId = () => {
    setRandomStudentId(generateRandomStudentId);
  };
  const handleCopyStudentId = () => {
    navigator.clipboard
      .writeText(randomStudentId.toString())
      .then(() => {
        alert('복사 완료!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
  const handleLogin = async () => {

    ReactGA.event({
      category: 'User',
      action: 'Login Attempt',
      label: 'Login Page',
    });

    if (!id || !password) {
      setError('학번과 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (typeof id === 'string' && id.length < 11) {
      setError('11자리 이상의 임의 학번을 입력해주세요!');
      return;
    }

    if (!isTermsCheck) {
      setError('이용약관에 동의하지 않으셨습니다.');

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      return;
    }

    try {
      const response = await login({
        studentId: id.toString(),
        password: password.toString(),
      });

      console.log('Login successful');

      ReactGA.event({
        category: 'User',
        action: 'Login Success',
        label: 'Login Page',
      });

      Cookies.set('accessToken', response.accessToken, {expires: 0.5 / 24});
      baseAPI.defaults.headers.common['Authorization'] =
        `Bearer ${response.accessToken}`;

      dispatch(
        setUserInfo({
          username: response.username,
        }),
      );

      dispatch(resetTab());

      alert('※ 본 사이트는 실제 수강신청 사이트가 아닙니다. ※');
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);

      ReactGA.event({
        category: 'User',
        action: 'Login Failed',
        label: 'Login Page',
      });

      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <FormContainer>
      <InputContainer>
        <InputBox>
          <LabelWrap>임의 학번, 비밀번호 생성</LabelWrap>
          <RandomStudentIdContainer>
            <RandomStudentIdInput>{randomStudentId}</RandomStudentIdInput>
            <GenerateButton onClick={handleRandomStudentId}>
              <img src={reloadIcon} alt='reload' />
            </GenerateButton>
            <GenerateButton onClick={handleCopyStudentId}>
              <img src={copyIcon} alt='copy' />
            </GenerateButton>
          </RandomStudentIdContainer>
        </InputBox>
        <InputBox>
          <LabelWrap>학번</LabelWrap>
          <FormInput value={id} setValue={setId} type='number' />
        </InputBox>
        <InputBox>
          <LabelWrap>비밀번호</LabelWrap>
          <FormInput value={password} setValue={setPassword} type='password' />
        </InputBox>
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginBtnWrap onClick={handleLogin} type='button'>
        로그인
      </LoginBtnWrap>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: 0.3rem;
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const InputBox = styled.div`
  margin-top: 2rem;
`;

const RandomStudentIdContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RandomStudentIdInput = styled.p`
  border-bottom: 1px solid #000000;
  padding: 5px 10px;
  font-size: 1.7rem;
  font-weight: 700;
  flex: 1 1 0;
`;

const GenerateButton = styled.button`
  display: block;
  padding: 10px;
  font-size: 1.7rem;
  font-weight: 700;

  > img {
    width: 20px;
  }
`;

const LabelWrap = styled.div`
  ${props => props.theme.texts.loginContent};
  margin-bottom: 0.7rem;
`;

const LoginBtnWrap = styled.button`
  width: 90%;
  height: 5rem;
  background-color: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 5rem;
  color: ${props => props.theme.colors.white};
  font-size: 1.7rem;
  font-weight: 700;
  box-shadow: 0px 4px 5px lightgray;
  margin-bottom: 2rem;

  &:hover {
    background-color: #c3002fc7;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  text-align: center;
`;

export default LoginForm;
