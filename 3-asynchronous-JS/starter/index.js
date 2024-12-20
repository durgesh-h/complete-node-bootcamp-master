const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");
const { reject } = require("superagent/lib/request-base");
//--------------------------CALLBACK HELL AREA --------------------
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return consloe.log(err.message);
//       console.log(res.body);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved to file!");
//       });
//     });
// });

//----------------------------------------------------------------

//-----------------------.then() function-------------------------

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       //promise
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved to file!");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

//---------------------------------------------------

//----------------------PROMISES BUILD--------------
// const readfilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) reject("I could not find that file!");
//       resolve(data);
//     });
//   });
// };

// const writefilePro = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//       if (err) reject("Could not write file 😏");
//       resolve("success!");
//     });
//   });
// };

// readfilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     //promise
//     console.log(res.body.message);
//     return writefilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file!👍");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//--------------------------------------------------------------------------

//---------------------------Async/Await in Promises--------------------
const readfilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file!");
      resolve(data);
    });
  });
};

const writefilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😏");
      resolve("success!");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readfilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    // Used multiple promises simultaneously
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writefilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random dog image saved to file!👍");
  } catch (err) {
    console.log(err);
  }
  return "2: READY🐶";
};

getDogPic();
//----------------------------------------------------------------------

//------------------------working of async functions (IIFE)------------------------
(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics!");
  } catch (err) {
    console.log("ERROR 💥");
  }
})();

//------------------------working of async functions (IIFE)------------------------
