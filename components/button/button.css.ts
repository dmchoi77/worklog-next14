import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const buttonStyle = style({
  width: '100%',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  color: '#ffffff',
  fontSize: 18,
  fontWeight: '600',
  cursor: 'pointer',

  ':enabled': {
    background: '#303030',
  },
  ':disabled': {
    background: 'grey',
  },
});
