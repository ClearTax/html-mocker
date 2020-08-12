/* 
This is an idea for mocking HTML data that lets you test whether your layout breaks on any screen size for any
unexpected dynamic data.
This script scans the document for class names with a specific pattern and periodically randomizes the content
of those elements while meeting the constraints specified in the class name. This can let you quickly test
whether your layout breaks for any dynamic content that you may not have thought about. This should ideally be used
with a responsive design testing tool such as DevTools or Sizzy/Bizzy.
For eg, if your HTML is this:
<h1 class="hm-text hm-size-30__90">article headline</h1>
Then, this script will find this tag, and periodically replace the innerText of h1 with random strings which are
anywhere between the minimum length 30 and maximum length 90. Similiarily, constraints on image sizes,
video sizes, # of children elements in a list etc. For a list, mock children elements will be generated
respecting their own constraints.
Some examples of the constraints are:
size-30__50 (from 30 to 50 chars)
size-__50 (up to 50 chars)
size-50__ (from 50 to anysize)
size-45 (exactly 45 chars)
size-"50x50__500x500" (50px x 50px to 600px x 600px)
size-3__7 (list size from minimum 3 to maximum 7)
Ideas for more constraints: 
- Allowed characters (such as whitespace or emojis)
- Image's aspect ratio
- Video sizes, formats
*/

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