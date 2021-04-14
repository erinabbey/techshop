import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './style'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'

const Cart = ({cart, handleUpdateCartQty, handleRemove, onEmptyCart }) => {

    const classes = useStyles()
    // const isEmpty = !cart.line_items.length
    const handleEmptyCart = () => onEmptyCart();

    const renderEmptyCart = () =>{
        <Typography variant = "subtitle1">You have no items in your shopping cart, start adding some
            <Link to = "/" className = {classes.link}>start adding some</Link>
        </Typography>
    }

    const FilledCart = () =>{
        return(
        <>
        <Grid container spacing = {3}>
            {cart.line_items.map((item) =>(
                <Grid item xs={12} sm = {4} key = {item.id}>
                    <CartItem item = {item}
                     onUpdateCartQty = {handleUpdateCartQty} 
                     onRemoveFromCart = {handleRemove}></CartItem>
                </Grid>
            ))}
        </Grid>
        <div className = {classes.cartDetails}>
            <Typography variant = "h4"> Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className = {classes.emptyButton}
                 size = "large" type = "button" 
                 variant = "container" color = "secondary" 
                 onClick = {handleEmptyCart}>
                     Empty cart
                     </Button>

                <Button component = {Link} 
                to = "/checkout" 
                className = {classes.checkoutButton} 
                size = "large" type = "button" 
                variant = "container" 
                color = "primary">
                    Check out
                    </Button>
            </div>
        </div>
        </>)
   } 

    if(!cart.line_items) return 'Loading...'

    return (
       <Container >
           <div className = {classes.toolbar}> </div>
           <Typography className = {classes.title} variant = 'h4'>Shopping cart</Typography>
           {!cart.line_items.length ? renderEmptyCart():FilledCart()}
       </Container>
    )
}

export default Cart
