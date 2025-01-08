import {useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import arrow from '@assets/img/arrow-down-s-fill.png';

interface OptionsInterface {
  id: number;
  value: string;
}

interface SelectProps {
  options: OptionsInterface[];
  disabled?: boolean;
  sizes: string;
  onSelect: (value: string) => void;
  restricted?: boolean;
}

function SelectBox({
  options,
  disabled = false,
  sizes,
  onSelect,
  restricted = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(options[0].value);
  const [selected, setSelected] = useState(options[0].value);
  const [filtered, setFiltered] = useState<OptionsInterface[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBtnClick = () => {
    if (!disabled) {
      setFiltered(options);
      setOpen(prev => !prev);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setFiltered(
      options.filter(option => option.value.includes(e.target.value)),
    );
    setOpen(true);
  };

  const handleOptionClick = (value: string) => {
    onSelect(value);
    setInput(value);
    setSelected(value);
    setOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      if (open) {
        setOpen(false);
        setInput(selected);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <SelectContainer ref={dropdownRef} sizes={sizes}>
      <InputContainer disabled={disabled}>
        <InputWrap
          readOnly={disabled}
          value={restricted ? '전체학년 (학과제한 없음)' : input}
          onChange={handleInput}
        />
        <ArrowWrap src={arrow} onClick={handleBtnClick} />
      </InputContainer>
      {open && (
        <SelectWrap style={{width: dropdownRef.current?.offsetWidth}}>
          {filtered.map(option => (
            <OptionWrap
              key={option.id}
              value={option.value}
              $isselected={selected === option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.value}
            </OptionWrap>
          ))}
        </SelectWrap>
      )}
    </SelectContainer>
  );
}

const SelectContainer = styled.div<{sizes: string}>`
  ${props => props.theme.texts.content};
  ${props =>
    props.sizes === 's' &&
    css`
      width: 15rem;

      @media ${props => props.theme.device.mobile} {
        max-width: 15rem;
      }
    `};
  ${props =>
    props.sizes === 'm' &&
    css`
      width: 20.5rem;

      @media ${props => props.theme.device.mobile} {
        max-width: 20.5rem;
      }
    `};
  ${props =>
    props.sizes === 'xl' &&
    css`
      width: 50rem;

      @media ${props => props.theme.device.mobile} {
        max-width: 50rem;
      }
    `};
  min-width: 7rem;
  height: 2.4rem;
  position: relative;
  display: inline-block;
`;

const InputContainer = styled.div<{disabled: boolean}>`
  position: relative;
  width: inherit;
  height: inherit;
  border: 1px solid ${props => props.theme.colors.neutral5};

  &:hover {
    background-color: ${props => props.theme.colors.blue};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.neutral5};
  }
`;

const InputWrap = styled.input`
  ${props => props.theme.texts.content};
  width: 100%;
  height: 100%;
  padding: 0 0 0 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.blue};
  }

  &:read-only {
    background-color: ${props => props.theme.colors.neutral5};
  }
`;

const ArrowWrap = styled.img`
  position: absolute;
  right: 0.3rem;
`;

const SelectWrap = styled.ul`
  min-width: 15rem;
  max-height: 12rem;
  position: absolute;
  top: 100%;
  z-index: 5;
  border: 1px solid ${props => props.theme.colors.neutral5};
  background-color: ${props => props.theme.colors.white};
  overflow-y: scroll;
`;

const OptionWrap = styled.li<{$isselected: boolean}>`
  height: 2.4rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;

  ${props =>
    props.$isselected &&
    css`
      background-color: ${props => props.theme.colors.neutral6};
      color: ${props => props.theme.colors.primary};
    `}

  &:hover {
    background-color: ${props => props.theme.colors.neutral6};
    color: ${props => props.theme.colors.primary};
  }
`;

export default SelectBox;
