import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import {baseAPI} from '@/apis/utils/instance';
import {useAppSelector} from '@/store/hooks';
import {clearUserInfo} from '@/store/modules/userSlice';
import logout from '@assets/img/logout.png';
import Clock from './Clock';

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
      <Clock name={username || '종이'} />
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
  margin-right: 1rem;
  &:hover {
    filter: brightness(20%);
  }
`;

export default TopMenu;
