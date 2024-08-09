import styled from 'styled-components';

function BarTitle() {
  return (
    <BarTitleContainer>
      <BarTitleWrap>학부생수강시스템</BarTitleWrap>
      <IconBox>
        <CloseBtn />
      </IconBox>
    </BarTitleContainer>
  );
}

const BarTitleContainer = styled.div`
  background: ${props => props.theme.colors.secondary};
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const BarTitleWrap = styled.div`
  ${props => props.theme.texts.subtitle};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.white};
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
`;

export default BarTitle;
