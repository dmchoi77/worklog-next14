import { style } from '@vanilla-extract/css';

export const AuthLayoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

export const MasterLayoutContainer = style({
  width: '100%',
  maxWidth: '100%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
});

export const PanelWrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
});

export const PanelRightWrapper = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
});
