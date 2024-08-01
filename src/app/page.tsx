'use client'
import Divider from '@mui/material/Divider';
import { ListComponent } from './shared/ListComponent';
import { useState } from 'react';


export default function Home() {
  const [modalState, setModalState] = useState<boolean>(false)
  return (
    <>
      {modalState && (
        <div className='inset-0 fixed flex flex-col items-center justify-center backdrop-blur-md'>
          <div className='border-2 border-black flex flex-col w-[25%] items-center p-2 bg-white'>
            <p className='p-2 text-xl m-2'>Add Item</p>
            <Divider className='w-full bg-black' />
            <input placeholder='Item' className='w-full p-4 m-2' />
            <div className='flex items-center justify-between w-full p-2'>
              <input placeholder='No. of boxes' className='w-[40%] p-4 m-2' />
              <button className='bg-black p-2 text-white rounded-md w-[30%]' onClick={() => setModalState(false)}> Add</button>
            </div>
          </div>
        </div>
      )}
      <div className='flex items-center justify-center h-[100vh]'>
        <div className="flex flex-col items-start justify-center p-4 w-[35%] border-2 border-black rounded-md">
          <div className="w-full flex items-center justify-center">
            <p className="text-xl p-4 ">
              Inventory Items
            </p>
          </div>
          <Divider className='w-full bg-black' />
          <div className='w-full flex flex-col overflow-auto max-h-[50vh]'>
            <ListComponent itemName="Milk" quantity={1} />
            <ListComponent itemName="Sugar" quantity={10} />
            <ListComponent itemName="Salt" quantity={15} />
            <ListComponent itemName="Bread" quantity={5} />
          </div>

          <button className='w-full p-4 bg-black text-white rounded-md mt-4' onClick={() => setModalState(true)}>
            Add New item
          </button>
        </div>
      </div>
    </>
  );
}
