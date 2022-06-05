/**
 * @jest-environment jsdom
 */

/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as entry from 'scripts/main';

describe('main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('exports everything correctly', () => {
    expect(entry.markdown).not.toBe(undefined);
  });
});