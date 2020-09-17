console.log("script loaded");
const INTERVAL_TIME = 6000;

let classList = ["hm-text", "hm-img", "hm-list"];

function generateRandomString(constraints) {
  // Generate random string of given length from a
  // set of predefined charachters
  let min = Math.ceil(Number(constraints["size"].split("__")[0]));
  let max = Math.floor(Number(constraints["size"].split("__")[1]));

  // random number between range Max and Min inclusive
  let length = Math.floor(Math.random() * (max + 1 - min)) + min;

  let result = "";
  let characters =
    "ABCD\nE FGHIJKL MNOPQRST UVWXY\n\tZabcdefg hijklmnopq rstuvwxyz0\t123456789";
  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function getRandomImage(constraints) {
  // use lorem picsum api to get random images respecting given constarints
  let minWidth = Math.ceil(
    Number(constraints["size"].split("__")[0].split("x")[0])
  );
  let minHeight = Math.ceil(
    Number(constraints["size"].split("__")[0].split("x")[1])
  );
  let maxWidth = Math.ceil(
    Number(constraints["size"].split("__")[1].split("x")[0])
  );
  let maxHeight = Math.ceil(
    Number(constraints["size"].split("__")[1].split("x")[1])
  );
  let randomWidth =
    Math.floor(Math.random() * (maxWidth + 1 - minWidth)) + minWidth;
  let randomHeight =
    Math.floor(Math.random() * (maxHeight + 1 - minHeight)) + minHeight;
  return "https://picsum.photos/" + randomWidth + "/" + randomHeight;
}

function getConstraints(className, kind) {
  return className
    .split(" ")
    .filter((x) => x.startsWith("hm-") && x != kind)
    .reduce((acc, c) => {
      acc[c.split("-")[1]] = c.split("-")[2];
      return acc;
    }, {});
}

function generateRandomList(min, max, list, childType, childClassName, childInnerHTML) {

  // get a random number of childs respecting the  given constraints
  let length = Math.floor(Math.random() * (max + 1 - min)) + min;
  console.log(length);

  //clear all childrens
  list.innerText = "";


  // let className = listClone.children[0].children[0].className;
  // let childType = className.split(" ")[0];
  // if (childType == "hm-list-text") {
  //   constraints = getConstraints(className, "hm-list-text");
  // } else if (childType == "hm-list-img") {
  //   constraints = getConstraints(className, "hm-list-img");
  // }

  // append  childs to the parent list
  for (let i = 0; i < length; i++) {
    child  = document.createElement(childType)
    child.className = childClassName
    child.innerHTML = childInnerHTML
    list.appendChild(child)
    // if (childType == "hm-list-text") {
    //   let child = listClone.children[0].children[0].cloneNode(true);
    //   child.innerText = generateRandomString(constraints);
    //   let li = document.createElement("li");
    //   li.appendChild(child);
    //   list.appendChild(li);
    // } else if (childType == "hm-list-img") {
    //   let child = listClone.children[0].children[0].cloneNode(true);
    //   child.src = getRandomImage(constraints);
    //   let li = document.createElement("li");
    //   li.appendChild(child);
    //   list.appendChild(li);
    // }
  }
}

// async function clonenode(classname) {
//   const list = document.querySelector(".hm-list");
//   const listClone = list.cloneNode(true);
//   return { list, listClone };
// }

classList.forEach(async function (kind) {
  document.querySelectorAll("." + kind).forEach(async function (el) {
    let constraints = getConstraints(el.className, kind);

    // Generate a random text / image source / list that respects the constraints but explores the
    // boundary conditions
    switch (kind) {
      case "hm-text":
        // Generate random text
        setInterval(function () {
          el.innerText = generateRandomString(constraints);
        }, INTERVAL_TIME);
        break;

      case "hm-img":
        // replace image with random images respecting the constraints
        setInterval(function () {
          el.src = getRandomImage(constraints);
        }, INTERVAL_TIME);
        break;

      case "hm-list":
        // get size constraints of the list
        let min = Math.ceil(Number(constraints["size"].split("__")[0]));
        let max = Math.floor(Number(constraints["size"].split("__")[1]));
        // random size respecting the given constraints
        console.log("here");

        // const { list, listClone } = await clonenode(".hm-list");
          const list = document.querySelector(".hm-list");
          const listClone = list.cloneNode(true);
          const childInnerHTML = listClone.children[0].innerHTML;
          const childType = listClone.children[0].nodeName.toLowerCase();
          const childClassName  = listClone.children[0].className;

        console.log("outside function: list ", list.children[0]);
        console.log("outside function: listclone ", listClone.children[0]);

        //generate random list
        setInterval(() => {
          //  setTimeout(()=>{
          generateRandomList(min, max, list, childType, childClassName, childInnerHTML);
        }, INTERVAL_TIME);

        break;

      default:
        console.log("Unknown HTML Mocker kind: " + kind);
    }
  });
});
