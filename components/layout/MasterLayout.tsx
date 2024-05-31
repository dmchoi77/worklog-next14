'use client';
import { useEffect } from 'react';

import { MasterLayoutContainer, PanelRightWrapper, PanelWrapper } from './layout.css';
import Header from '../header/Header';
import MobileAppBar from '../mobileAppBar/MobileAppBar';
import PanelLeft from '../panel/PanelLeft';
import CustomSnackbar from '../snackbar/Snackbar';

import { ACCESS_TOKEN } from '~/constants/cookie';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { UserAgent } from '~/types/components/component.types';
import { getCookie } from '~/utils/cookie';
import { decodeJWT } from '~/utils/decodeJWT';

interface IProps {
  children: React.ReactNode;
  userAgent?: UserAgent;
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
    <div className={MasterLayoutContainer}>
      <div className={PanelWrapper}>
        <PanelLeft />
        <div className={PanelRightWrapper}>
          {isMobile ? <MobileAppBar /> : <Header />}
          {children}
        </div>
      </div>
      <CustomSnackbar />
    </div>
  );
};

export default MasterLayout;
