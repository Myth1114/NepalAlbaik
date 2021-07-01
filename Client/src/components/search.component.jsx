import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { connect } from 'react-redux'
import { selectProduct } from './../redux/product/product.selector'
import { fetchProductBySearchStart } from './../redux/product/product.actions'
import { createStructuredSelector } from 'reselect'
import Listing from './listing.component'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px 0',
    padding: '2px 4px',
    boxShadow: 'none',
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    border: '1px solid lightgray',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    paddin: 10,
    height: 10,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

function CustomizedInputBase({
  dispatch,
  productState: { searchListLoading, searchList, searchListError },
}) {
  const classes = useStyles()
  const [searchQuery, setSearchQuery] = useState({ tags: false })
  const handleChange = (e) => {
    setSearchQuery({
      tags: e.target.value.trim().split(' ').join('').toLowerCase(),
    })

    //dispatch the trrimmed value
    //   dispatch(fetchProductBySearchStart(searchQuery));
  }
  useEffect(() => {
    // if (searchQuery.tags.length === 0) {

    //   dispatch(fetchProductBySearchStart({ tags: false }));
    // }
    searchQuery.tags.length === 0
      ? dispatch(fetchProductBySearchStart({ tags: false }))
      : dispatch(fetchProductBySearchStart(searchQuery))
    // dispatch(fetchProductBySearchStart(searchQuery));
  }, [searchQuery, dispatch])
  // console.log(searchQuery, "search query");
  return (
    <div>
      <Paper component='form' className={classes.root}>
        <InputBase
          onChange={handleChange}
          multiline={true}
          className={classes.input}
          placeholder='Search Products'
          inputProps={{ 'aria-label': 'search Products' }}
        />
        <IconButton aria-label='menu'>
          <SearchIcon />
        </IconButton>
      </Paper>
      <Listing
        productListArray={searchList}
        isProductListLoading={searchListLoading}
        error={searchListError}
        tags={searchQuery.tags.length === 0 ? false : searchQuery.tags}
      />
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  productState: selectProduct,
})
export default connect(mapStateToProps)(CustomizedInputBase)
