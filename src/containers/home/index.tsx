import React, { FunctionComponent, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Popover } from '@headlessui/react';

import SideBar from './components/SideBar';
import FoldersAndFiles from './components/FoldersAndFiles';
import TipTap from '../../components/TipTap';

import { ReactComponent as Logo } from '../../assets/icons/folder.svg';
import { ReactComponent as FileLogo } from '../../assets/icons/file-02.svg';
import { ReactComponent as ChevronRight } from '../../assets/icons/chevron-right.svg';

const HomeScreen: FunctionComponent = () => {
    return (
        <div className='flex items-center justify-center w-screen h-screen bg-background text-text'>
            <div className='w-1/2 h-1/2 flex flex-col items-center justify-center gap-2'>
                {/* <Popover className='relative w-full h-full'>
                    <Popover.Button className='border w-full border-secondary p-2 rounded-md outline-none px-4'>
                        LOL
                    </Popover.Button>

                    <Popover.Panel className='absolute z-10 mt-4 w-full flex items-center justify-center '>
                        <FoldersAndFiles />
                    </Popover.Panel>
                </Popover> */}
                <FoldersAndFiles />
            </div>
        </div>
    );
};

export default HomeScreen;
