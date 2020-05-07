import * as React from 'react';

export type TypePropsExampleComponent = {
  /**
   * @prop text
   * @value 'Buttons's label
   *  */
  text: string;
};

const ExampleComponent: React.FC<TypePropsExampleComponent> = ({
  text = 'Default text',
}) => {
  return <div>Example Component : {text}</div>;
};

export default ExampleComponent;
