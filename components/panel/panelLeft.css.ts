import { style } from '@vanilla-extract/css';

export const PanelLeftContainer = style({
  backgroundColor: '#303030',
  borderRight: '1px solid #d5d5d552',
  minWidth: '200px',
  maxWidth: '200px',

  '@media': {
    'screen and (max-width: 640px)': {
      display: 'none',
    },
  },
});
