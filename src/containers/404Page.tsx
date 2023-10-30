import React, { FunctionComponent, useState, useEffect } from 'react';

const Error404Screen: FunctionComponent = () => {
    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen bg-orange-400 font-bold text-4xl'>
            <h1>
                404 Not Found
            </h1>
        </div>
    );
};

export default Error404Screen;
