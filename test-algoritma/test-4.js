function diagonalDifference(matrix){
    let n = matrix.length;
    let diagonal1 = 0, diagonal2 = 0;

    for(let i = 0; i < n; i++){
        diagonal1 += matrix[i][i];
        diagonal2 += matrix[i][n - i - 1];
    }

    return Math.abs(diagonal1 - diagonal2);
}

let Matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(diagonalDifference(Matrix));