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
  /** Texto una descripción para ayudar */
  text: string;
}

const ExampleComponent: React.FC<Props> = ({
  text = 'Inicial desde comienzo',
}) => {
  return <div>Example Component 123 : {text}</div>;
};

export default ExampleComponent;
