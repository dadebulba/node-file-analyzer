export interface IFileReaderStrategy {
    read(path: string): Promise<string>;
}