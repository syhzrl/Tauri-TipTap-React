import React, { FunctionComponent, useState, useEffect } from 'react';
import { Popover } from '@headlessui/react';

import FoldersAndFiles from '../home/components/FoldersAndFiles';

import { ReactComponent as FolderIcon } from '../../assets/icons/folder.svg';
import { ReactComponent as FileIcon } from '../../assets/icons/file-02.svg';
import { ReactComponent as ChevronRight } from '../../assets/icons/chevron-right.svg';

const BoardsScreen: FunctionComponent = () => {
    const [renderBoardList, setRenderBoardList] = useState(false);
    const [boardList, setBoardList] = useState([
        {
            id: 'zzzz',
            label: 'Board #1',
        },
        {
            id: 'xxxx',
            label: 'Board #2',
        },
        {
            id: 'yyyy',
            label: 'Board #3',
        },
    ]);

    return (
        <div className='flex items-center justify-center w-screen h-screen bg-background text-text'>
            <div className='w-1/2 h-1/2 flex flex-col items-center justify-center gap-2'>
                <Popover className='relative w-full'>
                    <Popover.Button className='border w-full border-secondary p-2 rounded-md outline-none px-4'>
                        LOL
                    </Popover.Button>

                    <Popover.Panel className='absolute w-full z-10 mt-4 flex items-center justify-center '>
                        <div className='w-full h-full bg-secondary border border-accent rounded-md flex flex-col p-2 px-4 gap-2'>
                            <div className='w-full flex-col flex items-center gap-2 overflow-y-auto'>
                                <button
                                    className='w-full flex items-center pl-4 gap-2 hover:bg-white/[0.1] duration-300 rounded-sm'
                                    onClick={() => setRenderBoardList(!renderBoardList)}
                                >
                                    <ChevronRight />
                                    <FolderIcon />
                                    <p className='font-bold text-lg text-right'>
                                        Boards
                                    </p>
                                </button>

                                {renderBoardList && (
                                    boardList.map(item => {
                                        return (
                                            <button key={item.id} className='w-full flex items-center pl-20 gap-2 hover:bg-white/[0.1] duration-300 rounded-sm'>
                                                <FileIcon className='' />
                                                <p className='font-bold text-lg'>
                                                    {item.label}
                                                </p>
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div className='w-full flex-col flex items-center gap-2 overflow-y-auto'>
                                <button
                                    className='w-full flex items-center pl-4 gap-2 hover:bg-white/[0.1] duration-300 rounded-sm'
                                    onClick={() => setRenderBoardList(!renderBoardList)}
                                >
                                    <ChevronRight />
                                    <FolderIcon />
                                    <p className='font-bold text-lg text-right'>
                                        Boards
                                    </p>
                                </button>

                                {renderBoardList && (
                                    boardList.map(item => {
                                        return (
                                            <button key={item.id} className='w-full flex items-center pl-20 gap-2 hover:bg-white/[0.1] duration-300 rounded-sm'>
                                                <FileIcon className='' />
                                                <p className='font-bold text-lg'>
                                                    {item.label}
                                                </p>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </Popover.Panel>
                </Popover>

                <h1>LMAO</h1>
            </div>
        </div>
    );
};

export default BoardsScreen;
