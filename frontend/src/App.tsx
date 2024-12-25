import {useEffect} from 'react';
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
    <div >
      <LoadingPage/>
      <LoadingScreen/>
    </div>
  );
}

export default App;
