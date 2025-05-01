import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
  return (
  <div className='flex justify-center items-center h-screen w-screen'> <DotLottieReact className='h-40 w-40'
       src="https://lottie.host/529073ae-1577-42a0-b2a0-a3d04f9f9113/vztwsAVvDC.lottie"
      loop
      autoplay
    /></div> 
  );
};

export default Loading