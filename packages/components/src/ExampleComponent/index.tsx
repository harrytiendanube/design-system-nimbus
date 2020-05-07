import * as React from 'react';

export type Props = {
  /**
   * @prop text
   * @value 'Buttons's label
   *  */
  text: string;
};

const ExampleComponent: React.FC<Props> = ({ text = 'Default text' }) => {
  return <div>Example Component : {text}</div>;
};

export default ExampleComponent;
