<h1 align="center">
  <img src="https://github.com/Team-Hycon/hycon-gui/blob/e7ecaec870f78e7c01c9ea6acef32987a512275b/hummingbird-desktop/build/icon.png" alt="Hycon API" width="200">
</h1>
<h4 align="center">Hycon API Docs - <a href="docs.hycon.io">docs.hycon.io</a></h4>

## Building & Deploying

Install the dependencies: `npm install`

Testing with live server: `npm run start`

Building: `npm run build`

The files to serve are in the `/docbox` directory, namely: `index.html`, `bundle.js`, and the `/css` folder.

## Updating documentation

The documentation content is located under `/docbox/content`. The documentation files are in markdown (`.md`) format, and are parsed into the `bundle.js`. 

To make it easier to maintain, update, and add to the documentation:

- each version has its own directory (i.e. `v1` contains only API v1).

- each section is split into their respective topics (i.e. `address.md` refers to address-related API).

- images are stored in the `/img` directory.

### Adding a new version

To add a new version (i.e. `v4`)

create a new directory for the API in `/docbox/content`

copy the existing markdown files from another version, or create new `.md` files to write the documentation

In order to switch between API versions, go to `/docbox/src/index.js`:

Add another array entry to `const version[]`

```javascript
// Example
const version = [
  { title: 'api/v1',
    short: 'v1',
    value: '0',
  },
  {
    title: 'api/v3',
    short: 'v3',
    value: '1',
  },
  // New entry
  {
    title: 'api/v4',
    short: 'v4',
    value: '2',
  }
]
```

In `ReactDOM.render`, add another `<App/>` component with the new value added above

```javascript
// Example
{ api_version.value === "0" ? 
    <App ast={ast} content={content[0]} /> :
    // You will need to nest ternaries or create a function that returns the component
    // and the appropriate content value
    api_version.value === "1" ? 
        <App ast={ast} content={content[1]} /> :
        <App ast={ast} content={content[2]} />    
}
```

the `<RoundedToggle/>` component will not be useful past two versions, so changing this component to a dropdown menu or similar is ideal. To keep the version persistent after leaving the browser tab, add a `storage.setItem(“version”, JSON.stringify(version))` as part of the `onChange` or `onClick` action.

After updating `index.js`, go to `/docbox/src/custom` and edit `content.js` by adding another entry to `module.exports`:

```javascript
 module.exports = 
  [
    '# Topics\n' 
    // Truncated
    ,
    '# Topics\n'
    // Truncated
    ,
    // New entry
    '# Topics\n' +
    fs.readFileSync('./content/v4/introduction.md', 'utf8') + '\n'
  ]
```

Before building and deploying, update the version and changelog of the documentation.

To update the version, go to `/docbox/src/custom/index.js` and update the `module.exports.brandName` variable:

```javascript
// Example
module.exports.brandNames = {
  desktop: 'beta-1.03 | Updated: June 05, 2019',
  tablet: 'beta1.03 | ^06/05/19',
  mobile: 'b1.03'
};
```

To update the changelog, go to `/docbox/content/{version}/reference.md` and update the `## Changelog` section:

```
// Example
## Changelog

Date | Maintainer | Description
-----|------------|------------
1546232471 | Author | added `api/v3`. `beta-1.01` release in English.
```
