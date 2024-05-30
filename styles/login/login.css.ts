import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// div
export const loginContainer = style({
  width: '400px',
  height: '600px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',

  '@media': {
    'screen and (max-width: 640px)': {
      padding: '10%',
      width: '100%',
    },
  },
});

// input
export const loginInput = style({
  height: '50px',
  borderRadius: '10px',
  border: '1px solid #cfcfcf',
  padding: '10px',
});

// form
export const loginForm = style({
  display: 'flex',
  gap: '0.5rem',
  width: '100%',
  flexDirection: 'column',
});

// input
export const loginButton = recipe({
  base: {
    height: '50px',
    borderRadius: '10px',
    color: '#ffffff',
    border: '1px solid #cfcfcf',
    fontSize: '16px',
    fontWeight: 600,
    padding: '5px',
    cursor: 'pointer',
  },
  variants: {
    isLoading: {
      true: { backgroundColor: '#999' },
      false: { backgroundColor: '#2f2f2f' },
    },
  },
});
