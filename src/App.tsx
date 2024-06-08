import React,{useEffect} from 'react';
// import GridPalline from './Visualizer/GridPalline';
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
      {/* <GridPalline></GridPalline> */}
      <LoadingScreen/>
    </div>
  );
}

export default App;
