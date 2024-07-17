import styled from 'styled-components';
import FormInput from './FormInput';
import {useState} from 'react';

export type setType = string | number | undefined;

function LoginForm() {
  const [id, setId] = useState<setType>(undefined);
  const [name, setName] = useState<setType>('');

  return (
    <FormContainer>
      <InputContainer>
        <InputBox>
          <LabelWrap>학번</LabelWrap>
          <FormInput value={id} setValue={setId} type='number' />
        </InputBox>
        <InputBox>
          <LabelWrap>이름</LabelWrap>
          <FormInput value={name} setValue={setName} type='text' />
        </InputBox>
        <CheckboxWrap>
          <input type='checkbox' id='keyboardSecurity' checked readOnly />
          <label htmlFor='keyboardSecurity'>키보드 보안</label>
        </CheckboxWrap>
      </InputContainer>
      <FindWrap>아이디 찾기 | 비밀번호 찾기</FindWrap>
      <LoginBtnWrap>로그인</LoginBtnWrap>
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

const CheckboxWrap = styled.div`
  margin-left: -0.5rem;
  margin-top: 1rem;
`;

const FindWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  color: ${props => props.theme.colors.neutral4};
  float: inline-end;
  margin-bottom: 2.5rem;
`;

const LoginBtnWrap = styled.button`
  width: 100%;
  height: 5rem;
  background-color: #c3002f;
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

export default LoginForm;
