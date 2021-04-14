import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core'
import useStyles from './style'

const CartItem = ({item, onUpdateCartQty, onRemoveFromCart }) => {

    const classes = useStyles()

    const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

    const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

    return (
        <Card>
            <CardMedia image = {item.media.source} alt = {item.name} className = {classes.media}></CardMedia>
            <CardContent className = {classes.cardContent} >
                <Typography variant = "h4" >{item.name}</Typography>
                <Typography variant = "h5" >{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className = {classes.cardActions}>
                <div className = {classes.buttons}>
                    {/* tăng giảm số lượng sản phẩm --> tính tiền luôn; nếu muốn remove thì remove hết tất cả sản phẩm */}
                    <Button type = 'button' size = 'small' 
                    onClick = {() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    {/* <Typography>{item.quantity}</Typography> */}
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button type = 'button' size = 'small'
                    onClick = {() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button type = 'button' color = "secondary" variant ='contained' 
                onClick = {() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
