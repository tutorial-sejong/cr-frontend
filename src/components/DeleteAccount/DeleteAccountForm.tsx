import {useState} from 'react';
import styled from 'styled-components';
import FormInput from '@components/LoginForm/FormInput.tsx';
import {login} from '@/apis/api/auth';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setUserInfo} from '@/store/userSlice';
import {baseAPI} from '@/apis/utils/instance';
import Cookies from 'js-cookie';

import copyIcon from '@/assets/img/file-copy-line.png';
import reloadIcon from '@/assets/img/refresh-line.png';


export type setType = string | number | undefined;

function DeleteAccountForm() {
  const [id, setId] = useState('');

  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!id) {
      setError('학번과 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (id.length < 11) {
      setError('11자리 이상의 임의 학번을 입력해주세요!');
      return;
    }

    if (!isTermsCheck) {
      setError('이용약관에 동의하지 않으셨습니다.');

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }

    try {
      const response = await login({
        studentId: id.toString(),
        password: password.toString(),
      });
      console.log('Login successful');

      Cookies.set('accessToken', response.accessToken, {expires: 0.5 / 24});
      baseAPI.defaults.headers.common['Authorization'] =
        `Bearer ${response.accessToken}`;

      dispatch(
        setUserInfo({
          username: response.username,
        }),
      );

      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <FormContainer>
      <InputContainer>
        <InputBox>
          <LabelWrap>학번</LabelWrap>
          <FormInput value={id} setValue={setId} type="number" />
        </InputBox>
        <FindWrap onClick={() => navigate('/login')}>로그인 페이지</FindWrap>

      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginBtnWrap onClick={handleDelete} type="button">
        제거
      </LoginBtnWrap>
    </FormContainer>
  );
}

const FormContainer = styled.div`
    padding: 1.5rem 4rem;
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

const LabelWrap = styled.div`
    ${props => props.theme.texts.loginContent};
    margin-bottom: 0.7rem;
`;

const LoginBtnWrap = styled.button`
    width: 100%;
    height: 5rem;
    background-color: #46515b;
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

const FindWrap = styled.div`
    ${props => props.theme.texts.tableTitle};
    color: ${props => props.theme.colors.neutral4};
    float: inline-end;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 1rem;
    text-align: center;
`;

export default DeleteAccountForm;