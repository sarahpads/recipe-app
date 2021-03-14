import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Button, ClickAwayListener, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons';
import React, { useRef, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Header: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const menuAnchor = useRef(null)
  const classes = useStyles()

  function handleProfileClick() {
    setMenuIsOpen(!menuIsOpen)
  }

  function handleClose() {
    setMenuIsOpen(false)
  }

  function handleLogout() {
    logout({ returnTo: window.location.origin })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>

        {!isAuthenticated && <Button color="inherit" onClick={loginWithRedirect}>Login</Button>}

        {isAuthenticated && (
          <React.Fragment>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileClick}
              color="inherit"
              ref={menuAnchor}
            >
              <AccountCircle />
            </IconButton>

            <ClickAwayListener onClickAway={handleClose}>
              <Menu
                id="menu-appbar"
                anchorEl={menuAnchor.current}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={menuIsOpen}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </ClickAwayListener>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
