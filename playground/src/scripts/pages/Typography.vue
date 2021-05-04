<template>
  <div className="vgap-5">
    <main className="ui-page ui-block cols-1 vgap-5">
      <a href="/">GO BACK</a>
      <UITitle
        level="1"
        :label="'ui-title\n**ui-title--1 ui-title strong**'"
      />
      <UITitle
        level="2"
        :label="'ui-title\nui-title--2\n~ui-title ui-title--2~'"
      />
      <UITitle
        level="3"
        :label="'ui-title ui-title--3\nui-title ui-title--3'"
      />
      <UITitle
        level="4"
        :label="'ui-title ui-title--4\nui-title ui-title--4'"
      />
      <UITitle
        level="5"
        :label="'ui-title ui-title--5\nui-title ui-title--5'"
      />
      <UITitle
        level="6"
        :label="'ui-title ui-title--6\nui-title ui-title--6'"
      />
      <UIP
        clas=""
        :label="
          'ui-p ui-p ui-p ui-p ~ui-p italic~ _ui-p underline_ **ui-p strong** *ui-p emphasis* ' +
            'ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p' +
            ' ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p ui-p '"
      />
      <div>
        <div className="ui-button-group">
          <UILink
            href="/"
            target="_blank"
            rel="nofollow noopener noreferer"
            title="link title"
            label="ui-link"
          />
        </div>
      </div>
    </main>
  </div>
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
import { Generic } from 'scripts/types';
import { UITitle, UIP, UILink } from 'sonar-ui/vue';

interface Props {
  translate: (label: string) => string;
}

/**
 * Typography page.
 */
export default Vue.extend<Generic, Generic, Generic, Props>({
  name: 'Typography',
  components: {
    UIP,
    UILink,
    UITitle,
  },
  props: {
    translate: {
      type: Function,
      required: true,
    },
  },
});
</script>
