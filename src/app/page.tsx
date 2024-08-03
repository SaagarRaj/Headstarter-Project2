'use client';

import Divider from '@mui/material/Divider';
import { ListComponent } from './shared/ListComponent';
import { useState, useEffect } from 'react';
import { PantryItem } from './shared/types';
import { addItem, updateItem, getItems } from './Firebase/PantryFirebase';

export default function Home() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [itemName, setItemName] = useState<string>("");
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    // Fetch items when component mounts
    const fetchItems = async () => {
      const itemsFromFirestore = await getItems();
      setItems(itemsFromFirestore);
    };
    fetchItems();
  }, []);

  const handleAddNewItem = async () => {
    if (itemName.trim() === '' || qty <= 0) return;

    const existingItem = items.find(item => item.name.toLowerCase() === itemName.toLowerCase());

    if (existingItem) {
      await updateItem(existingItem.id!, { quantity: existingItem.quantity + qty });
    } else {
      await addItem({ name: itemName, quantity: qty });
    }

    // Refresh items after adding or updating
    const updatedItems = await getItems();
    setItems(updatedItems);
    setModalState(false);
  };

  return (
    <>
      {modalState && (
        <div className='inset-0 fixed flex flex-col items-center justify-center backdrop-blur-md'>
          <div className='border-2 border-black flex flex-col w-[25%] items-center p-2 bg-white'>
            <div className='flex items-center justify-start w-full'>
              <button className='bg-black text-white w-6' onClick={() => setModalState(false)}>
                x
              </button>
            </div>
            <p className='p-2 pt-0 text-xl m-2'>Add Item</p>
            <Divider className='w-full bg-black' />
            <input
              placeholder='Item'
              className='w-full p-4 m-2'
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <div className='flex items-center justify-between w-full'>
              <input
                type='number'
                placeholder='No. of boxes'
                className='w-[50%] p-4'
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
              <button
                className='bg-black p-2 text-white rounded-md w-[30%]'
                onClick={handleAddNewItem}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='flex items-center justify-center h-[100vh]'>
        <div className="flex flex-col items-start justify-center p-4 w-[35%] border-2 border-black rounded-md">
          <div className="w-full flex items-center justify-center">
            <p className="text-xl p-4">Inventory Items</p>
          </div>
          <Divider className='w-full bg-black' />
          <div className='w-full flex flex-col overflow-auto max-h-[50vh]'>
            {items.map(item => (
              <ListComponent
                key={item.id}
                itemName={item.name}
                quantity={item.quantity}
                itemId={item.id}
                onUpdate={async () => setItems(await getItems())} // Refresh items list
              />
            ))}
          </div>
          <button
            className='w-full p-4 bg-black text-white rounded-md mt-4'
            onClick={() => setModalState(true)}
          >
            Add New item
          </button>
        </div>
      </div>
    </>
  );
}
