# Button

## Left icon

```html
<button class="ui-button">
  <i class="ui-button__icon">{{ ICON }}</i>
  <span class="ui-button__label">{{ LABEL }}</span>
</button>
```

## Right icon

```html
<button class="ui-button">
  <span class="ui-button__label">{{ LABEL }}</span>
  <i class="ui-button__icon">{{ ICON }}</i>
</button>
```

## Icon only

```html
<button class="ui-button ui-button--icon">
  <i class="ui-button__icon">{{ ICON }}</i>
</button>
```

## Label only

```html
<button class="ui-button ui-button--icon">
  <span class="ui-button__label">{{ LABEL }}</span>
</button>
```

## Official modifiers

`ui-button--primary`
`ui-button--secondary`
`ui-button--warning`
`ui-button--error`
`ui-button--disabled`
`ui-button--contained`
`ui-button--outlined`
`ui-button--text`
`ui-button--large`
`ui-button--small`
