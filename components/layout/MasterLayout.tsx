'use client';
import { useEffect } from 'react';

import { ACCESS_TOKEN } from '~/constants/cookie';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { UserAgent } from '~/types/components/component.types';
import { getCookie } from '~/utils/cookie';
import { decodeJWT } from '~/utils/decodeJWT';

interface IProps {
  children: JSX.Element | JSX.Element[];
  userAgent: UserAgent;
}

const MasterLayout = ({ children, userAgent }: IProps) => {
  const { username, updateUserInfoState } = useUserInfoState((state) => ({
    username: state.username,
    updateUserInfoState: state.updateUserInfoState,
  }));

  useEffect(() => {
    if (username) return;

    const getAccessToken = getCookie(ACCESS_TOKEN);
    if (getAccessToken) {
      const { sub: username } = decodeJWT(getAccessToken);
      updateUserInfoState(username);
    }
  }, []);

  // useServerSentEvent();

  const isMobile = userAgent === 'mobile';
  return (
    <MasterLayoutContainer>
      <div
        className='panel-container'
        css={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
        }}
      >
        <PanelLeft />
        <PanelRightContainer>
          {isMobile ? <MobileAppBar /> : <Header />}
          {children}
        </PanelRightContainer>
      </div>
      <CustomSnackbar />
    </MasterLayoutContainer>
  );
};

export default MasterLayout;

const MasterLayoutContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const PanelRightContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
