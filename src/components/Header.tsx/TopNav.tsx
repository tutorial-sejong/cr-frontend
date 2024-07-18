import styled from 'styled-components';

function TopNav() {
  return (
    <TopNavContatiner>
      <TopNavWrap autoFocus>학부생학사정보</TopNavWrap>
      <TopNavWrap>학생서비스</TopNavWrap>
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
