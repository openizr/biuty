<!-- App router. -->
<script lang="ts">
  import type { Locale } from 'basx/i18n';
  import routes from 'scripts/store/routes';
  import { useCombiner } from 'scripts/store/index';
  import { onDestroy, SvelteComponent } from 'svelte';
  import type { RoutingContext } from 'diox/extensions/router';

  const locale: Locale = {};
  let component: SvelteComponent | null = null;
  const router = useCombiner<RoutingContext>('router');
  const unsubscribe = router.subscribe(async (state: RoutingContext) => {
    const currentRoute = state.route || '';
    if (routes[currentRoute] !== undefined) {
      component = (await routes[currentRoute]()) as SvelteComponent;
    } else {
      component = null;
    }
  });

  onDestroy(unsubscribe);
</script>

{#if component !== null}
  <svelte:component this={component.default} {locale} />
{/if}
