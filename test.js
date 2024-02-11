const target = 3;
const array = [1, 2, 3, 4, 5];
const index = array.indexOf(target);

array.splice(index, 1);

console.log(array);