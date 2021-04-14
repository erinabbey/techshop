import {Grid} from '@material-ui/core'
import React from 'react'
import Product from './Product/Product'
import useStyle from './style'



    // const products = [
    // {id: 1, name: 'Headphone', description: 'High quality' , price :'$19.99', image: 'https://unsplash.com/photos/NehdOHCXsjs',},
    // {id: 2, name: 'Ipod', description: 'High quality', price :'$39.99' , image:'https://unsplash.com/photos/UI0KhU_Khhw',},
    // {id: 3, name: 'Speaker', description: 'High quality', price :'$29.99', image:'https://unsplash.com/photos/eMw1fBx4_Wk', },
    // ]
    
    const Products = ({products, onAddToCart}) =>{
        const classes = useStyle()

        if (!products.length) return <p>Loading...</p>;
        
        return(
            <main className = {classes.content}>
                <div className = {classes.toolbar}/>
                     <Grid container justify = 'center' spacing = {4}>
                         {products.map((product)=>(
                        <Grid key ={product.id} xs = {12} sm ={6} md = {4} lg = {3}>
                             <Product product = {product} onAddToCart = {onAddToCart}/>    
                        </Grid>
                        ))}
                     </Grid>
            </main>
             )
    }
    export default Products