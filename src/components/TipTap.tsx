import React, { FunctionComponent, useEffect, useState } from 'react';
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import { BaseDirectory, writeFile, readTextFile } from '@tauri-apps/api/fs';
import { save, open } from '@tauri-apps/api/dialog';
import { resolveResource } from '@tauri-apps/api/path';

import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import BoldIcon from '../assets/icons/BoldIcon';
import { IConfigFile, getConfigFileObj, getConfigFilePath, getResourcePath, setSaveFilePath } from '../utils/fs';

type Levels = 1 | 2 | 3 | 4 | 5 | 6

const classes: Record<Levels, string> = {
    1: 'text-5xl font-bold my-2',
    2: 'text-4xl font-bold my-2',
    3: 'text-3xl font-bold my-2',
    4: 'text-2xl font-bold my-2',
    5: 'text-xl font-bold my-2',
    6: 'text-lg font-bold my-2',
};

const TipTap: FunctionComponent = () => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                paragraph: {
                    HTMLAttributes: {
                        class: 'my-2',
                    },
                },
                code: {
                    HTMLAttributes: {
                        class: 'bg-[#616161]/[0.1] text-[#616161]',
                    },
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: 'bg-[#0D0D0D] text-white p-2 rounded-md',
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'pl-4 border-l-2 border-l-[#0D0D0D]/[0.1]',
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'px-5 list-disc my-4',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'px-5 list-decimal my-4',
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: '',
                    },
                },
            }),
            Heading.configure({
                levels: [1, 2, 3],
            }).extend({
                renderHTML(this, { node, HTMLAttributes }) {
                    const { options } = this;
                    const hasLevel = options.levels.includes(node.attrs.level);
                    const level: Levels = hasLevel ? node.attrs.level : options.levels[0];
                    return [
                        `h${level}`,
                        mergeAttributes(options.HTMLAttributes, HTMLAttributes, {
                            class: `${classes[level]}`,
                        }),
                        0,
                    ];
                },
            }),
            Highlight.configure({
                HTMLAttributes: {
                    class: 'bg-[#faf594]',
                },
            }),
        ],
        content: `
            <h1>This is a 1st level heading</h1>
            <h2>This is a 2nd level heading</h2>
            <h3>This is a 3rd level heading</h3>
            <h4>This is a 4rd level heading</h4>
            <h5>This is a 5rd level heading</h5>
            <h6>This is a 6rd level heading</h6>
            
            <p>This is a paragraph</p>
            
            <pre><code>THIS IS A CODE BLOCK</code></pre>
            
            <p><code>THIS IS JUST A CODE LINE</p></code>

            <p><strong>THIS IS JUST A strong LINE</p></strong>

            <p><s>THIS IS JUST A s LINE</p></s>

            <p><mark>THIS IS JUST A s LINE</mark></p>
            
            <blockquote>
                This is a quote block!!!🤘
            </blockquote>

            <ul>
                <li>LIST ITEM 1</li>
                <li>LIST ITEM 2</li>
                <li>LIST ITEM 3</li>
            </ul>

            <ol>
                <li>LIST ITEM 1</li>
                <li>LIST ITEM 2</li>
                <li>LIST ITEM 3</li>
            </ol>
        `,
        editorProps: {
            attributes: {
                class: 'w-full p-4 focus:outline-none text-black overflow-y-auto',
            },
        },
        onUpdate(props) {
            console.log(props.editor.getText());
        },
    });

    const [savePath, setSavePath] = useState('');
    const [fileName, setFileName] = useState('');

    const queryClient = useQueryClient();

    const { isLoading, data, error } = useQuery({ queryKey: ['todos'], queryFn: getConfigFileObj });
    const { data: resourcePath } = useQuery({ queryKey: ['zzzz'], queryFn: getResourcePath });

    const { mutate } = useMutation({
        mutationFn: setSaveFilePath,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    useEffect(() => {
        if (data && resourcePath) {
            setSavePath(data.savePath ? data.savePath : resourcePath);
        }
    }, [data]);

    if (!editor || editor.isDestroyed) {
        return null;
    }

    const saveFileContents = async () => {
        try {
            await writeFile(`${savePath}${fileName}.json`, JSON.stringify(editor.getJSON()));
        } catch (err) {
            console.error(err);
        }
    };

    const changeSaveFilePath = async () => {
        const path = await open({
            directory: true,
        });

        mutate(path as string);
    };

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen gap-4'>
            <h1 className='text-5xl text-text font-bold'>
                TIP TAP
            </h1>

            <div className='w-[80%] flex items-center justify-between'>
                <div className='w-[80%] flex items-center bg-orange-500 h-full border border-black px-2'>
                    <p>{savePath}</p>
                </div>

                <button
                    className='text-black flex items-center justify-center bg-orange-500 p-2 font-bold'
                    onClick={changeSaveFilePath}
                >
                    <p>SAVE PATH</p>
                </button>
            </div>

            <div className='w-[80%] flex items-center justify-between'>
                <input
                    className='w-full h-full p-2 bg-transparent outline-none border border-black'
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
            </div>

            <div className='w-[80%] bg-white flex flex-col items-center justify-start h-[70%] border border-black rounded-sm'>
                <div className='w-full flex justify-between gap-2 border-b border-b-black bg-orange-500'>
                    <button
                        className='text-black flex items-center justify-center bg-orange-500 p-2'
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <BoldIcon />
                    </button>

                    <button
                        className='text-black flex items-center justify-center p-2 font-bold'
                        onClick={saveFileContents}
                    >
                        <p>SAVE</p>
                    </button>
                </div>
                <EditorContent
                    className='w-full flex flex-col items-center justify-start overflow-y-auto'
                    editor={editor}
                />
            </div>
        </div>
    );
};

export default TipTap;
