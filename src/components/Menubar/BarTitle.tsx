import styled from 'styled-components';
import Star from '@assets/img/fav_white.png';
import Search from '@assets/img/search.png';
import Close from '@assets/img/menu_close.png';

interface OpenProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BarTitle({setIsOpen}: OpenProps) {
  return (
    <BarTitleContainer>
      <BarTitleWrap>학부생수강시스템</BarTitleWrap>
      <IconBox>
        <img src={Star} />
        <img src={Search} />
        <CloseBtn onClick={() => setIsOpen(false)}>
          <img src={Close} />
        </CloseBtn>
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
