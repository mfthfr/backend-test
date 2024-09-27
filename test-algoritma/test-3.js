function arrayQuery(INPUT, QUERY){
    return QUERY.map(q => INPUT.filter(item => item === q).length);
}

let INPUT = ['xc', 'dz', 'bbb', 'dz'];
let QUERY = ['bbb', 'ac', 'dz'];
console.log(arrayQuery(INPUT, QUERY));