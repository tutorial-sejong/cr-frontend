import styled from 'styled-components';
import Close from '@assets/img/close-sidebar.svg?react';

interface TitleProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BarTitle({setOpen}: TitleProps) {
  return (
    <BarTitleContainer>
      <BarTitleWrap>학부생수강시스템</BarTitleWrap>
      <CloseBtn onClick={prev => setOpen(!prev)}>
        <Close />
      </CloseBtn>
    </BarTitleContainer>
  );
}

const BarTitleContainer = styled.div`
  background: ${props => props.theme.colors.secondary};
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
`;

const BarTitleWrap = styled.div`
  ${props => props.theme.texts.subtitle};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.white};
`;

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  width: 1.5rem;
`;

export default BarTitle;
