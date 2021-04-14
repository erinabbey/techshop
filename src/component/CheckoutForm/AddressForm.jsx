import React, {useState, useEffect} from 'react'
import {InputLabel, MenuItem, Select, Button, Typography, Grid} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import FormInput from "./CustomTextField"
import {commerce} from '../../lib/commerce'
import {Link} from 'react-router-dom'

const AddressForm = ({checkoutToken, next}) => {
    const methods = useForm()

    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    
    const fetchShippingCountries = async(checkoutTokenID)=>{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenID)
        // console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }
   
    const countries = Object.entries(shippingCountries).map(([code, name]) =>({id: code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) =>({id: code, label: name}))
    const options = shippingOptions.map((s0) => ({id: s0.id, label: `${s0.description} - (${s0.price.formatted_with_symbol})`}))

    const fetchSubdivisions = async(countryCode) =>{
            const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)

            setShippingSubdivisions(subdivisions)
            setShippingSubdivision(Object.keys(subdivisions)[0])

    }

    const fetchShippingOptions = async(checkoutTokenId, country, region = null) =>{
        const options  = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region} )
        
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id)
    }, [])

    // when country change 
    useEffect(() =>{
       if(shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() =>{
            if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <>
        <Typography variant = "h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form onSubmit = {methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))} >
                <Grid item container  spacing = {3}>
                <div class="form__group field">
                        <input className = 'input__field' name = "firstName" label = "First Name" required/>
                        <label for="name" className="form__label">First name</label>
                        <input className = 'input__field' name = "lastName" label = "Last Name" required/>
                        <label for="name" classname="form__label">Last name</label>
                        <input className = 'input__field' name = "address1" label = "Address" required/>
                        <label for="name" className="form__label">Address</label>
                        <input className = 'input__field' name = "email" label = "Email" required/>
                        <label for="name" className="form__label">Email</label>
                        <input className = 'input__field' name = "city" label = "City" required/>
                        <label for="name" className="form__label">City</label>
                        <input className = 'input__field' name = "zip" label = "ZIP/Postal code" required/>
                        <label for="name" className="form__label">ZIP/Postal code</label>
                        </div>
                        <Grid item xs = {12} sm = {6}>
                            <InputLabel>Shipping Address </InputLabel>
                            <Select value = {shippingCountry} fullWidth onChange = {(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) =>(
                                    <MenuItem key = {country.id} value = {country.id}>
                                    {country.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs = {12} sm = {6}>
                            <InputLabel>Shipping Subdivision </InputLabel>
                            <Select value = {shippingSubdivision} fullWidth onChange = {(e) => setShippingSubdivision(e.target.value)}>
                                   {subdivisions.map((subdivision) =>(
                                        <MenuItem key ={subdivision.id} value = {subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                   ))}
                            </Select>
                        </Grid>
                        <Grid item xs = {12} sm = {6}>
                            <InputLabel>Shipping Options </InputLabel>
                            <Select value = {shippingOption} fullWidth onChange = {(e) => setShippingOptions(e.target.value)}>
                                   {options.map((option) => (
                                        <MenuItem key ={option.id} value = {option.id}>
                                        {option.label}
                                    </MenuItem>
                                   ))}
                            </Select>
                        </Grid>
                </Grid>
                <br/>
                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component = {Link} to ="/cart" variant = 'outlined'>Back to cart</Button>
                        <Button type = 'submit' color = 'primary' variant = 'contained'>Next</Button>
                </div>
            </form>
        </FormProvider>
        </>
    )
}

export default AddressForm
