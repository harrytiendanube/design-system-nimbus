# Writing styles 🎨
All common styles, mixins and functions for Nimbus are located at the `components/styles` directory.
```
  ├─ 📁 components
  │  └─ 📁 styles
```
Inside the styles directory, we have a series of folders and files:
```
  ├─ 📁 common
  ├─ 📁 utilities
  ├─ 📄 _common.scss
  ├─ 📄 _tokens.scss
  ├─ 📄 _utilities.scss
  ├─ 📄 core.scss
```
- The `📁 common` directory contains all the styles that are shared throughout Nimbus components. For example: Typography styles, skeleton styles.
- The `📁 utilities` directory contains all common mixins and functions for the project.
- The `📄 _common.scss` and `📄 _utilities.scss` files handle the imports of every file inside the common and utilities directories, respectively, to reduce the amount of imports the core file has.
- The `📄 _tokens.scss` file imports our design tokens from [@tiendanube/design-tokens-nimbus](https://github.com/TiendaNube/design-tokens-nimbus/) and transpiles them into scss maps and variables for use within our components.
- The `📄 core.scss` file, finally imports our `tokens`, `utilities` and `common` and stores a variable with the prefix `nimbus` for every class within our components.