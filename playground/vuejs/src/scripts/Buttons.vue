<template>
  <section>
    <h3>Buttons</h3>
    <div>
      <u-i-button
        label="contained primary"
        modifiers="contained primary"
      />
      <u-i-button
        label="contained secondary"
        modifiers="contained secondary"
      />
      <u-i-button
        label="contained warning"
        modifiers="contained warning"
      />
      <u-i-button
        label="contained error"
        modifiers="contained error"
      />
      <u-i-button
        label="contained disabled"
        modifiers="contained disabled"
      />
    </div>
    <div>
      <u-i-button
        label="outlined primary"
        modifiers="outlined primary"
      />
      <u-i-button
        label="outlined secondary"
        modifiers="outlined secondary"
      />
      <u-i-button
        label="outlined warning"
        modifiers="outlined warning"
      />
      <u-i-button
        label="outlined error"
        modifiers="outlined error"
      />
      <u-i-button
        label="outlined disabled"
        modifiers="outlined disabled"
      />
    </div>
    <div>
      <u-i-button
        label="text primary"
        modifiers="text primary"
      />
      <u-i-button
        label="text secondary"
        modifiers="text secondary"
      />
      <u-i-button
        label="text warning"
        modifiers="text warning"
      />
      <u-i-button
        label="text error"
        modifiers="text error"
      />
      <u-i-button
        label="text disabled"
        modifiers="text disabled"
      />
    </div>
  </section>
</template>

<script lang="ts">
/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue from 'vue';
import { UIButton } from 'sonar-ui/vuejs';

export default Vue.extend({
  components: {
    UIButton,
  },
});
</script>
