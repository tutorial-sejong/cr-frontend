import styled from 'styled-components';

function TopNav() {
  return (
    <TopNavContatiner>
      {/*<TopNavWrap autoFocus>Tutorial Sejong 수강신청 연습 시스템</TopNavWrap>*/}
      <TopNavWrap>본 서비스는 실제 수강신청 사이트가 아닙니다.</TopNavWrap>
    </TopNavContatiner>
  );
}

const TopNavContatiner = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const TopNavWrap = styled.button`
  ${props => props.theme.texts.title};
  font-size: 1.6rem;
  margin-right: 4rem;

  &:focus {
    color: ${props => props.theme.colors.primary};
  }
`;

export default TopNav;
