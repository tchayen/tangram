import React from 'react'
import classNames from 'classnames'
const styles = require('./Link.module.scss')

type Props = {
  title: string
  active: boolean
  disabled: boolean
  onClick: () => void
}

export default ({ title, disabled, active, onClick }: Props) => (
  <div
    className={classNames(
      styles.link,
      active && styles.active,
      disabled && styles.disabled
    )}
    onClick={onClick}
  >
    {title}
  </div>
)
