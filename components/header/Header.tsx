'use client';
import { useRouter } from 'next/navigation';

import { Badge } from '@mui/material';

import styled from '@emotion/styled';
import { Notifications } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useLogout } from '~/queries/user';
import { useUserInfoState } from '~/stores/useUserInfoStore';

const HeaderContainer = styled.header`
  background-color: #fffdfa;
  width: 100%;
  height: 50px;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e2e2e6;
`;

const Header: React.FC = () => {
  const router = useRouter();
  const username = useUserInfoState((state) => state.username);

  const { mutate: handleLogout } = useLogout();

  return (
    <HeaderContainer>
      <div>
        <span
          style={{
            cursor: 'pointer',
          }}
          onClick={() => router.push('/today')}
        >
          Today
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AccountCircleIcon />
        <span style={{ margin: 5 }}>{username} 님</span>
        {/* <Badge badgeContent={1} color='info'>
          <Notifications color='action' />
        </Badge> */}
        <div style={{ paddingLeft: 10, paddingRight: 20 }}>
          <span style={{ fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={() => handleLogout()}>
            로그아웃
          </span>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
