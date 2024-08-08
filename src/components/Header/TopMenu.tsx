import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import {baseAPI} from '@/apis/utils/instance';
import {useAppSelector} from '@/store/hooks';
import {clearUserInfo} from '@/store/userSlice';
import {deleteAll} from '@/store/modules/tabSlice';
import logout from '@assets/img/logout.png';
import Clock from './Clock';

function TopMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {username} = useAppSelector(state => state.userInfo);

  const handleLogout = () => {
    dispatch(clearUserInfo());
    dispatch(deleteAll());
    delete baseAPI.defaults.headers.common['Authorization'];
    Cookies.remove('accessToken');
    navigate('/login');
  };

  return (
    <TopMenuContainer>
      <Clock name={username || '세종대'} />
      <LogoutBtn onClick={handleLogout} />
    </TopMenuContainer>
  );
}

const TopMenuContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;

const LogoutBtn = styled.button`
    background-image: url(${logout});
    background-size: 1.8rem;
    width: 1.8rem;
    height: 1.8rem;

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
