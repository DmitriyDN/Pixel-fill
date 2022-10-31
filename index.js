const imageInput = [];
let row = [];
for (let i = 0; i < 2000; i++) {
  for (let j = 0; j < 2000; j++) {
    // row.push(Math.round(Math.random() * 1));
    row.push(1); // Worst case
  }
  imageInput.push(row);
  row = [];
}

// WON'T WORK BECAUSE OF CALL STACK
// const exploreDfsRecursive = (image, x, y, visited, valueToChange) => {
//   const key = `${x}_${y}`;
//   if (
//     visited.has(key) ||
//     x < 0 ||
//     x >= image[0].length ||
//     y < 0 ||
//     y > image.length
//   ) {
//     return;
//   }

//   visited.add(key);

//   if (valueToChange !== null && image[x][y] === valueToChange) {
//     return;
//   }

//   const setValue =
//     typeof valueToChange === "number" ? valueToChange : Number(!image[x][y]);

//   exploreDfsRecursive(image, x + 1, y, visited, setValue);
//   exploreDfsRecursive(image, x - 1, y, visited, setValue);
//   exploreDfsRecursive(image, x, y + 1, visited, setValue);
//   exploreDfsRecursive(image, x, y - 1, visited, setValue);

//   image[x][y] = setValue;
// };

const exploreDfsStack = (image, x, y, visited, valueToChange) => {
  let counter = 0;
  const stack = [[x, y]];
  const setValue =
    typeof valueToChange === "number" ? valueToChange : Number(!image[x][y]);

  while (stack.length) {
    counter++;
    const [elX, elY] = stack.pop();
    const key = `${elX}_${elY}`;
    if (
      visited.has(key) ||
      elX < 0 ||
      elX >= image[0].length ||
      elY < 0 ||
      elY >= image.length ||
      image[elX][elY] === setValue
    ) {
      continue;
    }

    visited.add(key);

    if (!image[elX]) {
      console.log(elX);
    }

    image[elX][elY] = setValue;

    stack.push([elX + 1, elY]);
    stack.push([elX - 1, elY]);
    stack.push([elX, elY + 1]);
    stack.push([elX + 1, elY - 1]);
  }
  return { counter, image };
};

const exploreBfs = (image, x, y, visited, valueToChange) => {
  let counter = 0;
  const queue = [[x, y]];
  const setValue =
    typeof valueToChange === "number" ? valueToChange : Number(!image[x][y]);

  while (queue.length) {
    counter++;
    const [elX, elY] = queue.shift();
    const key = `${elX}_${elY}`;
    if (
      visited.has(key) ||
      elX < 0 ||
      elX >= image[0].length ||
      elY < 0 ||
      elY >= image.length ||
      image[elX][elY] === setValue
    ) {
      continue;
    }

    visited.add(key);

    if (!image[elX]) {
      console.log(elX);
    }

    image[elX][elY] = setValue;

    queue.push([elX + 1, elY]);
    queue.push([elX - 1, elY]);
    queue.push([elX, elY + 1]);
    queue.push([elX + 1, elY - 1]);
  }
  return { counter, image };
};

console.log("BEFORE DFS");
// console.log(imageInput);
const str = JSON.stringify(imageInput);
let copy = JSON.parse(str);
let start = Date.now();
const dfsResults = exploreDfsStack(copy, 1, 1, new Set(), null);
copy = JSON.parse(str);
console.log(`After. Steps: ${dfsResults.counter} time: ${Date.now() - start}`);
// console.log(dfsResults.image);
console.log("\n\n\n");

console.log("BEFORE BFS");
// console.log(imageInput);
copy = JSON.parse(str);
start = Date.now();
const bfsResults = exploreBfs(copy, 1, 1, new Set(), null);
console.log(`After. Steps: ${bfsResults.counter} time: ${Date.now() - start}`);
// console.log(bfsResults.image);
console.log("\n\n\n");
