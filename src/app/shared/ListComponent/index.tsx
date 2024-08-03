import { useState } from "react";
import { updateItem, getItems, deleteItem } from "@/app/Firebase/PantryFirebase";
import { CircularProgress } from "@mui/material";


type Props = {
    itemName: string;
    quantity: number;
    itemId?: string;
    onUpdate: () => void;
}

export const ListComponent = ({ itemName, quantity, itemId, onUpdate }: Props) => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingRemove, setLoadingRemove] = useState(false);
    const [currentQty, setCurrentQty] = useState<number>(quantity);

    const handleRemove = async () => {
        setLoadingRemove(true);
        try {
            if (currentQty <= 1) {
                await deleteItem(itemId!);
                setCurrentQty(0); // Set to 0 to reflect removal
            } else {
                await updateItem(itemId!, { quantity: currentQty - 1 });
                setCurrentQty(prev => prev - 1);
            }
            onUpdate(); // Refresh the list of items
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setLoadingRemove(false);
        }
    };

    const handleAdd = async () => {
        setLoadingAdd(true);
        try {
            await updateItem(itemId!, { quantity: currentQty + 1 });
            setCurrentQty(prev => prev + 1);
            onUpdate(); // Refresh the list of items
        } catch (error) {
            console.error('Error updating item:', error);
        } finally {
            setLoadingAdd(false);
        }
    };

    return (
        <div className='flex items-center justify-between p-4 m-2'>
            <div className='w-[70%] flex items-center justify-between'>
                <p className='text-xl'>{itemName}</p>
                <p className='text-xl'>{quantity}</p>
            </div>
            <div className='flex items-center justify-evenly gap-3'>
                <button
                    className='bg-black text-white p-2 rounded-md'
                    onClick={handleRemove}
                    disabled={loadingRemove}
                >
                    {loadingRemove ? (<CircularProgress />) : (`Remove`)}
                </button>
                <button
                    className='bg-black text-white p-2 rounded-md'
                    onClick={handleAdd}
                    disabled={loadingAdd}
                >
                    {loadingAdd ? (<CircularProgress />) : (`Add`)}

                </button>
            </div>
        </div>
    );
}
