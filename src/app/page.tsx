import Image from 'next/image';
import { MainCard } from './scenes/MainCard';

export default function Home() {
  return (
    <div className='flex items-center justify-center h-[100vh]'>
      <MainCard />
    </div>
  );
}
