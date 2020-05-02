import * as React from 'react';

/* import { styled, variables } from '@tiendanube/theme/src'; */

/* const ExampleComponentStyled = styled.div`
  margin: 2em;
  padding: 0.5em;
  border: 2px solid red;
  font-size: 2em;
  text-align: center;
  background-color: ${variables.primary}};
`; */

interface Props {
  /** Texto */
  text: string;
}

const ExampleComponent = ({ text = 'Inicial' }: Props) => {
  return <div>Example Component 123 : {text}</div>;
};

export default ExampleComponent;
