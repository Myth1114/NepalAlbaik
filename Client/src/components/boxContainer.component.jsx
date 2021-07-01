import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CardContent from '@material-ui/core/CardContent'
import ErrorComponent from './ErrorComponent'
import Spinner from './../components/spinner.component'
import uuid from 'react-uuid'
const useStyles = makeStyles((theme) => ({
  BoxContainer: {
    margin: '10px 10px',
  },
  text: {
    textAlign: 'center',
    padding: '9px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    // textJustify: "inter - word",
  },

  spaceBottom: {
    display: 'flex',
    justifyContent: 'start',
  },

  topProducts: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}))

const BoxContainerComp = ({
  list,
  isLoadingStatus,
  loadingError,
  dispatch,
  history,
  fetchFxn,
  setFxn,
  field,
}) => {
  function compare_item(a, b) {
    // a should come before b in the sorted order
    if (a < b) {
      return -1
      // a should come after b in the sorted order
    } else if (a > b) {
      return 1
      // and and b are the same
    } else {
      return 0
    }
  }
  const classes = useStyles()
  return list === null &&
    isLoadingStatus === false &&
    loadingError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : list === null &&
    isLoadingStatus === true &&
    loadingError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : list === null &&
    isLoadingStatus === false &&
    loadingError !== undefined ? (
    <ErrorComponent />
  ) : (
    <div>
      {/* <Container> */}
      <div className={classes.BoxContainer}>
        {/* <BoxContainer> */}
        <Grid container spacing={1}>
          <Grid item md={12} xs={12}>
            <CardContent className={classes.content}>
              <Typography
                className={classes.spaceBottom}
                component='h5'
                variant='h5'
              >
                {field === 'subCategory' ? 'Top Brands' : 'Categories'}
              </Typography>
            </CardContent>
          </Grid>

          {list.sort(compare_item).map((el, index) => {
            return (
              <Grid
                key={uuid()}
                item
                md={list.length < 3 ? 6 : list.length % 3 === 0 ? 4 : 3}
                xs={6}
                className={classes.topProducts}
              >
                <figure className={classes.text}>
                  <img
                    onClick={(e) => {
                      dispatch(fetchFxn({ [field]: el }))
                      dispatch(setFxn({ [field]: el }))
                      history.push(`/product/searchTerm/${field}/${el}`)
                    }}
                    height='130'
                    width='150'
                    src={`/images/${
                      field === 'subCategory' ? 'brands' : field
                    }/${el}.png`}
                    alt=''
                  />
                  <figcaption>
                    <strong>{el.split('-').join(' ')}</strong>
                  </figcaption>
                </figure>
              </Grid>
            )
          })}
        </Grid>
        {/* </BoxContainer> */}
      </div>
      {/* </Container> */}
    </div>
  )
}

export default connect(null)(withRouter(BoxContainerComp))
