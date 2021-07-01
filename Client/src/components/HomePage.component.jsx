import React, { useEffect } from 'react'
import Carousel from './carousel.component'
import {
  fetchProductBrandStart,
  brandCleanUp,
  setSearchTerm,
} from './../redux/product/product.actions'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  selectproductBrandList,
  selectProductIsLoading,
} from './../redux/product/product.selector'
import {
  fetchBrandProductStart,
  fetchProductCategoryStart,
} from './../redux/product/product.actions'

import Container from '@material-ui/core/Container'

import { Button } from '@material-ui/core'

import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import {
  selectProductList,
  selectProduct,
} from './../redux/product/product.selector'
import Typography from '@material-ui/core/Typography'
import Description from './DescriptionPage.component'

import Slider from './slider.component'
import BoxContainerComp from './boxContainer.component'
import Hidden from '@material-ui/core/Hidden'
import CustomizedInputBase from './search.component'
import Hero from './Hero'
import Banner from './Banner'
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
  BoxContainer: {
    margin: '60px 0px',
  },
  contactUs: {
    background: '#000000',
    color: '#ffffff',
    borderRadius: 0,
  },
  emailUs: {
    background: '#f2720c',
    color: '#ffffff',
    borderRadius: 0,
  },
  category: {
    marginTop: 20,
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  container: {
    boxShadow: 'none',

    marginBottom: 10,
  },
  spaceBottom: {
    display: 'flex',
    justifyContent: 'start',
  },

  mapBox: {
    margin: 20,
  },
  div: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',

    // textJustify: "inter - word",
  },

  span: {
    whiteSpace: 'nowrap',
    overFlow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  topProducts: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}))
const HomePage = ({
  dispatch,

  product: { fetchingCategoryList, categoryList, categoryListError, error },
  history,
  brandList,
  isLoading,
}) => {
  useEffect(() => {
    dispatch(fetchProductBrandStart())
    dispatch(fetchProductCategoryStart())
    dispatch(fetchBrandProductStart({ featured: true }))
    return function cleanup() {
      //! this cleanup fxn was commented out
      dispatch(brandCleanUp())
    }
  }, [dispatch])

  const classes = useStyles()
  const carouselArray = [
    '/images/carousel-1.png',
    '/images/carousel-2.jpg',
    '/images/carousel-3.jpg',
  ]
  const carouselArray1 = [
    '/images/carousel-7.jpg',
    '/images/carousel-8.jpg',
    '/images/carousel-9.jpg',
  ]
  const carouselArray2 = [
    '/images/carousel-4.jpg',
    '/images/carousel-5.jpg',
    '/images/carousel-6.jpg',
  ]
  const carouselArray3 = [
    '/images/carousel-10.jpg',
    '/images/carousel-11.jpg',
    '/images/carousel-12.jpg',
  ]
  return (
    <div className={classes.root}>
      <CustomizedInputBase />
      <Hero />
      <Banner />
      <div className={classes.root}>
        {/* <Container className={classes.container}> */}
        {/* <Hidden only={['md', 'lg', 'xl']}>
          <Carousel>{carouselArray}</Carousel>
        </Hidden>
        <Hidden only={['xs', 'sm']}>
          <Carousel>{carouselArray1}</Carousel>
        </Hidden> */}

        {/* </Container>
        <Container className={classes.container}> */}
        <Grid className={classes.grid} container spacing={0}>
          <Grid item md={6} xs={12}>
            {' '}
            <Button fullWidth className={classes.contactUs}>
              <Typography align='center' variant='h6'>
                For Wholesale call 9824457278
              </Typography>
            </Button>
          </Grid>
          <Grid item md={6} xs={12}>
            <Button
              fullWidth
              className={classes.emailUs}
              onClick={() => {
                history.push('/contactUs')
              }}
            >
              <Typography align='center' variant='h6'>
                Email us
              </Typography>
            </Button>
          </Grid>
        </Grid>

        {/* </Container> */}
      </div>
      {/* <Container className={classes.boxShadow}> */}
      <div className={classes.BoxContainer}>
        <Typography className={classes.spaceBottom} align='center' variant='h5'>
          Featured Products
        </Typography>
        <Slider field='featured' searchTerm={true} />
      </div>
      {/* </Container> */}
      {/* <BoxContainerComp
        list={brandList}
        isLoadingStatus={isLoading}
        loadingError={error}
        fetchFxn={fetchBrandProductStart}
        setFxn={setSearchTerm}
        field={'subCategory'}
      /> */}
      {/* <Container> */}
      <Hidden only={['xs', 'sm']}>
        <Carousel>{carouselArray2}</Carousel>
      </Hidden>
      {/* </Container>
      <Container> */}
      <Hidden only={['md', 'lg', 'xl']}>
        <Carousel>{carouselArray3}</Carousel>
      </Hidden>
      {/* </Container> */}
      <BoxContainerComp
        list={categoryList}
        isLoadingStatus={fetchingCategoryList}
        loadingError={categoryListError}
        fetchFxn={fetchBrandProductStart}
        setFxn={setSearchTerm}
        field={'category'}
      />
      <Description />
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  brandList: selectproductBrandList,
  productList: selectProductList,
  isLoading: selectProductIsLoading,
  product: selectProduct,
})
export default connect(mapStateToProps)(withRouter(HomePage))
