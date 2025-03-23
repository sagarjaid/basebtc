/** @format */

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import hero from '@/app/hero.png';

export default function Home() {
  return (
    <>
      {/* <Suspense>
        <Header />
      </Suspense> */}
      <main>
        <div className='flex w-full h-screen text-xs'>
          <Navbar />

          <div className='flex justify-between w-full'>
            <div className='flex flex-col w-full overflow-y-scroll'>
              <div className='relative flex items-center p-2.5 w-full max-w-80'>
                <input
                  type='text'
                  placeholder='Search'
                  className='p-3 pr-12 border rounded-full w-full'
                />
                <svg
                  className='absolute right-8 w-6 h-6 text-gray-500 cursor-pointer'
                  fill='none'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </div>
              {/* <ChannelList filter={'all'} /> */}
              <Image
                src={hero}
                alt='Product Demo'
                className='w-full m-2  rounded-lg shadow-sm'
                priority={true}
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
