import styled from 'styled-components';
import dropdown from '@assets/img/arrow-down-s-fill.png';
import {useEffect, useRef, useState} from 'react';

interface HeadProps {
  label: string;
  index: number;
  width: number;
  options: string[];
  type?: string;
  selectedOptions: string[];
  onFilterChange: (index: number, selectedOptions: string[]) => void;
}

function TableHead({
  label,
  index,
  width,
  options,
  type,
  selectedOptions,
  onFilterChange,
}: HeadProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCheckboxChange = (option: string) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter(selectedOption => selectedOption !== option)
      : [...selectedOptions, option];

    if (updatedSelection.length === options.length) {
      onFilterChange(index, options);
    } else {
      onFilterChange(index, updatedSelection);
    }
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      onFilterChange(index, []);
    } else {
      onFilterChange(index, options);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <Wrap width={width}>
      <div>
        <span>{label}</span>
        {type !== 'action' && (
          <>
            <DropdownBtn
              ref={buttonRef}
              onClick={() => setOpen(prev => !prev)}
            />
            {open && (
              <OptionBox ref={dropdownRef}>
                <OptionWrap>
                  <input
                    type='checkbox'
                    id='all'
                    checked={selectedOptions.length === options.length}
                    onChange={handleSelectAll}
                  />
                  <label htmlFor='all'>전체선택</label>
                </OptionWrap>
                {options?.map((option, index) => (
                  <OptionWrap key={index}>
                    <input
                      type='checkbox'
                      id={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    <label htmlFor={option}>{option}</label>
                  </OptionWrap>
                ))}
              </OptionBox>
            )}
          </>
        )}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div<{width: number}>`
  min-width: ${props => props.width}px;
  text-align: ${props => (props.width > 100 ? 'center' : 'left')};

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span {
      text-align: center;
      flex-grow: 1;
    }
  }
`;

const DropdownBtn = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  background: url(${dropdown}) no-repeat center;
  background-size: 1.8rem;
`;

const OptionBox = styled.ul`
  width: 100%;
  overflow: scroll;
  background: white;
  position: absolute;
  top: 3rem;
  left: 0;
  z-index: 1;
`;

const OptionWrap = styled.li`
  ${props => props.theme.texts.content};
  text-align: left;
  border-bottom: 1px solid #b3b3b3;
  color: #066196;
  height: 2rem;

  > label {
    display: inline-block;
    width: 86%;
    height: 100%;
    cursor: pointer;
  }
`;

export default TableHead;
