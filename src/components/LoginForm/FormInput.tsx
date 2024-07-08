import styled from 'styled-components';
import {setType} from '.';

interface InputProps {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<setType>>;
  type: string;
}

function FormInput({value, setValue, type}: InputProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <InputWrap type={type} value={value} onChange={handleInput} />
    </>
  );
}

const InputWrap = styled.input`
  border: none;
  background-color: #a9d0f5;
  height: 4rem;
  width: 38rem;
  font-size: 1.9rem;
`;

export default FormInput;
