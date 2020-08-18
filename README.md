This is an idea for mocking HTML data that lets you test whether your layout breaks on any screen size for any
unexpected dynamic data.

This script scans the document for class names with a specific pattern and periodically randomizes the content
of those elements while meeting the constraints specified in the class name. This can let you quickly test
whether your layout breaks for any dynamic content that you may not have thought about. This should ideally be used
with a responsive design testing tool such as DevTools or Sizzy/Bizzy.

For eg, if your HTML is this:
```
<h1 class="hm-text hm-size-30__90">article headline</h1>
```
Then, this script will find this tag, and periodically replace the innerText of h1 with random strings which are
anywhere between the minimum length 30 and maximum length 90. Similiarily, constraints on image sizes,
video sizes, # of children elements in a list etc. For a list, mock children elements will be generated

Some examples of the constraints are:
- size-30__50 (from 30 to 50 chars)
- size-\_\_50 (up to 50 chars)
- size-50__ (from 50 to anysize)
- size-45 (exactly 45 chars)
- size-"50x50__500x500" (50px x 50px to 600px x 600px)
- size-3__7 (list size from minimum 3 to maximum 7)

Ideas for more constraints: 
- Allowed characters (such as whitespace or emojis)
- Image's aspect ratio
- Video sizes, formats
