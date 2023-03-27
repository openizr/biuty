<!-- Images page. -->
<script lang="ts">
  import { Locale } from 'basx/i18n';
  import { UIImage } from 'biuty/svelte';

  export let locale: Locale;
</script>

<div class="vgap-5">
  <main class="ui-page ui-block cols-3 hgap-3 vgap-5">
    <a href="/" class="cols-3">GO BACK</a>
    {locale}
    <UIImage ratio="square" src="https://picsum.photos/200/600" alt="img" />
    <UIImage ratio="square" src="https://picsum.photos/300/300" alt="img" />
    <UIImage ratio="square" src="https://picsum.photos/600/200" alt="img" />
    <UIImage
      ratio="square"
      modifiers="large"
      src="https://picsum.photos/200/600"
      alt="img"
    />
    <UIImage
      ratio="square"
      modifiers="large"
      src="https://picsum.photos/300/300"
      alt="img"
    />
    <UIImage
      ratio="square"
      modifiers="large"
      src="https://picsum.photos/600/200"
      alt="img"
    />
    <UIImage
      ratio="square"
      modifiers="small"
      src="https://picsum.photos/200/600"
      alt="img"
    />
    <UIImage
      ratio="square"
      modifiers="small"
      src="https://picsum.photos/300/300"
      alt="img"
    />
    <UIImage
      ratio="square"
      modifiers="small"
      src="https://picsum.photos/600/200"
      alt="img"
    />
  </main>
</div>
