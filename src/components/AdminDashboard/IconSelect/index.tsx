import * as React from 'react'
import IconSelectClient from './index.client'
import type { TextFieldServerComponent } from 'payload'

const IconSelect: TextFieldServerComponent = ({ path, field }) => {
  const label = typeof field?.label === 'string' ? field.label : undefined
  const desc = typeof field?.admin?.description === 'string' ? field.admin.description : undefined
  return <IconSelectClient path={path} label={label} description={desc} />
}

export default IconSelect
