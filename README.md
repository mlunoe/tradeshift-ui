## Problem statement

### Triangle challenge (TS UI)

Write a program that will determine the type of a triangle. It should take the lengths of the triangle's three sides as input, and return whether the triangle is equilateral, isosceles or scalene.

We are looking for solutions that showcase problem solving skills and structural considerations that can be applied to larger and potentially more complex problem domains. Pay special attention to tests, readability of code and error cases.

It would be great if you build the UI with our components: 
http://ui.tradeshift.com/ & https://github.com/Tradeshift/tradeshift-ui

The way you reflect upon your decisions is important to us, why we ask you to include a brief discussion of your design decisions and implementation choices.

The resulting code and discussion is vital for us and will be used as a way for us to validate your engineering skills. After having reviewed your code, we’ll decide on next step.

Please put the solution up on GitHub and send the link to me. If you have some other code that you are proud of then please send that too.

## How to use this app

This application is a solution to the problem statement above. It takes a structural approach to solve the problem and considers the functional aspect of it, as well as the end user.

To run this application and see it in action run the following commands:

```sh
$ yarn
$ yarn start
```

Open up [http://localhost:8080/](http://localhost:8080/) to see the running application.

To run the test suite, run the following command:
```sh
$ yarn test
```

Below you will find the thought process of building this solution.

Central pieces of the application:
- The [PointRecorder](https://github.com/mlunoe/tradeshift-ui/blob/master/src/components/point-recorder/point-recorder.js) component provides functionality for recording points, given a canvas element
- The [TextDisplay](https://github.com/mlunoe/tradeshift-ui/blob/master/src/components/text-display/text-display.js) component provides functionality for rendering and updating text in an orderly fashion
- The [triangle-calc.js](https://github.com/mlunoe/tradeshift-ui/blob/master/src/utils/triangle-calc.js) is a collection of utility functions that provides calculations concerning triangles

Limitations:
- This is not a full-fletched application. It takes a minimal approach by using the Tradeshift UI components (and no framework) to get something displayed on the page
- It places the style globally on the page and does not seek to solve the problem of organising styles next to functionality
- It also uses global templates defined on the index.html page and does not seek to solve the problem of organising them next to functionality

## Discussion

If this were to be used in production, it would be beneficial to add some sort of JavaScript framework to solve the organisation problems this solution clearly suffers from.

This could be a similar structure to how the Tradeshift UI components are built, but ideally, as an extension of the existing components!

I decided to go with a minimal solution to get something working in a short amount of time and not having, for the challenge, unnessary overhead.

Finally, this minimal structure should make it easy to transfer into any new framework (templates, styles and functionality) as it has no other dependency than the Tradeshift UI components.

## Thought process

### Consuming components

Looking around the tradeshift UI repo, there is no immediate way of consuming the components.
First, I'll try to fork the repository to use the code and styles provided.

Then, exploring the gh-pages branch, if that might be easier to consume the components from. Components seem pretty integrated.

Found resources available at:
```html
  <script src="//d5wfroyti11sa.cloudfront.net/prod/client/ts-11.0.0-beta.11.min.js"></script>
  <link rel="stylesheet" href="//d5wfroyti11sa.cloudfront.net/prod/client/ts-11.0.0-beta.11.min.css"/>
```

Library is now available, but components don't display/behave correctly.
It seems like they need jquery? Adding that did not change anything.

Dialog seems to work! But Note doesn't. Icons work. Footer doesn't. Input autocomplete works.
Discovering that there is some page context (classes and elements, etc.) which certain components behave around.
Moving on to not spend too much time on this, since I might not need these types of components.

The core problem can be solved using just these components and plain old JavaScript, so I will refrain from adding a framework to the solution.

I later found and read the getting started page, which could have spared me some time figuring out how to consume the components. See [Setting up a project structure](https://github.com/mlunoe/tradeshift-ui/tree/master#setting-up-a-project-structure).

### Setting up a project structure

Setting up a simple webpack build seems to be the easiest approach (considering this project might grow).

On initial setup, when the page is resized I see the following error:
`Uncaught TypeError: Cannot read property 'tabs' of null ts-11.0.0-beta.11.js:47459`

I am expecting this to be due to the library expecting a certain context? I can't really find any documentation or bug reports on this.

I found the getting started page (which I probably should have read from the very beginning), which explained a few things for me.
I also found that having the tabs element on my page probably caused the error I was seeing.

Introducing point-recorder and text-display components along with a util file to allow for some component-like structure in the application.

### Core problem

Given lengths x,y,z
```js
  // Inital naiive approach
  // check all lengths against each other
  // worst-case runtime O(n^2), though we are talking n=3

  map = new Map()
  for each l in lengths
    if (!map[l]) {
      map[l] = 0
    }
    map[l]++
  result = 0
  for each t in map
    if t > result
      result = t
  return result;
  // worst-case runtime O(n)

  case: 0 equal lengths => scalene
  case: 2 equal lengths => isosceles
  case: 3 equal lengths => equilateral
```

Edge cases:
- Can the lengths form a triangle?
  - Triangle Inequality Theorem: This theorem simply states that the sum of two sides of a triangle must be greater than the third side.
- Does the input hold more or less than three lengths?

### Presenting the problem for the user

A simple presentation would be to display three inputs to type in numbers and then provide the result on submit.

Something more involved could be a file-upload function (e.g. csv) or drawing feature, where the user can select three points and it will tell the result.
