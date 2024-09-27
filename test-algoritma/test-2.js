function longestWord(sentence){
    let words = sentence.split(' ');
    let longest = '';

    words.forEach(word => {
        if(word.length > longest.length){
            longest = word;
        }
    });

    return `${longest}: ${longest.length} character`;
}

console.log(longestWord("Saya sangat senang mengerjakan soal algoritma"));