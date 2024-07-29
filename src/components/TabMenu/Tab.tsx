import {useState} from 'react';
import styled, {css} from 'styled-components';
import close from '@assets/img/tab_close.png';

interface TabProps {
  id: number;
  label: string;
  isActive: boolean;
  onClick: (id: number) => void;
}

function Tab({id, label, isActive, onClick}: TabProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (id > 0) {
      onClick(id - 1);
    } else {
      onClick(1);
    }

    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <TabContainer onClick={() => onClick(id)} $isactive={isActive}>
          <p>{label}</p>
          <CloseBtn onClick={handleClose} />
        </TabContainer>
      )}
    </>
  );
}

const TabContainer = styled.a<{$isactive: boolean}>`
  ${props =>
    props.$isactive
      ? props.theme.texts.tabTitleFocus
      : props.theme.texts.tabTitle};
  background-color: ${props =>
    props.$isactive ? props.theme.colors.white : 'transparent'};
  width: calc(99% / 8);
  height: 100%;
  border-top: 0.3rem solid
    ${props => (props.$isactive ? props.theme.colors.primary : 'none')};
  border-right: 1px solid #ccc;
  border-radius: 0;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  filter: ${props => (props.$isactive ? 'grayscale(0)' : 'grayscale(100%)')};

  > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    margin-right: 1.5rem;
  }

  ${props =>
    !props.$isactive &&
    css`
      &:hover {
        background-color: white;
        filter: grayscale(0);
      }
    `}
`;

const CloseBtn = styled.button`
  z-index: 5;
  width: 1rem;
  height: 100%;
  background-image: url(${close});
  background-repeat: no-repeat;
  background-position-y: center;
`;

export default Tab;
