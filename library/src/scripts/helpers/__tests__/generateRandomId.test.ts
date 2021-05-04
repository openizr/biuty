/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import generateRandomId from 'scripts/helpers/generateRandomId';

describe('helpers/generateRandomId', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.Math.random = jest.fn(() => 0.22068766900273062);
  });

  test('correctly generates a random HTML id', () => {
    expect(generateRandomId()).toBe('_7y0ejf');
  });
});
