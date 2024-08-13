import gifsicleExec from "./gifsicleExec";

type TGifData = File | Blob | ArrayBuffer;
/**
 * Returns parsed information for a gif from `'gifsicle --info file.gif'`
 */
export default async function getGifInfo(gif: TGifData) {
  const { outputLogs } = await gifsicleExec({
    gifFiles: [
      {
        file: gif,
        name: "1.gif",
      },
    ],
    command: ["--info 1.gif"],
  });

  const logs = outputLogs.splice(0, 13).map((el) => {
    // Trim and split all strings to not repeat ourselves
    return el.replace("\n", "").trim().split(" ");
  });

  const totalImages = Number(logs[0][2]);
  const logicalScreen = logs[1][2];
  const globalColorTable = Number(logs[2][3].slice(1, -1));
  const background = Number(logs[3][1]);
  let loop = false;
  let delay = 0;

  // Check if next line is loop, if so set the 'loop' to true
  if (logs[4][0] == "loop") {
    loop = true;
  }

  // Find a string that contains 'delay'
  for (let n = 4; n < logs.length; n++) {
    if (logs[n].includes("delay")) {
      const lastIndex = logs[n].length - 1;
      delay = Number(logs[n][lastIndex].slice(0, -1));
      break;
    }
  }

  return { totalImages, logicalScreen, globalColorTable, background, loop, delay };
}

// Parsing the output generated from 'gifsicle --info file.gif'

// * file.gif 52 images
//   logical screen 960x540
//   global color table [256]
//   background 255
//   loop forever
// + image #0 960x540 transparent 255
//     local color table [256]
//     disposal asis delay 0.10s
//   + image #1 960x540 transparent 255
//     disposal asis delay 0.10s

// * no-loop.gif 30 images
//   logical screen 275x200
//   global color table [256]
//   background 0
//   + image #0 275x200
//     delay 0.01s

// * no-loop2.gif 11 images
//   logical screen 332x332
//   global color table [256]
//   background 0
//   + image #0 332x332
//     comment Optimized with https://ezgif.com/optimize
//     disposal asis delay 0.10s
//   + image #1 332x332 transparent 237
//     disposal asis delay 0.10s
