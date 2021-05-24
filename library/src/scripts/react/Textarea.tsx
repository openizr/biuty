/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import markdown from 'scripts/helpers/markdown';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const propTypes = {
  id: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  maxlength: PropTypes.number,
  modifiers: PropTypes.string,
  placeholder: PropTypes.string,
  autocomplete: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  value: '',
  cols: null,
  rows: null,
  label: null,
  helper: null,
  onBlur: null,
  onFocus: null,
  modifiers: '',
  onChange: null,
  readonly: false,
  maxlength: null,
  placeholder: null,
  autocomplete: 'on',
};

/**
 * Textarea.
 */
export default function UITextarea(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    id, modifiers, label, helper, onChange, value, name, onFocus,
    placeholder, readonly, rows, cols, onBlur, maxlength, autocomplete,
  } = props;
  const [randomId] = React.useState(generateRandomId);
  const [currentValue, setCurrentValue] = React.useState(value);
  const isDisabled = (modifiers as string).includes('disabled');
  const className = buildClass('ui-textarea', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const changeValue = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCurrentValue(event.target.value);
    if (onChange !== undefined && onChange !== null) {
      onChange(event.target.value);
    }
  };

  const blurField = (): void => {
    if (onBlur !== undefined && onBlur !== null) {
      onBlur(currentValue);
    }
  };

  const focusField = (): void => {
    if (onFocus !== undefined && onFocus !== null) {
      onFocus(currentValue);
    }
  };

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null && label !== undefined)
        // eslint-disable-next-line react/no-danger, jsx-a11y/label-has-associated-control
        ? <label className="ui-textarea__label" htmlFor={randomId} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
        : null}
      <div className="ui-textarea__wrapper">
        <textarea
          name={name}
          id={randomId}
          onBlur={blurField}
          onFocus={focusField}
          cols={cols as number}
          rows={rows as number}
          disabled={isDisabled}
          className="ui-textarea__wrapper__field"
          value={currentValue as string}
          readOnly={readonly as boolean}
          maxLength={maxlength as number}
          placeholder={placeholder as string}
          autoComplete={autocomplete as string}
          onChange={(readonly === false && !isDisabled) ? changeValue : undefined}
        />
      </div>
      {(helper !== null) ? <span className="ui-textarea__helper">{helper}</span> : null}
    </div>
  );
}

UITextarea.propTypes = propTypes;
UITextarea.defaultProps = defaultProps;
UITextarea.displayName = 'UITextarea';
