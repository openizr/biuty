<!-- Buttons page. -->
<script lang="ts" setup>
  import type { Locale } from 'basx/i18n';
  import { UIButton } from 'biuty/svelte';

  const { log } = console;

  const onClick = (): void => {
    log('Clicked!');
  };
  const onFocus = (): void => {
    log('Focused!');
  };

  export let locale: Locale;
</script>

<div class="vgap-5">
  <main class="grid cols-1 hgap-3 vgap-5">
    <a href="/" class="cols-l-3">GO BACK</a>
    {locale}
    <UIButton label="ui-button" />
    <UIButton label="ui-button icon left" icon="star" />
    <UIButton label="ui-button icon right" icon="star" iconPosition="right" />
    <UIButton label="ui-button disabled" modifiers="disabled" />
    <UIButton label="ui-button with listener" on:click={onClick} />
    <UIButton label="ui-button with type submit" type="submit" />
    <UIButton label="ui-button with focus listener" on:focus={onFocus} />
  </main>
</div>
