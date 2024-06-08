import React from 'react'
import Loading from './Loading'
import { useLoading } from '../../hooks/useLoading'
import './loading.css'
function LoadingPage() {
    const {isLoading} = useLoading();
    if(!isLoading) return <></>;
    
  return (
    <div className='container22'>
    <div className='items'>
      <Loading></Loading>
      <h1>Loading...</h1>
    </div>
  </div>
  )
}

export default LoadingPage;