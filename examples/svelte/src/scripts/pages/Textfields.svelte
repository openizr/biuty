<!-- Textfields page. -->

<script lang="ts">
import { onMount } from 'svelte';
import type { Locale } from 'basx/i18n';
import { UITextfield } from 'biuty/svelte';

export let locale: Locale;

let newValue = 'test';

onMount(() => {
  setTimeout(() => {
    newValue = 'new test';
  }, 3000);
});

const { log } = console;

const onChange = (...e): void => {
  log('Changed!', e);
};

const onBlur = (...e): void => {
  log('Blurred!', e);
};

const onFocus = (...e): void => {
  log('Focused!', e);
};

const onIconClick = (...e): void => {
  log('Clicked!', e);
};

const onKeyDown = (...e): void => {
  log('Key down!', e);
};

const transform = (value: string): string => {
  if (value.length >= 7) {
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
  if (value.length >= 4) {
    return `(${value.slice(0, 3)}) ${value.slice(3)}`;
  }
  return value;
};


const toPhone = (value: string, start: number) => {
  const stripedValue = value.replace(/(\(|\)|-| )/ig, '');
  const { length } = stripedValue;
  if (length >= 7) {
    let e;
    if (!(length === 7 && !/-/.test(value)) && start !== 10) {
      e = start;
    }
    return [`(${stripedValue.slice(0, 3)}) ${stripedValue
      .slice(3, 6)}-${stripedValue.slice(6, 10)}`, e];
  }
  if (length >= 4) {
    return [`(${stripedValue.slice(0, 3)}) ${stripedValue.slice(3)}`, start];
  }
  if (length >= 3 && value.length < 4) {
    return [`(${stripedValue.slice(0, 3)}) `, 6];
  }
  return [stripedValue, start];
};
</script>

<div class="vgap-5">
  <main class="grid cols-1 hgap-3 vgap-5">
    <a
      href="/"
      class="cols-l-3"
    >GO BACK</a>
    {locale}
    <UITextfield name="textfield1" />
    <UITextfield
      name="textfield2"
      label="*ui-textfield*"
    />
    <UITextfield
      name="textfield3"
      label="ui-textfield readonly"
      readonly
    />
    <UITextfield
      name="textfield3"
      label="ui-textfield with autofocus"
      autofocus
    />
    <UITextfield
      name="textfield4"
      label="ui-textfield with value"
      value={newValue}
    />
    <UITextfield
      name="textfield5"
      label="ui-textfield with helper"
      helper="helper"
    />
    <UITextfield
      name="textfield6"
      label="ui-textfield with listener"
      on:change={onChange}
    />
    <UITextfield
      name="textfield7"
      label="ui-textfield with blur listener"
      on:blur={onBlur}
    />
    <UITextfield
      name="textfield8"
      label="ui-textfield with maxlength"
      maxlength={10}
    />
    <UITextfield
      name="textfield9"
      label="ui-textfield with placeholder"
      placeholder="placeholder"
    />
    <UITextfield
      name="textfield10"
      label="ui-textfield with password type"
      type="password"
      size={10}
    />
    <UITextfield
      name="textfield11"
      label="ui-textfield disabled"
      modifiers="disabled"
    />
    <UITextfield
      name="textfield12"
      label="ui-textfield icon left"
      icon="star"
    />
    <UITextfield
      name="textfield13"
      label="ui-textfield icon right"
      icon="star"
      icon-position="right"
    />
    <UITextfield
      name="textfield14"
      label="ui-textfield icon with listener"
      icon="star"
      on:iconClick={onIconClick}
      on:iconKeyDown={onKeyDown}
    />
    <UITextfield
      name="textfield15"
      label="ui-textfield with focus listener"
      on:focus={onFocus}
    />
    <UITextfield
      name="textfield16"
      label="ui-textfield with transform"
      allowedKeys={{ default: /[0-9]/i }}
      transform={transform}
      maxlength={14}
    />
    <UITextfield
      name="textfield17"
      label="ui-textfield with debounce"
      debounceTimeout={250}
      on:change={onChange}
    />
    <UITextfield
      name="textfield18"
      label="ui-textfield with type number"
      type="number"
      min={0}
      max={30}
      step={5}
    />
    <UITextfield
      name="textfield18"
      label="ui-textfield with type onKeyDown"
      allowedKeys={{ default: /[0-9()-]| / }}
      maxlength={14}
      transform={toPhone}
      on:keyDown={onKeyDown}
      on:change={onChange}
    />
  </main>
</div>
