import { IFileReaderStrategy } from './IFileReaderStrategy';
import axios from 'axios';

export class RemoteFileReader implements IFileReaderStrategy {
    async read(url: string): Promise<string> {
        try {
            const response = await axios.get(url);
            if (response.status !== 200) {
                throw new Error(`Failed to fetch file, status ${response.status}`);
            }
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                throw new Error('File not found');
            }
            throw new Error(`Error fetching file: ${error.message}`);
        }
    }
}