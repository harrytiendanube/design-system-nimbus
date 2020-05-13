import React from 'react'
import { render } from '@testing-library/react'
import Icon from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Icon', () => {
  it('Render Icon', () => {
    const iconName = 'Alicorn'
    const { getByTestId } = render(<Icon name={`${iconName}`} />)
    // Should be find a componente with prefix 'icon-' Example: icon-foo
    expect(getByTestId(`icon-${iconName}`)).toBeInTheDocument()
  })
})
