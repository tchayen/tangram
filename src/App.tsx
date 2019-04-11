import React, { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import Link from './Link'
import Element from './Element'

import './index.scss'
const styles = require('./App.module.scss')

const ANIMATION_TIME = 500

const animals = ['square', 'swan', 'fox', 'rabbit'] // 'fish', 'horse'

const initial = 'square'

type Config = {
  [key: string]: { main: string; elements: Array<string> }
}

const configs: Config = Object.freeze({
  square: {
    main: 'translate(0, 0)',
    elements: [1, 2, 3, 4, 5, 6, 7].map(_ => 'translate(0, 0)'),
  },
  fox: {
    main: 'translate(-105px, -105px)',
    elements: [
      'translate(150px, 362px) rotateZ(45deg)',
      'translate(150px, 150px) rotateZ(270deg)',
      'translate(106px, 194px) rotateZ(135deg)',
      'translate(-150px, -150px) rotateZ(270deg)',
      'translate(-75px, -75px) rotateZ(180deg)',
      'translate(-75px, -75px)',
      'translate(150px, 200px) rotateZ(45deg)',
    ],
  },
  swan: {
    main: 'translate(-67.5px, -90px)',
    elements: [
      'translate(137px, 269px) rotateZ(90deg)',
      'translate(-13px, 331px) rotateZ(45deg)',
      'translate(93px, 225px) rotateZ(135deg)',
      'translate(-44px, 62px) rotateZ(135deg)',
      'translate(-44px, 150px) rotateZ(180deg)',
      'translate(-43.5px, 0.5px)',
      'translate(106px, 0) rotateY(180deg)',
    ],
  },
  rabbit: {
    main: 'translate(-10px, -115px)',
    elements: [
      'translate(-44px, 168px) rotateZ(135deg)',
      'translate(168px, 168px) rotateZ(225deg)',
      'translate(168px, 230px) rotateZ(90deg)',
      'translate(-132px, 230px) rotateZ(270deg)',
      'translate(-118px, 168px)',
      'translate(-44px, -44px) rotateZ(45deg)',
      'translate(-97px, -150px) rotateZ(45deg)',
    ],
  },
})

const getConfig = (previous: string, current: string) => [
  [{ transform: previous }, { transform: current }],
  {
    duration: ANIMATION_TIME,
    fill: 'forwards',
  },
]

export default () => {
  const [selected, setSelected] = useState({
    current: initial,
    previous: initial,
  })
  const tangramRef = useRef(null)
  const references = [1, 2, 3, 4, 5, 6, 7].map(_ => useRef(null))

  useEffect(() => {
    if (tangramRef.current === null) return
    references.forEach(ref => {
      if (ref.current === null) return
    })

    // @ts-ignore
    tangramRef.current.animate(
      ...getConfig(
        configs[selected.previous].main,
        configs[selected.current].main
      )
    )
    references.forEach((ref, index) => {
      // @ts-ignore
      ref.current.animate(
        ...getConfig(
          configs[selected.previous].elements[index],
          configs[selected.current].elements[index]
        )
      )
    })
  })

  return (
    <div className={`${styles.app} no-select`}>
      <div className={styles.navigation}>
        {animals.map(animal => (
          <Link
            key={animal}
            title={animal}
            active={selected.current === animal}
            disabled={false}
            onClick={() => {
              if (selected.current === animal) return

              setSelected({ current: animal, previous: selected.current })
            }}
          />
        ))}
      </div>
      <div className={styles.content}>
        <div
          ref={tangramRef}
          className={classNames(styles.tangram, styles[selected.current])}
        >
          {[1, 2, 3, 4, 5, 6, 7].map(no => (
            <Element ref={references[no - 1]} key={no} no={no} />
          ))}
        </div>
      </div>
    </div>
  )
}
