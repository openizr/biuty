<!-- Basic icon. -->
<script lang="ts" setup>
/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { computed } from 'vue';
import buildClass from 'scripts/helpers/buildClass';

const props = defineProps<{
  id?: string;
  name: string;
  modifiers?: string;
}>();

const className = computed(() => buildClass('ui-icon', `${props.name} ${props.modifiers || ''}`));
</script>

<template>
  <i
    :id="id"
    :class="className"
  />
</template>
