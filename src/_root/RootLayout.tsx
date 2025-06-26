import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/shared/Topbar';
import Bottombar from '../components/shared/Bottombar';
import Viget from '../components/shared/viget';

const RootLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='w-full md:flex'>
      <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section className='flex flex-1 h-full'>
        <Outlet context={{ searchQuery }} />

        <Viget />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;