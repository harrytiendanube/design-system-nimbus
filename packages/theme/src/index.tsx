/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
import styled from 'styled-components'
// comment
type Colors = {
  primary: string
  secondary: string
}

type Variables = Colors

const variables: Variables = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../src/vars.module.scss')

const Theme: Record<string, Record<string, string>> = {
  colors: {
    primary: 'blue'
  }
}

export { styled, variables }

export default Theme
