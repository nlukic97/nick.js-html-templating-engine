# Nick.js
HTML templating engine.

This is a custom HTML templating engine I developed.

## Development:
1. Execute the following commands:
```sh
npm install

npm run dev
```

## How to use the template engine
First, create a .html file in the `./content` directory
```sh
touch ./content/page.html
```

Create a route for that `.html` file in the `./index.js` file:
```js
app.get('/page', renderHtml("./content/page.html"));
```

The contents of page.html will now be available at the `/page` route. 

To use components, first create a `.nick` component file in the `./content/components` directory:

```sh
touch ./content/components/Component.nick
```

and add some html code to the component. Example:
```html
<span>This is the Component.nick component</span>
```

Then you can include your component in your .html file with the following syntax:
```html
<div>
    <@components/Component.nick>
<div>
```

As Component.nick is found at the route `./content/components/Component.nick`, we in fact point to the location of the component with `@components/Component.nick` - the components route relative to the `content` directory.

## Production
```sh
npm i
npm run start
```

## Pre building
If you wish to pre-build you html files, you can run
```sh
npm run build
```

this will output all html files in the `./build` directory.
