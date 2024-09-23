import styled from 'styled-components';

function TopNav() {
  return (
    <TopNavContatiner>
      <TopNavWrap>:&nbsp;&nbsp;세종대학교 수강신청 연습 사이트</TopNavWrap>
    </TopNavContatiner>
  );
}

const TopNavContatiner = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  @media ${props => props.theme.device.mobile} {
    display: none;
  }
`;

const TopNavWrap = styled.div`
  ${props => props.theme.texts.loginContent};
  font-size: 1.5rem;
`;

export default TopNav;
