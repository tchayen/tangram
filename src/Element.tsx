import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import classNames from 'classnames'
const styles = require('./Element.module.scss')

type ElementProps = {
  no: number
}

const Element = ({ no }: ElementProps, ref: any) => {
  const elementRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => ({
    animate: (keyframes: Keyframe[], options: KeyframeAnimationOptions) =>
      // @ts-ignore
      elementRef.current.animate(keyframes, options),
  }))
  return (
    <div
      ref={elementRef}
      className={classNames(styles.element, styles[`t${no}`])}
    />
  )
}

export default forwardRef(Element)
