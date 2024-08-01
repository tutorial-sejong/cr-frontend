import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import {baseAPI} from '@/apis/utils/instance';
import {clearUserInfo} from '@/store/userSlice';
import {useAppSelector} from '@/store/hooks';
import Left from '@assets/img/btn_main_top_left.svg?react';
import Right from '@assets/img/btn_main_top_right.svg?react';
import logout from '@assets/img/logout.png';
import down from '@assets/img/top_menu_down.png';
import notice from '@assets/img/notice.png';
import setting from '@assets/img/setitng.png';
import menu from '@assets/img/menu.png';
import Timer from './TImer';

function TopMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {username} = useAppSelector(state => state.userInfo);

  const handleLogout = () => {
    dispatch(clearUserInfo());
    delete baseAPI.defaults.headers.common['Authorization'];
    Cookies.remove('accessToken');
    navigate('/login');
  };

  return (
    <TopMenuContainer>
      <ArrowWrap>
        <StyledLeft />
        <StyledRight />
      </ArrowWrap>
      <Timer name={username || '세종대'} />
      <LogoutBtn onClick={handleLogout} />
      <DropdownWrap>
        PC
        <img src={down} />
      </DropdownWrap>
      <DropdownWrap>
        KOR
        <img src={down} />
      </DropdownWrap>
      <GroupWrap>
        <img src={notice} />
        <img src={setting} />
        <img src={menu} />
      </GroupWrap>
    </TopMenuContainer>
  );
}

const TopMenuContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;

const ArrowWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  margin-right: 1.5rem;
`;

const StyledLeft = styled(Left)`
  fill: ${props => props.theme.colors.neutral4};
  &:hover {
    fill: ${props => props.theme.colors.primary};
  }
`;

const StyledRight = styled(Right)`
  fill: ${props => props.theme.colors.neutral4};
  &:hover {
    fill: ${props => props.theme.colors.primary};
  }
`;

const LogoutBtn = styled.button`
  background-image: url(${logout});
  width: 1.4rem;
  height: 1.4rem;

  &:hover {
    filter: brightness(20%);
  }
`;

const DropdownWrap = styled.div`
  ${props => props.theme.texts.tableTitle};
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  column-gap: 1.5rem;

  > img {
    &:hover {
      filter: brightness(20%);
    }
  }
`;

const GroupWrap = styled.div`
  display: flex;
  column-gap: 1rem;

  > img {
    &:hover {
      filter: brightness(20%);
    }
  }
`;

export default TopMenu;
