/** @format */

'use client';

import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import hero from '@/app/hero.png';

const Headline = () => {
  return (
    <div className='flex gap-2 w-full justify-between items-center max-w-7xl mx-auto p-6 my-40'>
      <div className='flex flex-col gap-4'>
        <button className='relative flex w-fit items-center px-2.5 py-0.5 font-semibold border  rounded-lg'>
          LIVE
          <span className='absolute -top-1 -right-1 flex h-3 w-3'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75'></span>
            <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
          </span>
        </button>
        <h1 className='font-extrabold text-4xl lg:text-6xl '>
          <Typewriter
            options={{
              strings: [
                'Stocks vs',
                'Currencies vs',
                'Commodities vs',
                'Indices vs',
                'Real Estate vs',
                'Bonds vs',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <div className='font-extrabold text-4xl lg:text-6xl '>Bitcoin</div>
        <div> Track asset prices in real-time against Bitcoin (BTC)</div>
        <button className=' w-fit flex gap-3 items-center text-lg px-4 py-2 text-gray-900 font-semibold border border-gray-900 rounded-lg'>
          <span> Get Started</span>
          <span>🚀</span>
        </button>
      </div>
      <Image
        src={hero}
        alt='Product Demo'
        className='w-1/2 rounded-lg shadow-sm'
        priority={true}
        width={500}
        height={500}
      />
    </div>
  );
};

export default Headline;
