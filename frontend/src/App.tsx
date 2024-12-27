import { useEffect } from 'react';
import LoadingScreen from './Components/Loading/LoadingScreen';
import { useLoading } from './hooks/useLoading';
import setLoadingInterceptor from './interceptors/loadingInterceptor';
import LoadingPage from './Components/Loading/LoadingPage';
import GridPalline from './Components/Grid/GridPalline';
import { GridStateProvider } from './hooks/GridStateHook';
import { MatrixProvider } from './hooks/MatrixProvider';
import { OperationsProvider } from './hooks/OperationsHook';


function App() {

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading })
  }, [showLoading, hideLoading]);

  return (
    <div >
      <LoadingPage />
      <LoadingScreen>
        <MatrixProvider>
          <GridStateProvider>
            <OperationsProvider>
              <GridPalline />
            </OperationsProvider>
          </GridStateProvider>
        </MatrixProvider>

      </LoadingScreen>
    </div>
  );
}

export default App;
