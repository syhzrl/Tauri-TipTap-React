import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SideBar: FunctionComponent = () => {
    return (
        <div className='flex justify-between w-full h-fit bg-red-400'>
            <Link
                to='/'
                className='bg-pink-800 p-2 w-full flex items-center justify-center'
            >
                <p>Notes</p>
            </Link>

            <div className='flex w-[1px] border-r border-r-black' />

            <Link
                to='/'
                className='bg-pink-800 p-2 w-full flex items-center justify-center'
            >
                <p>Todos</p>
            </Link>
        </div>
    );
};

export default SideBar;
