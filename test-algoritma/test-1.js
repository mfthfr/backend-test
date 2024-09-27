function reverseString(str){
    let num = str.match(/\d+$/);
    let letters = str.replace(/\d+$/, '');

    let reserved = letters.split('').reverse().join('');

    return num ? reserved + num[0]:reserved;
}

console.log(reverseString('NEGIE1'));