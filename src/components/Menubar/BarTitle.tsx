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
  background: linear-gradient(
    90deg,
    rgba(163, 20, 50, 1) 0%,
    rgba(51, 77, 97, 1) 100%
  );
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
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
