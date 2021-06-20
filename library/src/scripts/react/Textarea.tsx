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
  value: PropTypes.string,
  label: PropTypes.string,
  helper: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  transform: PropTypes.func,
  maxlength: PropTypes.number,
  modifiers: PropTypes.string,
  placeholder: PropTypes.string,
  autocomplete: PropTypes.string,
  debounceTimeout: PropTypes.number,
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
  debounceTimeout: null,
  transform: (value: string): string => value,
};

/**
 * Textarea.
 */
export default function UITextarea(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    id, modifiers, label, helper, onChange, value, name, onFocus, debounceTimeout,
    placeholder, readonly, rows, cols, onBlur, maxlength, autocomplete,
  } = props;
  const { transform } = (props as { transform: (value?: string | null) => string });
  const [randomId] = React.useState(generateRandomId);
  const [mounted, setMounted] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = React.useState(transform(value));
  const [cursorPosition, setCursorPosition] = React.useState<number>(0);
  const isDisabled = (modifiers as string).includes('disabled');
  const className = buildClass('ui-textarea', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(transform(value));
  }, [value]);

  // We don't want to fire `onChange` when `currentValue` is initialized for the first time.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    // This debounce system prevents triggering `onChange` hooks too many times when user is
    // still typing to save performance and make the UI more reactive on low-perfomance devices.
    if (onChange !== undefined && onChange !== null && debounceTimeout !== null && mounted) {
      const timeout = window.setTimeout(() => {
        onChange(currentValue);
      }, debounceTimeout);
      return (): void => window.clearTimeout(timeout);
    }
    // Re-positions cursor at the right place when using transform function.
    (textareaRef.current as HTMLTextAreaElement).selectionStart = cursorPosition;
    (textareaRef.current as HTMLTextAreaElement).selectionEnd = cursorPosition;
    return undefined;
  }, [currentValue]);

  const changeValue = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = transform(event.target.value);
    setCurrentValue(newValue);
    setCursorPosition(event.target.selectionStart);
    if (onChange !== undefined && onChange !== null && debounceTimeout === null) {
      onChange(newValue);
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
          ref={textareaRef}
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
