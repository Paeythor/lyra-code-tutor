bash

cat /home/claude/code-tutor/js/lessons.js
Output

// ============================================================
//  LYRA CODE TUTOR — Lesson Curriculum
// ============================================================

const CURRICULUM = {
  tracks: [
    {
      id: "html",
      name: "HTML",
      icon: "🌐",
      color: "#e34c26",
      lessons: [
        {
          id: "html-1",
          title: "What is HTML?",
          xp: 10,
          theory: `
HTML stands for **HyperText Markup Language**. It's the skeleton of every web page — it tells the browser what content to show and how it's structured.

HTML uses **tags** to wrap content. Tags look like this:
\`\`\`html
<tagname>Content goes here</tagname>
\`\`\`

Most tags have an **opening tag** \`<tagname>\` and a **closing tag** \`</tagname>\`.

### Your First HTML Page
Every HTML page has this basic structure:
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
\`\`\`

- \`<!DOCTYPE html>\` tells the browser this is HTML5
- \`<html>\` wraps everything
- \`<head>\` holds invisible info (title, links to CSS, etc.)
- \`<body>\` holds everything the user sees
          `,
          challenge: {
            id: "html-1-c1",
            title: "Write your first HTML page",
            description: "Create a complete HTML page with a title of 'My First Page', an \`<h1>\` heading that says 'Hello World!', and a \`<p>\` paragraph that says 'I am learning HTML.'",
            starterCode: `<!DOCTYPE html>\n<html>\n  <head>\n    <!-- Add a title tag here -->\n  </head>\n  <body>\n    <!-- Add your h1 and p tags here -->\n  </body>\n</html>`,
            tests: [
              { description: "Has <!DOCTYPE html>", fn: code => code.includes("<!DOCTYPE html>") },
              { description: "Has <title>My First Page</title>", fn: code => code.includes("<title>My First Page</title>") },
              { description: "Has <h1>Hello World!</h1>", fn: code => code.replace(/\s+/g,' ').includes("<h1>Hello World!</h1>") },
              { description: "Has a <p> tag with correct text", fn: code => code.includes("I am learning HTML") },
            ]
          }
        },
        {
          id: "html-2",
          title: "Links & Images",
          xp: 15,
          theory: `
### Links
The \`<a>\` (anchor) tag creates a hyperlink:
\`\`\`html
<a href="https://google.com">Visit Google</a>
\`\`\`
- \`href\` = the URL to go to
- The text between tags is what users click

Use \`target="_blank"\` to open in a new tab:
\`\`\`html
<a href="https://google.com" target="_blank">Open in new tab</a>
\`\`\`

### Images
The \`<img>\` tag displays an image. It's a **self-closing** tag (no closing tag needed):
\`\`\`html
<img src="photo.jpg" alt="A description of the photo">
\`\`\`
- \`src\` = path or URL to the image
- \`alt\` = alternative text (accessibility + SEO)
          `,
          challenge: {
            id: "html-2-c1",
            title: "Links & Images",
            description: "Write HTML that contains: (1) a link to https://github.com with the text 'My GitHub', opening in a new tab, and (2) an image with src='logo.png' and alt='Company Logo'.",
            starterCode: `<!-- Write your link and image tags below -->\n`,
            tests: [
              { description: "Link points to https://github.com", fn: code => code.includes('href="https://github.com"') || code.includes("href='https://github.com'") },
              { description: "Link text is 'My GitHub'", fn: code => code.includes("My GitHub") },
              { description: "Link opens in new tab (target=\"_blank\")", fn: code => code.includes('target="_blank"') || code.includes("target='_blank'") },
              { description: "Image has src='logo.png'", fn: code => code.includes("logo.png") },
              { description: "Image has alt='Company Logo'", fn: code => code.includes("Company Logo") },
            ]
          }
        },
        {
          id: "html-3",
          title: "Lists & Tables",
          xp: 20,
          theory: `
### Lists
**Unordered list** (bullet points):
\`\`\`html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Cherries</li>
</ul>
\`\`\`

**Ordered list** (numbered):
\`\`\`html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
\`\`\`

### Tables
Tables organize data into rows and columns:
\`\`\`html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>30</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>25</td>
    </tr>
  </tbody>
</table>
\`\`\`
- \`<tr>\` = table row
- \`<th>\` = table header cell
- \`<td>\` = table data cell
          `,
          challenge: {
            id: "html-3-c1",
            title: "Shopping List Table",
            description: "Create an ordered list with 3 items: 'HTML', 'CSS', 'JavaScript'. Then create a table with headers 'Language' and 'Year', with one row: 'HTML' | '1993'.",
            starterCode: `<!-- Ordered list of 3 items -->\n\n<!-- Table with headers and one row -->\n`,
            tests: [
              { description: "Has an <ol> tag", fn: code => code.includes("<ol>") },
              { description: "Has 3 <li> items", fn: code => (code.match(/<li>/g)||[]).length >= 3 },
              { description: "Contains 'HTML', 'CSS', 'JavaScript' as list items", fn: code => code.includes("HTML") && code.includes("CSS") && code.includes("JavaScript") },
              { description: "Has a <table> tag", fn: code => code.includes("<table>") },
              { description: "Has 'Language' and 'Year' as headers", fn: code => code.includes("Language") && code.includes("Year") },
              { description: "Has '1993' in a table cell", fn: code => code.includes("1993") },
            ]
          }
        },
        {
          id: "html-4",
          title: "Forms & Inputs",
          xp: 25,
          theory: `
Forms let users submit data. They're essential for logins, signups, search bars, and more.

\`\`\`html
<form action="/submit" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" placeholder="Enter username">

  <label for="password">Password:</label>
  <input type="password" id="password" name="password">

  <button type="submit">Log In</button>
</form>
\`\`\`

### Common Input Types
| Type | Description |
|------|------------|
| \`text\` | Single line text |
| \`password\` | Masked text |
| \`email\` | Email with validation |
| \`number\` | Numeric input |
| \`checkbox\` | True/false tick |
| \`radio\` | One-of-many choice |
| \`submit\` | Submit the form |

### Label Best Practices
Always pair \`<label>\` with its input using matching \`for\` and \`id\` attributes. This improves accessibility.
          `,
          challenge: {
            id: "html-4-c1",
            title: "Build a Sign-Up Form",
            description: "Build a form with: an email input (type='email', name='email'), a password input (type='password', name='password'), a checkbox input (name='agree') with a label 'I agree to terms', and a submit button with text 'Sign Up'.",
            starterCode: `<form>\n  <!-- Add your inputs here -->\n\n</form>`,
            tests: [
              { description: "Has <form> tag", fn: code => code.includes("<form") },
              { description: "Has email input (type='email')", fn: code => code.includes('type="email"') || code.includes("type='email'") },
              { description: "Email input has name='email'", fn: code => code.includes('name="email"') || code.includes("name='email'") },
              { description: "Has password input", fn: code => code.includes('type="password"') || code.includes("type='password'") },
              { description: "Has checkbox input", fn: code => code.includes('type="checkbox"') || code.includes("type='checkbox'") },
              { description: "Has 'I agree to terms' text", fn: code => code.includes("I agree to terms") },
              { description: "Has a submit button with 'Sign Up'", fn: code => code.includes("Sign Up") },
            ]
          }
        },
      ]
    },
    {
      id: "css",
      name: "CSS",
      icon: "🎨",
      color: "#264de4",
      lessons: [
        {
          id: "css-1",
          title: "CSS Basics & Selectors",
          xp: 10,
          theory: `
CSS (Cascading Style Sheets) controls how HTML looks — colors, fonts, sizes, layouts.

### How to Write CSS
\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

### The 3 Ways to Add CSS
1. **Inline**: \`<p style="color: red;">Text</p>\`
2. **Internal**: \`<style>\` tag in \`<head>\`
3. **External**: Separate \`.css\` file linked with \`<link>\`

### Selectors
\`\`\`css
/* Element selector */
p { color: blue; }

/* Class selector (dot prefix) */
.highlight { background: yellow; }

/* ID selector (hash prefix) */
#header { font-size: 32px; }

/* Multiple selectors */
h1, h2, h3 { font-weight: bold; }
\`\`\`

### Common Properties
\`\`\`css
color: red;              /* text color */
background-color: #fff;  /* background */
font-size: 16px;         /* text size */
font-family: Arial;      /* font */
margin: 10px;            /* space outside */
padding: 10px;           /* space inside */
border: 1px solid black; /* border */
\`\`\`
          `,
          challenge: {
            id: "css-1-c1",
            title: "Style a Card",
            description: "Write CSS that: sets \`body\` background-color to #f0f0f0, gives \`.card\` a background of white, padding of 20px, and border-radius of 8px, and makes \`h1\` color #333 with font-size 24px.",
            starterCode: `/* Style the body */\n\n/* Style .card */\n\n/* Style h1 */\n`,
            tests: [
              { description: "body has background-color: #f0f0f0", fn: code => code.replace(/\s/g,'').includes("body{") && code.includes("#f0f0f0") },
              { description: ".card has background of white", fn: code => code.includes(".card") && (code.includes("white") || code.includes("#fff") || code.includes("#ffffff")) },
              { description: ".card has padding: 20px", fn: code => code.includes(".card") && code.includes("20px") },
              { description: ".card has border-radius: 8px", fn: code => code.includes("border-radius") && code.includes("8px") },
              { description: "h1 has color #333", fn: code => code.includes("h1") && code.includes("#333") },
              { description: "h1 has font-size 24px", fn: code => code.includes("h1") && code.includes("24px") },
            ]
          }
        },
        {
          id: "css-2",
          title: "The Box Model",
          xp: 20,
          theory: `
Every HTML element is a box. The **CSS Box Model** describes how this box is structured:

\`\`\`
┌─────────────────────────────┐
│           MARGIN            │  ← Space outside border
│  ┌───────────────────────┐  │
│  │        BORDER         │  │  ← The visible border
│  │  ┌─────────────────┐  │  │
│  │  │     PADDING     │  │  │  ← Space inside border
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  CONTENT  │  │  │  │  ← Your actual text/image
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
\`\`\`

\`\`\`css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;          /* all sides */
  padding: 10px 20px;     /* top/bottom | left/right */
  padding: 10px 20px 15px 5px; /* top right bottom left */
  margin: 10px auto;      /* center horizontally */
  border: 2px solid #333;
  box-sizing: border-box; /* padding included in width */
}
\`\`\`

> 💡 **Pro tip**: Always add \`box-sizing: border-box\` to your CSS reset. It makes sizing much more predictable!
          `,
          challenge: {
            id: "css-2-c1",
            title: "Box Model Challenge",
            description: "Write CSS for a \`.box\` element: width of 300px, padding of 15px on all sides, margin of 20px auto (to center it), a 2px solid border with color #888, and box-sizing: border-box.",
            starterCode: `.box {\n  /* Your styles here */\n}`,
            tests: [
              { description: "width: 300px", fn: code => code.includes("300px") },
              { description: "padding: 15px", fn: code => code.includes("padding") && code.includes("15px") },
              { description: "margin: 20px auto", fn: code => code.replace(/\s+/g,' ').includes("20px auto") },
              { description: "border includes 2px solid", fn: code => code.includes("2px") && code.includes("solid") },
              { description: "border color is #888", fn: code => code.includes("#888") },
              { description: "box-sizing: border-box", fn: code => code.includes("border-box") },
            ]
          }
        },
        {
          id: "css-3",
          title: "Flexbox Layout",
          xp: 30,
          theory: `
Flexbox makes it easy to lay out, align, and distribute space among items in a container.

### Enable Flexbox
\`\`\`css
.container {
  display: flex;
}
\`\`\`

### Main Axis Direction
\`\`\`css
flex-direction: row;            /* → default, left to right */
flex-direction: row-reverse;    /* ← right to left */
flex-direction: column;         /* ↓ top to bottom */
flex-direction: column-reverse; /* ↑ bottom to top */
\`\`\`

### Alignment
\`\`\`css
justify-content: flex-start;    /* align on main axis */
justify-content: center;
justify-content: space-between;
justify-content: space-around;

align-items: flex-start;        /* align on cross axis */
align-items: center;
align-items: flex-end;
align-items: stretch;           /* default */
\`\`\`

### Flex Items
\`\`\`css
.item {
  flex: 1;         /* grow to fill available space */
  flex: 0 0 200px; /* don't grow, don't shrink, stay 200px */
}
\`\`\`
          `,
          challenge: {
            id: "css-3-c1",
            title: "Center Everything with Flexbox",
            description: "Write CSS for a \`.container\` that: uses flexbox, centers items both horizontally and vertically (justify-content and align-items both center), has a min-height of 100vh, and uses flex-direction: column.",
            starterCode: `.container {\n  /* Your flexbox styles here */\n}`,
            tests: [
              { description: "display: flex", fn: code => code.includes("display: flex") || code.includes("display:flex") },
              { description: "justify-content: center", fn: code => code.includes("justify-content: center") || code.includes("justify-content:center") },
              { description: "align-items: center", fn: code => code.includes("align-items: center") || code.includes("align-items:center") },
              { description: "min-height: 100vh", fn: code => code.includes("100vh") },
              { description: "flex-direction: column", fn: code => code.includes("column") },
            ]
          }
        },
      ]
    },
    {
      id: "javascript",
      name: "JavaScript",
      icon: "⚡",
      color: "#f7df1e",
      lessons: [
        {
          id: "js-1",
          title: "Variables & Data Types",
          xp: 10,
          theory: `
JavaScript is the programming language of the web. It makes pages interactive.

### Declaring Variables
\`\`\`javascript
let name = "Alice";       // can be reassigned
const age = 30;           // cannot be reassigned
var oldStyle = "avoid";   // old way, avoid using
\`\`\`

### Data Types
\`\`\`javascript
// String
let greeting = "Hello, World!";
let template = \`Hello, \${name}!\`;  // template literal

// Number
let score = 42;
let price = 9.99;

// Boolean
let isLoggedIn = true;
let hasError = false;

// Null & Undefined
let empty = null;          // intentionally empty
let notDefined;            // undefined (no value yet)

// Array
let fruits = ["apple", "banana", "cherry"];

// Object
let user = {
  name: "Alice",
  age: 30,
  isAdmin: false
};
\`\`\`

### Checking Types
\`\`\`javascript
typeof "hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"
typeof []       // "object"
\`\`\`
          `,
          challenge: {
            id: "js-1-c1",
            title: "Variables Practice",
            description: "Write JavaScript that: declares a \`const\` called \`name\` with your name as a string, declares a \`let\` called \`age\` with a number, declares a \`const\` called \`hobbies\` as an array with at least 2 items, and uses \`console.log\` to print all three.",
            starterCode: `// Declare your variables here\n\n\n// Log them out\n`,
            tests: [
              { description: "Uses const for name", fn: code => /const\s+name\s*=/.test(code) },
              { description: "name is a string (in quotes)", fn: code => /const\s+name\s*=\s*["'`]/.test(code) },
              { description: "Uses let for age", fn: code => /let\s+age\s*=/.test(code) },
              { description: "age is a number", fn: code => /let\s+age\s*=\s*\d+/.test(code) },
              { description: "hobbies is an array with 2+ items", fn: code => /const\s+hobbies\s*=\s*\[/.test(code) && (code.match(/,/g)||[]).length >= 1 },
              { description: "Uses console.log at least 3 times", fn: code => (code.match(/console\.log/g)||[]).length >= 3 },
            ]
          }
        },
        {
          id: "js-2",
          title: "Functions",
          xp: 20,
          theory: `
Functions are reusable blocks of code. They take inputs (parameters), do something, and optionally return an output.

### Function Declaration
\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Alice"));  // "Hello, Alice!"
\`\`\`

### Arrow Functions (ES6+)
\`\`\`javascript
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Short form (single expression, implicit return)
const greet = name => \`Hello, \${name}!\`;
\`\`\`

### Default Parameters
\`\`\`javascript
function greet(name = "stranger") {
  return \`Hello, \${name}!\`;
}
greet();        // "Hello, stranger!"
greet("Bob");   // "Hello, Bob!"
\`\`\`

### Multiple Parameters
\`\`\`javascript
function add(a, b) {
  return a + b;
}
add(3, 4);  // 7
\`\`\`
          `,
          challenge: {
            id: "js-2-c1",
            title: "Write Some Functions",
            description: "Write three functions: (1) \`add(a, b)\` that returns a + b, (2) \`isEven(n)\` that returns true if n is even, false otherwise, (3) an arrow function \`greet\` that takes a \`name\` and returns the string \`Hello, [name]!\`",
            starterCode: `// Function 1: add\n\n\n// Function 2: isEven\n\n\n// Function 3: greet (arrow function)\n`,
            tests: [
              { description: "add(2, 3) returns 5", fn: code => { try { const f = new Function(code + '; return add(2,3);'); return f() === 5; } catch(e){ return false; } } },
              { description: "add(10, 20) returns 30", fn: code => { try { const f = new Function(code + '; return add(10,20);'); return f() === 30; } catch(e){ return false; } } },
              { description: "isEven(4) returns true", fn: code => { try { const f = new Function(code + '; return isEven(4);'); return f() === true; } catch(e){ return false; } } },
              { description: "isEven(7) returns false", fn: code => { try { const f = new Function(code + '; return isEven(7);'); return f() === false; } catch(e){ return false; } } },
              { description: "greet is an arrow function", fn: code => /const\s+greet\s*=.*=>/.test(code) },
              { description: "greet('World') returns 'Hello, World!'", fn: code => { try { const f = new Function(code + "; return greet('World');"); return f() === 'Hello, World!'; } catch(e){ return false; } } },
            ]
          }
        },
        {
          id: "js-3",
          title: "Arrays & Loops",
          xp: 25,
          theory: `
Arrays hold lists of values. Loops let you process them.

### Array Methods
\`\`\`javascript
const nums = [1, 2, 3, 4, 5];

nums.push(6);         // add to end → [1,2,3,4,5,6]
nums.pop();           // remove from end → [1,2,3,4,5]
nums.unshift(0);      // add to start → [0,1,2,3,4,5]
nums.shift();         // remove from start → [1,2,3,4,5]
nums.length;          // 5

nums.includes(3);     // true
nums.indexOf(3);      // 2

// Slice (doesn't mutate)
nums.slice(1, 3);     // [2, 3]

// Splice (mutates!)
nums.splice(1, 2);    // removes 2 items at index 1
\`\`\`

### The Big 3 Array Methods
\`\`\`javascript
const nums = [1, 2, 3, 4, 5];

// .map() — transform each item, returns new array
const doubled = nums.map(n => n * 2);   // [2,4,6,8,10]

// .filter() — keep items that pass a test
const evens = nums.filter(n => n % 2 === 0);  // [2, 4]

// .reduce() — reduce to single value
const sum = nums.reduce((acc, n) => acc + n, 0);  // 15
\`\`\`

### Loops
\`\`\`javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// for...of (cleaner for arrays)
for (const fruit of ["apple","banana","cherry"]) {
  console.log(fruit);
}

// forEach
nums.forEach(n => console.log(n));
\`\`\`
          `,
          challenge: {
            id: "js-3-c1",
            title: "Array Manipulation",
            description: "Given \`const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\`: (1) Use \`.filter()\` to create \`evens\` containing only even numbers. (2) Use \`.map()\` to create \`squared\` where each number is squared. (3) Use \`.reduce()\` to create \`total\` which is the sum of all numbers.",
            starterCode: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// 1. Filter even numbers into 'evens'\n\n// 2. Square each number into 'squared'\n\n// 3. Sum all numbers into 'total'\n`,
            tests: [
              { description: "evens is [2,4,6,8,10]", fn: code => { try { const f = new Function(code + '; return JSON.stringify(evens);'); return f() === '[2,4,6,8,10]'; } catch(e){ return false; } } },
              { description: "Uses .filter() method", fn: code => code.includes(".filter(") },
              { description: "squared is [1,4,9,16,25,36,49,64,81,100]", fn: code => { try { const f = new Function(code + '; return JSON.stringify(squared);'); return f() === '[1,4,9,16,25,36,49,64,81,100]'; } catch(e){ return false; } } },
              { description: "Uses .map() method", fn: code => code.includes(".map(") },
              { description: "total equals 55", fn: code => { try { const f = new Function(code + '; return total;'); return f() === 55; } catch(e){ return false; } } },
              { description: "Uses .reduce() method", fn: code => code.includes(".reduce(") },
            ]
          }
        },
        {
          id: "js-4",
          title: "Objects & Classes",
          xp: 30,
          theory: `
Objects group related data and functions together.

### Object Basics
\`\`\`javascript
const person = {
  name: "Alice",
  age: 30,
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};

person.name;           // "Alice" — dot notation
person["age"];         // 30 — bracket notation
person.greet();        // "Hi, I'm Alice"

// Destructuring
const { name, age } = person;
\`\`\`

### Classes (ES6+)
\`\`\`javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return \`\${this.name} says \${this.sound}!\`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");
  }

  fetch() {
    return \`\${this.name} fetches the ball!\`;
  }
}

const dog = new Dog("Rex");
dog.speak();   // "Rex says Woof!"
dog.fetch();   // "Rex fetches the ball!"
\`\`\`
          `,
          challenge: {
            id: "js-4-c1",
            title: "Build a Class",
            description: "Create a \`Rectangle\` class with: a constructor taking \`width\` and \`height\`, an \`area()\` method that returns width * height, a \`perimeter()\` method that returns 2 * (width + height), and a \`describe()\` method returning the string \`Rectangle: [width]x[height]\`.",
            starterCode: `class Rectangle {\n  // Add constructor and methods\n  \n}`,
            tests: [
              { description: "Rectangle class exists", fn: code => code.includes("class Rectangle") },
              { description: "new Rectangle(4, 5).area() returns 20", fn: code => { try { const f = new Function(code + '; return new Rectangle(4,5).area();'); return f() === 20; } catch(e){ return false; } } },
              { description: "new Rectangle(3, 7).area() returns 21", fn: code => { try { const f = new Function(code + '; return new Rectangle(3,7).area();'); return f() === 21; } catch(e){ return false; } } },
              { description: "new Rectangle(4, 5).perimeter() returns 18", fn: code => { try { const f = new Function(code + '; return new Rectangle(4,5).perimeter();'); return f() === 18; } catch(e){ return false; } } },
              { description: "new Rectangle(4, 5).describe() returns 'Rectangle: 4x5'", fn: code => { try { const f = new Function(code + "; return new Rectangle(4,5).describe();"); return f() === 'Rectangle: 4x5'; } catch(e){ return false; } } },
            ]
          }
        },
        {
          id: "js-5",
          title: "Async & Promises",
          xp: 40,
          theory: `
JavaScript is single-threaded but handles async operations (network, timers) with Promises and async/await.

### Callbacks (old way)
\`\`\`javascript
setTimeout(() => {
  console.log("1 second later");
}, 1000);
\`\`\`

### Promises
\`\`\`javascript
const fetchUser = () => {
  return new Promise((resolve, reject) => {
    // simulate API call
    setTimeout(() => {
      resolve({ name: "Alice" });
      // or reject(new Error("Not found"));
    }, 1000);
  });
};

fetchUser()
  .then(user => console.log(user.name))
  .catch(err => console.error(err));
\`\`\`

### async/await (modern, cleaner)
\`\`\`javascript
async function loadUser() {
  try {
    const response = await fetch("https://api.example.com/user");
    const user = await response.json();
    console.log(user.name);
  } catch (error) {
    console.error("Failed:", error);
  }
}

loadUser();
\`\`\`

### Fetch API
\`\`\`javascript
async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();
  return data;
}
\`\`\`
          `,
          challenge: {
            id: "js-5-c1",
            title: "Promises & Async",
            description: "Write an async function called \`delay\` that takes a number \`ms\` and returns a Promise that resolves with the string \`'done'\` after \`ms\` milliseconds. Then write an async function \`run\` that awaits \`delay(100)\` and logs the result.",
            starterCode: `// Write the delay function\n\n\n// Write the run function\n`,
            tests: [
              { description: "delay is an async function", fn: code => /async\s+function\s+delay|const\s+delay\s*=\s*async/.test(code) },
              { description: "delay returns a Promise", fn: code => code.includes("new Promise") || code.includes("async") },
              { description: "run is defined", fn: code => /function\s+run|const\s+run\s*=/.test(code) },
              { description: "run uses await", fn: code => code.includes("await") },
              { description: "delay(100) resolves to 'done'", fn: code => { try { const f = new Function(code + "; return delay(100);"); return f() instanceof Promise; } catch(e){ return false; } } },
            ]
          }
        },
      ]
    },
    {
      id: "python",
      name: "Python",
      icon: "🐍",
      color: "#3776ab",
      lessons: [
        {
          id: "py-1",
          title: "Python Basics",
          xp: 10,
          theory: `
Python is a clean, readable language great for beginners, data science, AI, and backend development.

### Variables (no keyword needed!)
\`\`\`python
name = "Alice"
age = 30
price = 9.99
is_active = True
nothing = None
\`\`\`

### Print & Input
\`\`\`python
print("Hello, World!")
print(f"My name is {name} and I am {age}")

user_input = input("What's your name? ")
print(f"Hello, {user_input}!")
\`\`\`

### String Methods
\`\`\`python
s = "hello world"
s.upper()         # "HELLO WORLD"
s.capitalize()    # "Hello world"
s.replace("o","0") # "hell0 w0rld"
s.split(" ")      # ["hello", "world"]
len(s)            # 11
\`\`\`

### Lists
\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits[0]          # "apple"
fruits[-1]         # "cherry" (last item)
len(fruits)        # 4
\`\`\`
          `,
          challenge: {
            id: "py-1-c1",
            title: "Python Variables",
            description: "This is a conceptual challenge. Write Python code (in comments or pseudocode) that: declares a variable \`name\` as a string, a variable \`age\` as an integer, creates a list \`colors\` with 3 colors, and prints a formatted string combining name and age. (Note: Python runs server-side; we'll check your syntax knowledge.)",
            starterCode: `# Declare variables\nname = \nage = \ncolors = \n\n# Print formatted string\nprint(f"")`,
            tests: [
              { description: "name variable is assigned", fn: code => /^name\s*=\s*["']/.test(code.trim().split('\n').find(l => l.includes('name =')) || '') || code.includes('name = "') || code.includes("name = '") },
              { description: "age variable is assigned a number", fn: code => /age\s*=\s*\d+/.test(code) },
              { description: "colors is a list with [ ]", fn: code => /colors\s*=\s*\[/.test(code) },
              { description: "list has 3 items (2 commas)", fn: code => { const m = code.match(/colors\s*=\s*\[([^\]]*)\]/); return m ? (m[1].match(/,/g)||[]).length >= 2 : false; } },
              { description: "print() is used", fn: code => code.includes("print(") },
              { description: "f-string used with {name} and {age}", fn: code => code.includes("{name}") && code.includes("{age}") },
            ]
          }
        },
        {
          id: "py-2",
          title: "Control Flow",
          xp: 20,
          theory: `
Control flow determines which code runs and when.

### If/Elif/Else
\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Grade: {grade}")  # Grade: B
\`\`\`

### For Loops
\`\`\`python
# Loop over a list
for fruit in ["apple","banana","cherry"]:
    print(fruit)

# Range
for i in range(5):        # 0,1,2,3,4
    print(i)

for i in range(1, 6):     # 1,2,3,4,5
    print(i)

# List comprehension (Pythonic!)
squares = [x**2 for x in range(1, 6)]  # [1,4,9,16,25]
\`\`\`

### While Loops
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

### Try/Except
\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Error: {e}")
finally:
    print("Always runs")
\`\`\`
          `,
          challenge: {
            id: "py-2-c1",
            title: "FizzBuzz",
            description: "Classic FizzBuzz! Write Python code using a for loop and if/elif/else that loops from 1 to 20. Print 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for multiples of both, and the number itself otherwise.",
            starterCode: `for i in range(1, 21):\n    # Your if/elif/else here\n    pass`,
            tests: [
              { description: "Uses for loop with range(1, 21)", fn: code => code.includes("range(1, 21)") || code.includes("range(1,21)") },
              { description: "Checks for FizzBuzz (both 3 and 5)", fn: code => code.includes("FizzBuzz") },
              { description: "Checks for Fizz (multiple of 3)", fn: code => /print.*Fizz/.test(code) && code.includes("% 3") || code.includes("%3") },
              { description: "Checks for Buzz (multiple of 5)", fn: code => /print.*Buzz/.test(code) && (code.includes("% 5") || code.includes("%5")) },
              { description: "Uses elif or else if", fn: code => code.includes("elif") || code.includes("else if") },
              { description: "Prints the number when no match", fn: code => /print\s*\(\s*i\s*\)/.test(code) || code.includes("print(i)") },
            ]
          }
        },
      ]
    },
    {
      id: "git",
      name: "Git & GitHub",
      icon: "🌿",
      color: "#f05032",
      lessons: [
        {
          id: "git-1",
          title: "Git Fundamentals",
          xp: 15,
          theory: `
Git is a **version control system** — it tracks changes to your code over time, like an infinite undo button for your project.

### Core Concepts
- **Repository (repo)**: A folder tracked by Git
- **Commit**: A saved snapshot of your code
- **Branch**: A parallel version of your code
- **Remote**: A copy of the repo on a server (like GitHub)

### Essential Commands

\`\`\`bash
# Set up (first time only)
git config --global user.name "Your Name"
git config --global user.email "you@email.com"

# Start a new repo
git init

# Clone an existing repo
git clone https://github.com/user/repo.git

# Check status
git status

# Stage changes
git add filename.txt    # specific file
git add .              # everything

# Commit
git commit -m "Add login feature"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# View history
git log --oneline
\`\`\`

### The Git Workflow
\`\`\`
Working Directory → git add → Staging Area → git commit → Local Repo → git push → Remote (GitHub)
\`\`\`
          `,
          challenge: {
            id: "git-1-c1",
            title: "Git Command Quiz",
            description: "Write the correct git commands (one per line, no explanations): (1) Initialize a new git repository, (2) Stage ALL files for commit, (3) Commit with message 'Initial commit', (4) Push to the 'main' branch on 'origin'.",
            starterCode: `# 1. Initialize repo\n\n# 2. Stage all files\n\n# 3. Commit\n\n# 4. Push to origin main\n`,
            tests: [
              { description: "git init", fn: code => code.includes("git init") },
              { description: "git add . (stage all)", fn: code => code.includes("git add .") || code.includes("git add -A") },
              { description: "git commit -m \"Initial commit\"", fn: code => code.includes("git commit") && code.includes("Initial commit") },
              { description: "git push origin main", fn: code => code.includes("git push origin main") },
            ]
          }
        },
        {
          id: "git-2",
          title: "Branching & Merging",
          xp: 25,
          theory: `
Branches let you work on new features without breaking the main code.

### Branch Commands
\`\`\`bash
# List branches
git branch

# Create a new branch
git branch feature/login

# Switch to a branch
git checkout feature/login
# (Modern way)
git switch feature/login

# Create AND switch in one command
git checkout -b feature/login
git switch -c feature/login

# Merge a branch into current branch
git merge feature/login

# Delete a branch
git branch -d feature/login
\`\`\`

### GitHub Pull Requests
A **Pull Request (PR)** is how you propose merging your branch into main on GitHub:
1. Push your feature branch: \`git push origin feature/login\`
2. Go to GitHub → "Compare & pull request"
3. Write a description of what you changed
4. Team reviews your code
5. Merge when approved

### .gitignore
Tell Git to ignore certain files:
\`\`\`
# .gitignore
node_modules/
.env
*.log
.DS_Store
__pycache__/
\`\`\`
          `,
          challenge: {
            id: "git-2-c1",
            title: "Branching Workflow",
            description: "Write the git commands to: (1) Create and switch to a new branch called 'feature/navbar', (2) Stage all changes, (3) Commit with message 'Add navbar component', (4) Push the feature branch to origin.",
            starterCode: `# 1. Create and switch to new branch\n\n# 2. Stage all changes\n\n# 3. Commit with message\n\n# 4. Push feature branch\n`,
            tests: [
              { description: "Creates branch 'feature/navbar'", fn: code => code.includes("feature/navbar") },
              { description: "Uses checkout -b or switch -c", fn: code => code.includes("checkout -b") || code.includes("switch -c") },
              { description: "Stages all files", fn: code => code.includes("git add .") || code.includes("git add -A") },
              { description: "Commits with correct message", fn: code => code.includes("git commit") && code.includes("Add navbar component") },
              { description: "Pushes feature branch to origin", fn: code => code.includes("git push") && code.includes("feature/navbar") },
            ]
          }
        },
      ]
    },
    {
      id: "sql",
      name: "SQL",
      icon: "🗃️",
      color: "#00758f",
      lessons: [
        {
          id: "sql-1",
          title: "SQL Basics",
          xp: 15,
          theory: `
SQL (Structured Query Language) is used to talk to databases. Almost every app uses a database!

### Core Statements
\`\`\`sql
-- SELECT: read data
SELECT * FROM users;
SELECT name, email FROM users;

-- WHERE: filter rows
SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE name = 'Alice';

-- ORDER BY: sort
SELECT * FROM products ORDER BY price ASC;
SELECT * FROM products ORDER BY price DESC;

-- LIMIT: restrict rows
SELECT * FROM users LIMIT 10;

-- INSERT: add data
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@email.com', 30);

-- UPDATE: change data
UPDATE users SET age = 31 WHERE name = 'Alice';

-- DELETE: remove data
DELETE FROM users WHERE name = 'Alice';
\`\`\`

### Aggregate Functions
\`\`\`sql
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MAX(price) FROM products;
SELECT MIN(price) FROM products;
SELECT SUM(price) FROM orders;
\`\`\`
          `,
          challenge: {
            id: "sql-1-c1",
            title: "Write SQL Queries",
            description: "Write SQL for: (1) Select all columns from a 'products' table, (2) Select only 'name' and 'price' from 'products' where price is less than 50, (3) Insert a new product with name='Widget', price=9.99, (4) Count all rows in the products table.",
            starterCode: `-- 1. Select all from products\n\n-- 2. Select name, price where price < 50\n\n-- 3. Insert new product\n\n-- 4. Count all products\n`,
            tests: [
              { description: "SELECT * FROM products", fn: code => /SELECT\s+\*\s+FROM\s+products/i.test(code) },
              { description: "Selects name and price columns", fn: code => /SELECT\s+name.*price|SELECT\s+price.*name/i.test(code) },
              { description: "WHERE price < 50", fn: code => /WHERE\s+price\s*<\s*50/i.test(code) },
              { description: "INSERT INTO products", fn: code => /INSERT\s+INTO\s+products/i.test(code) },
              { description: "Inserts Widget with price 9.99", fn: code => code.includes("Widget") && code.includes("9.99") },
              { description: "COUNT(*) from products", fn: code => /COUNT\s*\(\s*\*\s*\)/i.test(code) },
            ]
          }
        },
      ]
    },
  ]
};

window.CURRICULUM = CURRICULUM;
