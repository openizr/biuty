# sonar-ui

A framework-agnostic components and styling library.


## What's in the box
- A complete list of HTML specs for reusable components, using BEM conventions, performance, SEO and accessibility optimized
- An implementation of those components in popular frontend frameworks (React, VueJS)
- A SASS library containing a small set of useful and essential mixins and classes to build awesome UIs
- A pack of SASS templates for easily implementing your own design system for reusable components, using those mixins
- A list of implemented, ready to use popular CSS design systems (Material, Semantic, Primer, ...)
- A set of SASS variables common to all design systems to tweak them and make your own theme, in minutes, with almost no knowledge


## Advantages
- Performance-focused (light HTML, 100% CSS for design)
- Separation of concerns, dev/graphic designer (no CSS in JS)
- W3C-compliant, accessibility-enabled and SEO friendly
- Easy to use, for both dev (components implemented in popular frameworks) and graphic designer (SASS mixins, variables)
- Framework and design system agnostic - you can implement components in any framework, you can implement your own design system
- Only the essential components, no templates, complex or customized stuff
- Best practices compliant


## Components

### Atomic

Those components are atomic in the way that they can't contain children, and can be configured only using options. Most basic components of any UI.

#### UIButton

Syntax
```html
<UIButton
  id?="my-id"
  icon?="star"
  label?="My Button"
  onClick?={() => console.log('clicked!')}
  modifiers?="small"
  iconPosition?="left"
/>
```

#### UIDropdown

Syntax
```html
<UIDropdown
  id?="my-id"
  multiple?={true}
  helper?="Additional info"
  options={[{ label: 'Option 1', value: 'option1', disabled: false, type: 'option' }]}
  modifiers?="small"
  clearIcon?="close"
  defaultOptions?={['option1']}
  onChange?={console.log}
/>
```

#### UIImage

Syntax
```html
<UIImage
  src="/path/to/image"
  alt="My image"
  ratio="1:1"
  modifiers?="small"
  itemProp?="image"
/>
```

#### UILink

Syntax
```html
<UILink
  id?="my-id"
  href="/"
  label="link"
  onClick?={console.log}
  modifiers?="small"
/>
```

#### UIP

Syntax
```html
<UIP modifiers?="small" label="Hello World!" id?="my-id" itemProp?="description" />
```

#### UITitle

Syntax
```html
<UITitle level?="1" modifiers?="small" label="Hello" itemProp?="name" />
```

#### UISubtitle

Syntax
```html
<UISubtitle level?="1" modifiers?="small" label="Hello" itemProp?="name" />
```

#### UITextField

Syntax
```html
<UITextField
  id?="my-id"
  icon?="star"
  label?="Input"
  helper?="Additional info"
  onChange?={console.log}
  onBlur?={console.log}
  value?="initial value"
  readonly?
  maxlength?={30}
  size?={3}
  min?={0}
  max?={10}
  step?={5}
  type?="email"
  placeholder?="Enter your name here..."
  iconPosition?="right"
  modifiers="small"
/>
```

## Concepts

- Sonar is mobile-first
- BEM+ => modifiers will be written like `ui-element ui-element--modifier1--modifier2...` instead of  `ui-element ui-element--modifier1 ui-element--modifier2...`
- Some values are predefined and can be configured in a `variables` file: gaps, colors, typographies, elevations, shapes (border-radiuses), breakpoints
- `ui-block` = isolated, new scope


## Layout system - available classes

- `ui-block`: applies a flex behaviour to children
- `ui-block cols...`: applies a grid behaviour to children
- `cols-[N]`: when applied to a block, makes all its children align on a N-columns grid (each child taking one column by default)
- `cols-[N]`: when applied to a non-block, makes this specific element take N-columns wide on the grid
- `hgap-[N]`: when applied to a block, applies a horizontal gap of X pixels (X being the value related to `N` in `$gaps` variable) between each column
- `hgap-[N]`: when applied to a non-block, applies a X pixels horizontal gap (X being the value related to `N` in `$gaps` variable) to this specific element
- `vgap-[N]`: when applied to a block, applies a vertical gap of X pixels (X being the value related to `N` in `$gaps` variable) between each row
- `hgap-[N]`: when applied to a non-block, applies a X pixels vertical gap (X being the value related to `N` in `$gaps` variable) to this specific element
- `gap-[N]`: when applied to a block, applies a gap of X pixels (X being the value related to `N` in `$gaps` variable) between each row and column
- `gap-[N]`: when applied to a non-block, applies a X pixels gap (X being the value related to `N` in `$gaps` variable) to this specific element
- `wdt-100`: when applied to a block, applies a 100% width to all its children
- `wdt-100`: when applied to a non-block, applies a 100% width to this specific element
- `wdt-auto`: when applied to a block, applies an auto width to all its children
- `wdt-auto`: when applied to a non-block, applies an auto width to this specific element
- `alg-cnt`: when applied to a block, vertically centers all its children
- `alg-cnt`: when applied to a non-block, vertically centers this specific element
- `ui-page`: indicates that the element is the main body content (not a navbar nor a footer)

*If no breakpoint is specified, the properties will be applied by default to all breakpoints. If you wish to define a specific breakpoint to apply your properties from, just write something like `cols-[BREAKPOINT]-[N]`.*


## Useful functions (all values are retrieved from variables)

- `ui-gap($gap)`
- `ui-elevation($level)`
- `ui-color($color, $opacity = 1)`
- `ui-on-color($color, $opacity = 1)`
- `ui-shape($shape)`


## Useful mixins (all values are retrieved from variables)

- `fontface($name, $path, $weight = null, $style = null, $exts = eot woff2 woff ttf)`
- `resp($breakpoint1 $breakpoint2...)`
- `ui-font($level)`
- `ui-modifier$(modifier)`
