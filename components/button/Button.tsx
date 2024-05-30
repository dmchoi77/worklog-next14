import { buttonStyle } from './button.css';

interface IProps {
  text: string;
  isDisabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}

const Button: React.FC<IProps> = ({ text, onClick, isDisabled = false, style }) => {
  return (
    <button className={buttonStyle} style={style} disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
