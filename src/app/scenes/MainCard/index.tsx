import Divider from '@mui/material/Divider';
type Props = {}

export const MainCard = (props: Props) => {
    return (
        <div className="flex flex-col items-start justify-center p-4 w-[35%] border-2 border-black rounded-md">
            <div className="w-full flex items-center justify-center">
                <p className="text-xl p-4 ">
                    Inventory Items
                </p>
            </div>
        </div>
    )
}