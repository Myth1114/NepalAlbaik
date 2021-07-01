import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  empty: {
    position: 'relative',
    paddingTop:500,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  emptyImage: {
    // animation: '$fadeIn .5s ease-in-out',
    margin: 'auto',
    opacity: 0.4,
  },
  figCaption: {
    fontSize: '16px',
    // color: '#c23616',
    padding: 20,
    textAlign: 'center',
    fontWeight: 500,
  },

}))
export default function EmptyCart() {
  const classes = useStyles()
  return (
    <div className={classes.empty}>
      <figure>
        <img src='/images/gym.png' alt='empty' className={classes.emptyImage} />
        <figcaption className={classes.figCaption}>
          It seems You Haven't Added Anything To Your Cart
        </figcaption>
      </figure>
    </div>
  )
}
