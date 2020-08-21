console.log("script loaded");

let classList = ["hm-text","hm-img","hm-list"];

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
    Math.floor(Math.random() * (maxHeight + 1 - minHeight)) +
    minHeight;
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

function generateRandomList(length){
  let list = document.querySelector(".hm-list");
  let listClone = list.cloneNode(true);
  list.innerText = "";
  let className =  listClone.children[0].children[0].className;
  let childType = className.split(" ")[0];
  if (childType == "hm-list-text"){
    constraints = getConstraints(className, "hm-list-text");
  }
  else if(childType == "hm-list-img"){
    constraints = getConstraints(className, "hm-list-img");
  }

  // generae new list of given length and random childs
  for (let i = 0; i < length; i++) {
    if (childType == "hm-list-text"){
      let child = listClone.children[0].children[0].cloneNode(true);
      child.innerText = generateRandomString(constraints);
      let li = document.createElement("li");
      li.appendChild(child);
      list.appendChild(li);
    }
    else if(childType == "hm-list-img"){
      let child = listClone.children[0].children[0].cloneNode(true);
      child.src = getRandomImage(constraints);
      let li = document.createElement("li");
      li.appendChild(child);
      list.appendChild(li);
    }
  }
}



classList.forEach(function (kind) {
  document.querySelectorAll("." + kind).forEach(function (el) {
    let constraints = getConstraints(el.className, kind);

    setInterval(function () {
      // Generate a random text / image source / list that respects the constraints but explores the
      // boundary conditions
      switch (kind) {
        case "hm-text":
          // Generate random text
          el.innerText = generateRandomString(constraints);
          break;

        case "hm-img":
          // replace image with random images respecting the constraints
          el.src = getRandomImage(constraints);
          break;

        case "hm-list":
          // get size constraints of the list
          let min = Math.ceil(Number(constraints["size"].split("__")[0]));
          let max = Math.floor(Number(constraints["size"].split("__")[1]));
          // random size respecting the given constraints
          let length = Math.floor(Math.random() * (max + 1 - min)) + min;
          
          //generate random list
          generateRandomList(length);
          break;

        default:
          console.log("Unknown HTML Mocker kind: " + kind);
      }
    }, 6000);
  });
});
