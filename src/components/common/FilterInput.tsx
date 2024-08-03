import styled, { css } from 'styled-components';

interface InputInterface {
  disabled?: boolean;
  sizes: string;
  onChange: (value: string) => void;
}

function FilterInput({ disabled, sizes, onChange }: InputInterface) {
  return (
    <>
      <InputWrap
        disabled={disabled}
        sizes={sizes}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </>
  );
}

const InputWrap = styled.input<{ sizes: string }>`
  ${props => props.theme.texts.content};

  ${props =>
    props.sizes === 's' &&
    css`
      width: 14rem;
    `};
  ${props =>
    props.sizes === 'm' &&
    css`
      width: 19.5rem;
    `};
    ${props =>
    props.sizes === 'l' &&
    css`
        width: 25rem;
      `};
  ${props =>
    props.sizes === 'l' &&
    css`
      width: 38.5rem;
    `};
  ${props =>
    props.sizes === 'xl' &&
    css`
      width: 48.5rem;
    `};

  height: 2.4rem;
  border: 1px solid ${props => props.theme.colors.neutral5};
  padding-left: 0.8rem;
    
    &:disabled {
        background: ${props => props.theme.colors.neutral5};
    }
`;

export default FilterInput;
