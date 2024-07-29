import React from 'react';
import { Toaster } from 'sonner';
import { Store } from "./context/store";
import { PageRouter } from './router/PageRouter';

function App() {

  return (
    <Store>
      <PageRouter />
      <Toaster expand={false} richColors autoClose={2000} closeButton={true} />
    </Store>
  );
}

export default App;