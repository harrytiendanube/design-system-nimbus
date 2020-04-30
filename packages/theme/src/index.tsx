/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
import styled from 'styled-components'

const variables = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../src/vars.scss')

const Theme: Record<string, Record<string, string>> = {
  colors: {
    primary: 'blue'
  }
}

export { styled, variables }

export default Theme
