import React from 'react';
import '@tiendanube/theme/dist/index.css';

type Props = {
  /*
   *Good job guys
   */
  text: 'Hola mundo';
  /*
   * variant props
   */
  variant: string;
};

function ButtonSass({ text, variant = 'primary' }: Props): JSX.Element {
  return (
    <button className={`nimbus--button_${variant} nimbus--button`}>
      {text}
    </button>
  );
}

export default ButtonSass;
