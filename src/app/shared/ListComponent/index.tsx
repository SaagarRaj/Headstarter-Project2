
type Props = {
    itemName: string,
    quantity: number,
}

export const ListComponent = ({ itemName, quantity }: Props) => {
    return (
        <div className='flex items-center justify-between p-4 m-2'>
            <div className='w-[70%] flex items-center justify-between'>
                <p className='text-xl'>
                    {itemName}
                </p>
                <p className='text-xl'>
                    {quantity}
                </p>
            </div>
            <div className='flex items-center justify-evenly gap-1'>
                <button className='bg-black text-white p-2 rounded-md'>
                    Add
                </button>
                <button className='bg-black text-white p-2 rounded-md'>
                    Remove
                </button>
            </div>
        </div>
    )
}