import * as React from 'react'
import '@tiendanube/styles/css/Input.css'

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'id' | 'name'
  > {
  /**
   * Nombre
   */
  name: string
  /**
   *  Valor
   */
  value: string
  /**
   *  Etiqueta
   */
  label: string
  /**
   *  Callback de actualizacion
   */
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
}

const Input: React.FunctionComponent<Props> = ({ label, ...shared }) => {
  return (
    <div className='nimbus--input'>
      <label className='' htmlFor={`input_${name}`}>
        {label}
      </label>
      <input id={`input_${name}`} {...shared} />
    </div>
  )
}

Input.defaultProps = {
  placeholder: 'placeholder',
  value: ''
}

export default Input
