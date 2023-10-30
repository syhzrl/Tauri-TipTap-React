import React, { FunctionComponent, useState, useEffect } from 'react';

import { ReactComponent as FolderIcon } from '../../../assets/icons/folder.svg';
import { ReactComponent as FileIcon } from '../../../assets/icons/file-02.svg';
import { ReactComponent as ChevronRight } from '../../../assets/icons/chevron-right.svg';

const FoldersAndFiles: FunctionComponent = () => {
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
        <div className='w-full h-full bg-secondary border border-accent rounded-md flex flex-col p-2 px-4 gap-2'>
            <h1 className='font-bold text-5xl mt-2'>
                Project Name
            </h1>

            <div className='w-full my-2 border-b border-b-accent' />

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
    );
};

export default FoldersAndFiles;
