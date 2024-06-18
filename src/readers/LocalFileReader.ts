import { IFileReaderStrategy } from './IFileReaderStrategy';
import fs from 'fs';

export class LocalFileReader implements IFileReaderStrategy {
    async read(path: string): Promise<string> {
        try {
            const content = await fs.promises.readFile(path, 'utf-8');
            return content;
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                throw new Error('File not found');
            }
            throw error;
        }
    }
}