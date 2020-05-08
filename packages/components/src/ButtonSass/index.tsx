import * as React from 'react';
import '@tiendanube/theme/dist/index.css';

interface Props {
  /** Good job guys */
  text: string;
  /** variant props */
  variant?: string;
}

const ButtonSass: React.FC<Props> = ({
  text = 'Hola',
  variant = 'primary',
}: Props) => {
  return (
    <button className={`nimbus--button_${variant} nimbus--button`}>
      {text}
    </button>
  );
};

export default ButtonSass;
