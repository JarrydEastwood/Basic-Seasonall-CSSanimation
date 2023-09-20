import {locationDetails} from './data';
import React, {useState} from 'react'



export default function Background() {
const [background, setBackground] = React.useState('')

{locationDetails.locations[0].city1 ? (
    <h1>{locationDetails.locations[0].imageName}</h1>
)
: ''}
}