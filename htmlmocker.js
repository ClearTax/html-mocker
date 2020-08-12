console.log("script loaded")
["hm-text", "hm-img", "hm-list"].forEach(function(kind) {
    document.querySelectorAll("." + kind).forEach(function(el) {
    // collect the constraints specified in the class name into a dictionary
    let constraints = el.className.split(" ").filter(x => x.startsWith("hm-") && x != kind).reduce((acc,c) => {
      acc[c.split("-")[1]] = c.split("-")[2]; return acc },
      {}
    );
    // Constraints object would be like this: {size: "30__50"} or {size: "100x100__200x200"}

    setInterval(function(){
      // Generate a random text / image source / list that respects the constraints but explores the
      // boundary conditions
      switch(kind) {
        case "hm-text":
          // Generate random text
          // TODO: Respect the specified constraints.size etc
          let samples = ["", "small text", "text \n\n with whitespace chars\t\ngoes here", "username with 😀 in it"];
          el.innerText = samples[Math.floor(Math.random() * samples.length)];
          break;
        case "hm-img":
          let images = [
            "https://images.unsplash.com/photo-1593026238161-ac5f86e5ef79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", // width: 1950px
            "https://images.unsplash.com/photo-1593026238161-ac5f86e5ef79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=50&q=80", //width: 50px
            "https://images.unsplash.com/photo-1593026238161-ac5f86e5ef79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80" // width: 400px
            // TODO: Find images of more variety: 0px, 1px x 1px, portrait, landscape etc
          ];
          el.src = images[Math.floor(Math.random() * images.length)];
          break;
        case "hm-list":
          let list_sizes = [0, 1, 3, 10];
          Array.from(Array(list_sizes[Math.floor(Math.random() * list_sizes.length)])).forEach(function(){
            // TODO: Take the first child and clone it with their own content randomized
            // Not sure if this will involve recursion, as once the children are added to the dom,
            // the script could find those elements and randomize their content. That will take refactoring though.
          });
          break;
        default:
          console.log("Unknown HTML Mocker kind: " + kind);
      };
    }, 2000);
})});