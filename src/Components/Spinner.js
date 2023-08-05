import React from 'react'
import spinner from './Spinner.gif'
export default function Spinner(){
      return (
      <div className='text-center'>
        <img src={spinner} alt="spinner"/>
      </div>
    )
  }