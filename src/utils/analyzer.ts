export function analyzeContent(content: string) {
    const words = content.split(/\s+/).filter(word => !/\d/.test(word));
    const wordCount = content.length > 0 ? words.filter(w => w !== "").length : 0;
    const letterCount = content.replace(/\s/g, '').replace(/[^a-zA-Z]/g, '').length;
    const spaceCount = content.split(' ').length - 1;

    const wordOccurrences: { [key: string]: number } = {};
    
    for(const word of words) {
        const sanitizedWord = word.toLowerCase().replace(/[^\w]/g, '');
        wordOccurrences[sanitizedWord] = (wordOccurrences[sanitizedWord] || 0) + 1;
    }

    const frequentWords: { [key: string]: number } = {};
    for(const word in wordOccurrences) {
        if(wordOccurrences[word] > 10) {
            frequentWords[word] = wordOccurrences[word]
        }
    }

    return {
        wordCount,
        letterCount,
        spaceCount,
        frequentWords
    };
}