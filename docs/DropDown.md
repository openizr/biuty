# DropDown

## With label

```html
<div class="ui-dropdown">
  <label for="79fwn0t91fm">{{ LABEL }}</label>
  <button type="button" id="79fwn0t91fm" aria-haspopup="listbox" class="ui-dropdown__field" aria-labelledby="79fwn0t91fm 79fwn0t91fm" tabindex="0">
    {{ SELECTED_OPTIONS }}
  </button>
  <button type="button" id="79fwn0t91fmc" class="ui-dropdown__clear-button" aria-labelledby="79fwn0t91fm 79fwn0t91fmc" tabindex="0">
    <i class="ui-dropdown__clear-button__icon">{{ ICON }}</i>
  </button>
  <ul tabindex="-1" role="listbox" aria-labelledby="79fwn0t91fm" aria-expanded="false" aria-activedescendant="79fwn0t91fm9" class="ui-dropdown__list ui-dropdown__list--top">
    {{ OPTIONS }}
  </ul>
</div>
```

## With helper

```html
<div class="ui-dropdown">
  <button type="button" id="79fwn0t91fm" aria-haspopup="listbox" class="ui-dropdown__field" aria-labelledby="79fwn0t91fm 79fwn0t91fm" tabindex="0">
    {{ SELECTED_OPTIONS }}
  </button>
  <button type="button" id="79fwn0t91fmc" class="ui-dropdown__clear-button" aria-labelledby="79fwn0t91fm 79fwn0t91fmc" tabindex="0">
    <i class="ui-dropdown__clear-button__icon">{{ ICON }}</i>
  </button>
  <ul tabindex="-1" role="listbox" aria-labelledby="79fwn0t91fm" aria-expanded="false" aria-activedescendant="79fwn0t91fm9" class="ui-dropdown__list ui-dropdown__list--top">
    {{ OPTIONS }}
  </ul>
  <p class="ui-dropdown__helper">{{ HELPER }}</p>
</div>
```

## Bottom position

```html
<div class="ui-dropdown">
  <label for="79fwn0t91fm">{{ LABEL }}</label>
  <button type="button" id="79fwn0t91fm" aria-haspopup="listbox" class="ui-dropdown__field" aria-labelledby="79fwn0t91fm 79fwn0t91fm" tabindex="0">
    {{ SELECTED_OPTIONS }}
  </button>
  <button type="button" id="79fwn0t91fmc" class="ui-dropdown__clear-button" aria-labelledby="79fwn0t91fm 79fwn0t91fmc" tabindex="0">
    <i class="ui-dropdown__clear-button__icon">{{ ICON }}</i>
  </button>
  <ul tabindex="-1" role="listbox" aria-labelledby="79fwn0t91fm" aria-expanded="false" aria-activedescendant="79fwn0t91fm9" class="ui-dropdown__list ui-dropdown__list--bottom">
    {{ OPTIONS }}
  </ul>
</div>
```

## With header option

```html
<div class="ui-dropdown">
  <button type="button" id="79fwn0t91fm" aria-haspopup="listbox" class="ui-dropdown__field" aria-labelledby="79fwn0t91fm 79fwn0t91fm" tabindex="0">
    {{ SELECTED_OPTIONS }}
  </button>
  <button type="button" id="79fwn0t91fmc" class="ui-dropdown__clear-button" aria-labelledby="79fwn0t91fm 79fwn0t91fmc" tabindex="0">
    <i class="ui-dropdown__clear-button__icon">{{ ICON }}</i>
  </button>
  <ul tabindex="-1" role="listbox" aria-labelledby="79fwn0t91fm" aria-expanded="false" aria-activedescendant="79fwn0t91fm9" class="ui-dropdown__list ui-dropdown__list--top ui-dropdown__list--expanded">
    <li class="ui-dropdown__list__header">Header</li>
  </ul>
</div>
```

## With divider option

```html
<div class="ui-dropdown">
  <button type="button" id="79fwn0t91fm" aria-haspopup="listbox" class="ui-dropdown__field" aria-labelledby="79fwn0t91fm 79fwn0t91fm" tabindex="0">
    {{ SELECTED_OPTIONS }}
  </button>
  <button type="button" id="79fwn0t91fmc" class="ui-dropdown__clear-button" aria-labelledby="79fwn0t91fm 79fwn0t91fmc" tabindex="0">
    <i class="ui-dropdown__clear-button__icon">{{ ICON }}</i>
  </button>
  <ul tabindex="-1" role="listbox" aria-labelledby="79fwn0t91fm" aria-expanded="false" aria-activedescendant="79fwn0t91fm9" class="ui-dropdown__list ui-dropdown__list--top">
    <li class="ui-dropdown__list__divider"></li>
  </ul>
</div>
```

## With disabled option

```html
<div class="ui-dropdown">
  <button type="button" id="79fwn0t91fm" aria-haspopup="listbox" class="ui-dropdown__field" aria-labelledby="79fwn0t91fm 79fwn0t91fm" tabindex="0">
    {{ SELECTED_OPTIONS }}
  </button>
  <button type="button" id="79fwn0t91fmc" class="ui-dropdown__clear-button" aria-labelledby="79fwn0t91fm 79fwn0t91fmc" tabindex="0">
    <i class="ui-dropdown__clear-button__icon">{{ ICON }}</i>
  </button>
  <ul tabindex="-1" role="listbox" aria-labelledby="79fwn0t91fm" aria-expanded="false" aria-activedescendant="79fwn0t91fm9" class="ui-dropdown__list ui-dropdown__list--top">
    <li class="ui-dropdown__list__option ui-dropdown__list__option--disabled">Option 2</li>
  </ul>
</div>
```

## With selectable options

```html
<div class="ui-dropdown">
  <button type="button" id="79fwn0t91fm" aria-haspopup="listbox" class="ui-dropdown__field" aria-labelledby="79fwn0t91fm 79fwn0t91fm" tabindex="0">
    {{ SELECTED_OPTIONS }}
  </button>
  <button type="button" id="79fwn0t91fmc" class="ui-dropdown__clear-button" aria-labelledby="79fwn0t91fm 79fwn0t91fmc" tabindex="0">
    <i class="ui-dropdown__clear-button__icon">{{ ICON }}</i>
  </button>
  <ul tabindex="-1" role="listbox" aria-labelledby="79fwn0t91fm" aria-expanded="false" aria-activedescendant="79fwn0t91fm9" class="ui-dropdown__list ui-dropdown__list--top">
    <li id="79fwn0t91fm9" role="option" tabindex="-1" aria-selected="true" class="ui-dropdown__list__option">Option 6</li>
    <li id="79fwn0t91fm10" role="option" tabindex="-1" aria-selected="false" class="ui-dropdown__list__option">Option 7</li>
  </ul>
</div>
```

## Official modifiers

`ui-dropdown--primary`
`ui-dropdown--secondary`
`ui-dropdown--warning`
`ui-dropdown--error`
`ui-dropdown--disabled`
`ui-dropdown--contained`
`ui-dropdown--outlined`
`ui-dropdown--text`
`ui-dropdown--large`
`ui-dropdown--small`

