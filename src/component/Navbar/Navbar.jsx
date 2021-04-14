import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import logo from '../../assets/e-commerce.png'
import useStyles from './style'
import {Link, useLocation} from 'react-router-dom'



const Navbar = ({totalItems}) => {
    const classes = useStyles()
    const location = useLocation()

    

    return (
        <>
        <AppBar position ='fixed' className= {classes.appbar} color ='inherit'>
            <Toolbar>
                <Typography component = {Link} to ="/" variant ='h6' className={classes.title} color='inherit'>
                    <img src={logo} alt='Commerce.js' height='25px' className={classes.image}/>
                    TECH SHOP
                </Typography>
                <div className={classes.grow} />
                {/* nếu đang ở cart thì không hiển thị icon cart nữa */}
                {location.pathname === '/' && (
                <div className ={classes.button}>
                {/* <Link to = "./cart">Go to cart</Link> */}
                <IconButton to = "./cart" component = {Link} arial-label ='Show cart items' color='inherit'>
                    <Badge badgeContent={totalItems} color='secondary'>
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                </div> ) }
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar
