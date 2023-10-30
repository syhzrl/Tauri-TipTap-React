import { readTextFile, writeFile } from '@tauri-apps/api/fs';
import { resolveResource } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';

export interface IConfigFile {
    savePath: string;
}

export const getResourcePath = async (): Promise<string> => {
    const resourcePath = await resolveResource('');

    return resourcePath;
};

export const getConfigFilePath = async (): Promise<string> => {
    const configFilePath = await resolveResource('config-test.json');

    return configFilePath;
};

export const getConfigFileObj = async (): Promise<IConfigFile> => {
    const configFilePath = await resolveResource('config-test.json');
    const configFileObj = JSON.parse(await readTextFile(configFilePath));

    return configFileObj;
};

export const setSaveFilePath = async (savePath: string): Promise<void> => {
    const configFilePath = await resolveResource('config-test.json');

    await writeFile(configFilePath, JSON.stringify({ savePath }));
};
