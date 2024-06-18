import { IFileReaderStrategy } from './IFileReaderStrategy';

export class FileReaderContext {
    private strategy: IFileReaderStrategy;

    constructor(strategy: IFileReaderStrategy) {
        this.strategy = strategy;
    }

    async read(path: string): Promise<string> {
        return this.strategy.read(path);
    }
}