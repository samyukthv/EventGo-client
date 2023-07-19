import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './animatedRoutes/AnimatedRoutes';
import { toast, Toaster } from 'react-hot-toast';

function App() {
  return (
<div className=''>
      <BrowserRouter>
        <AnimatedRoutes />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
