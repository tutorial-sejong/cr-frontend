import {useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {withdrawal} from '@/apis/api/auth';
import FormInput from '@components/LoginForm/FormInput.tsx';

export type setType = string | number | undefined;

function DeleteAccountForm() {
  const [id, setId] = useState<setType>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (typeof id === 'undefined') {
      return;
    }

    if (id.toString().length < 11) {
      setError('11자리 이상의 임의 학번을 입력해주세요!');
      return;
    }

    try {
      const response = await withdrawal(id.toString());
      console.log(response);
      console.log('Withdrawal successful');

      navigate('/');
    } catch (error) {
      console.error('Withdrawal failed', error);
      setError('제거 실패');
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
