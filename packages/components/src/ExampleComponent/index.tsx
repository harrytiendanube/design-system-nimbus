import * as React from 'react';

import { styled, variables } from '@tiendanube/theme';

const ExampleComponentStyled = styled.div`
  margin: 2em;
  padding: 0.5em;
  border: 2px solid red;
  font-size: 2em;
  text-align: center;
  background-color: ${variables.secondary};}
`;

interface Props {
  text: string;
}

const ExampleComponent: React.FC<Props> = ({ text }) => {
  return (
    <ExampleComponentStyled>Example Component : {text}</ExampleComponentStyled>
  );
};

export default ExampleComponent;
