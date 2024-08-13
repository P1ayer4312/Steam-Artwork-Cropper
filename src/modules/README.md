# Patches

Below are some code changes for these packages to work properly

## gifsicle-wasm-browser

https://github.com/renzhezhilu/gifsicle-wasm-browser

`gifsicle.js`
```js
// Added 'outputCollector' array to store logs from gifsicle stdout
const outputCollector = []; // --- Added
const stdout = (char) => {
  out += String.fromCharCode(char);

  if (char === 10) {
    outputCollector.push(out); // --- Added
    console.log(out);
    out = "";
  }
};

// ...

const encode = async (obj = {}) => {
  // ...
  return new Promise((resolve, reject) => {
    // ...
    gifsicle_c({
      // ...
      output: (res) => {
        // Pass the logs and gifs files
        resolve(res);   // --- Original
        resolve({       // --- Changed
          files: res,
          outputLogs: outputCollector,
        });
        resolved = true;
      },
    });
    // ...
  });
};
```

`index.js`
```js
myWorker.onmessage = async function (e) {
  // Replace all occurrences of 'e.data' with 'e.data.files'
  if (!e.data.files || typeof e.data.files === 'string') {
    myWorker.terminate();
    rej(e.data.files);
    return;
  }
  let outArr = [];
  for (let index = 0; index < e.data.files.length; index++) {
    const element = e.data.files[index];
    // ...
  }
  myWorker.terminate();
  
  // Pass the gifs and output logs array to the Promise resolve
  res(outArr);  // --- Original
  res({         // --- Changed
    gifs: outArr,
    outputLogs: e.data.outputLogs
  });
};
```
Build steps:
1. Install dependencies `npm install`
1. Change directory `cd ./src`
1. Run `node build.js`
1. Copy the `dist\gifsicle.min.js` file to `src\modules`
1. Rename it from .js to .ts

## ffprobe-wasm
https://github.com/alfg/ffprobe-wasm

1. TODO