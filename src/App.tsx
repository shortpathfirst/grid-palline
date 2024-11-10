import React,{useEffect} from 'react';
import './App.css';
import LoadingScreen from './Components/Loading/LoadingScreen';
import { useLoading } from './hooks/useLoading';
import setLoadingInterceptor from './interceptors/loadingInterceptor';
import LoadingPage from './Components/Loading/LoadingPage';



function App() {

  const {showLoading, hideLoading} = useLoading();

  useEffect(()=>{

    setLoadingInterceptor({showLoading,hideLoading})
    
  },[showLoading,hideLoading]);

  return (
    <div className='App'>
      <LoadingPage/>
      <LoadingScreen/>
    </div>
  );
}

export default App;
