import { analyzeContent } from '../src/utils/analyzer';

describe('analyzeContent function', () => {
    it('should return correct analysis for empty content', () => {
        const result = analyzeContent('');
        expect(result).toEqual({
            wordCount: 0,
            letterCount: 0,
            spaceCount: 0,
            frequentWords: {}
        });
    });

    it('should return correct analysis for single word', () => {
        const result = analyzeContent('Hello');
        expect(result).toEqual({
            wordCount: 1,
            letterCount: 5,
            spaceCount: 0,
            frequentWords: {}
        });
    });

    it('should return correct analysis for multiple words', () => {
        const result = analyzeContent('Hello world, this is a test.');
        expect(result).toEqual({
            wordCount: 6,
            letterCount: 21,
            spaceCount: 5,
            frequentWords: {}
        });
    });

    it('should return no frequent words', () => {
        const result = analyzeContent('apple apple banana banana orange orange orange');
        expect(result).toEqual({
            wordCount: 7,
            letterCount: 40,
            spaceCount: 6,
            frequentWords: {}
        });
    });
    
    it('should handle punctuation and numbers correctly', () => {
        const result = analyzeContent('Hello, 123 world!');
        expect(result).toEqual({
            wordCount: 2,
            letterCount: 10,
            spaceCount: 2,
            frequentWords: {}
        });
    });

    it('should handle leading and trailing spaces correctly', () => {
        const result = analyzeContent('   Hello world   ');
        expect(result).toEqual({
            wordCount: 2,
            letterCount: 10,
            spaceCount: 7,
            frequentWords: {}
        });
    });

    it('should handle long words correctly', () => {
        const result = analyzeContent('supercalifragilisticexpialidocious');
        expect(result).toEqual({
            wordCount: 1,
            letterCount: 34,
            spaceCount: 0,
            frequentWords: {}
        });
    });

    it('should handle multiple lines correctly', () => {
        const result = analyzeContent('Hello\nworld\n\nThis is a test.');
        expect(result).toEqual({
            wordCount: 6,
            letterCount: 21,
            spaceCount: 3,
            frequentWords: {}
        });
    });

    it('should handle mixed case correctly', () => {
        const result = analyzeContent('Hello World, hello world');
        expect(result).toEqual({
            wordCount: 4,
            letterCount: 20,
            spaceCount: 3,
            frequentWords: {}
        });
    });

    it('should identify frequent words above threshold', () => {
        const result = analyzeContent('apple apple apple apple apple apple apple apple apple apple apple banana banana banana orange orange orange orange orange');
        expect(result).toEqual({
            wordCount: 19,
            letterCount: 103,
            spaceCount: 18,
            frequentWords: {
                apple: 11
            }
        });
    });
});
