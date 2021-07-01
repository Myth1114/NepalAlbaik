import React from 'react'
import clsx from 'clsx'
import Divider from '@material-ui/core/Divider'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './../redux/user/user.selector'
import LocalMallIcon from '@material-ui/icons/LocalMall'
import Badge from '@material-ui/core/Badge'
import { selectCartItemsCount } from './../redux/cart/cart.selector'
import HomeWorkSharpIcon from '@material-ui/icons/HomeWorkSharp'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp'
import ContactSupportSharpIcon from '@material-ui/icons/ContactSupportSharp'
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp'
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp'
import uuid from 'react-uuid'
const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  listItemText: {
    fontSize: 15,
  },
  albaik: {
    color: '#EA2027',
    fontWeight: 900,
    fontFamily: 'sans-serif',
    textTransform: 'uppercase',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  bag: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  textDecoration: {
    textDecoration: 'none',
    color: '#000',
  },
}))

const PersistentDrawerLeft = function ({ cartItemsCount, user, history }) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const sideBarList =
    user === null
      ? ['HomePage', 'Login', 'cart', 'orders', 'About-us']
      : user.role === 'user'
      ? ['HomePage', 'Login', 'cart', 'orders', 'About-us']
      : ['HomePage', 'Login', 'About-us']
  const sideBarIcons =
    user === null
      ? [
          <HomeWorkSharpIcon />,
          <AccountCircleSharpIcon />,
          <LocalMallIcon />,
          <CheckCircleSharpIcon />,
          <ContactSupportSharpIcon />,
        ]
      : user.role === 'user'
      ? [
          <HomeWorkSharpIcon />,
          <AccountCircleSharpIcon />,
          <LocalMallIcon />,
          <CheckCircleSharpIcon />,
          <ContactSupportSharpIcon />,
        ]
      : [
          <HomeWorkSharpIcon />,
          <AccountCircleSharpIcon />,

          <ContactSupportSharpIcon />,
        ]
  if (user) {
    sideBarList[1] = 'profile'
  }
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        color='#fff'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.bag}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.albaik}
            onClick={() => {
              history.push('/')
            }}
            variant='h6'
          >
            NepalAlbaik
          </Typography>
          {user === null || user.role === 'admin' ? null : (
            <Typography
              onClick={() => {
                history.push('/cart')
              }}
            >
              <Badge badgeContent={cartItemsCount} color='error'>
                <LocalMallIcon />
              </Badge>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {user ? <div>{user.email}</div> : null}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <List>
          {sideBarList.map((text, index) => (
            <Link
              key={uuid()}
              onClick={() => {
                handleDrawerClose()
              }}
              to={index === 0 ? `/` : `/${text}`}
              className={classes.textDecoration}
            >
              <ListItem button key={uuid()}>
                <ListItemIcon>{sideBarIcons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        {user === null ? null : user.role === 'admin' ? (
          <div>
            <Divider />
            <Typography align='center'>Admin</Typography>
            <List>
              {['DashBoard', 'Order-Info'].map((text, index) => (
                <Link
                  key={uuid()}
                  onClick={() => {
                    handleDrawerClose()
                  }}
                  to={`/${text}`}
                  style={{ textDecoration: 'none ', color: 'black' }}
                >
                  <ListItem button key={uuid()}>
                    <ListItemIcon>
                      <DashboardSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        ) : null}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  cartItemsCount: selectCartItemsCount,
})
export default connect(mapStateToProps)(withRouter(PersistentDrawerLeft))
