import styled, { css } from 'styled-components';

interface InputInterface {
  sizes: string;
  onChange: (value: string) => void;
}

function FilterInput({ sizes, onChange }: InputInterface) {
  return (
    <>
      <InputWrap
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
    props.sizes === 'xl' &&
    css`
      width: 48.5rem;
    `};

  height: 2.4rem;
  border: 1px solid ${props => props.theme.colors.neutral5};
  padding-left: 0.8rem;
`;

export default FilterInput;
