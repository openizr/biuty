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
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  icon: PropTypes.string,
  size: PropTypes.number,
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
  onIconClick: PropTypes.func,
  placeholder: PropTypes.string,
  autocomplete: PropTypes.string,
  name: PropTypes.string.isRequired,
  debounceTimeout: PropTypes.number,
  allowedPattern: PropTypes.instanceOf(RegExp),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  type: PropTypes.oneOf(['text', 'email', 'number', 'password', 'search', 'tel', 'url']),
};

const defaultProps = {
  id: null,
  min: null,
  max: null,
  step: null,
  size: null,
  icon: null,
  value: '',
  label: null,
  helper: null,
  type: 'text',
  modifiers: '',
  onBlur: null,
  onFocus: null,
  onChange: null,
  readonly: false,
  maxlength: null,
  placeholder: null,
  autocomplete: 'on',
  iconPosition: 'left',
  debounceTimeout: null,
  allowedPattern: null,
  onIconClick: undefined,
  transform: (value: string): string => value,
};

const specialKeysRegexp = /(Tab|Backspace|Delete|Enter|ArrowRight|ArrowLeft|ArrowDown|ArrowUp)/;

/**
 * Textfield.
 */
export default function UITextfield(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    id, modifiers, label, helper, onChange, value, name, readonly, step, onIconClick, autocomplete,
    placeholder, iconPosition, icon, onBlur, type, size, max, min, maxlength, onFocus,
    debounceTimeout, allowedPattern,
  } = props;
  const [randomId] = React.useState(generateRandomId);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [timeout, setTimeout] = React.useState<number | null>(null);
  const { transform } = (props as { transform: (value?: string | null) => string });
  const [currentValue, setCurrentValue] = React.useState(transform(value));
  const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);
  const isDisabled = (modifiers as string).includes('disabled');
  const className = buildClass('ui-textfield', (modifiers as string).split(' '));
  const globalAllowedPattern = (allowedPattern instanceof RegExp) ? new RegExp(allowedPattern.source, 'g') : null;

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const filteredValue = (globalAllowedPattern !== null)
      ? (event.target.value.match(globalAllowedPattern) || []).join('')
      : event.target.value;
    const newValue = transform(filteredValue);
    setCurrentValue(newValue);
    // At this point, the input's value has already changed, which means the cursor's position is
    // at n + 1, which is why we substract 1 when checking last position.
    const currentCursorPosition = event.target.selectionStart as number;
    const isAtTheEnd = currentCursorPosition - 1 >= currentValue.length;
    setCursorPosition(isAtTheEnd ? newValue.length : currentCursorPosition);
    if (onChange !== undefined && onChange !== null) {
      window.clearTimeout(timeout as number);
      // This debounce system prevents triggering `onChange` hooks too many times when user is
      // still typing to improve performance and make UI more reactive on low-perfomance devices.
      setTimeout(window.setTimeout(() => {
        onChange(newValue);
      }, debounceTimeout || 0));
    }
  };

  const checkPattern = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (
      allowedPattern instanceof RegExp
      && !allowedPattern.test(event.key)
      && !specialKeysRegexp.test(event.key)
      && !event.ctrlKey
    ) {
      event.preventDefault();
    }
  };

  const paste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
    const cursor = (event.target as HTMLInputElement).selectionStart as number;
    const filteredValue = (globalAllowedPattern !== null)
      ? (event.clipboardData.getData('text').match(globalAllowedPattern) || []).join('')
      : event.clipboardData.getData('text');
    changeValue({
      target: {
        value: `${currentValue.slice(0, cursor)}${filteredValue}${currentValue.slice(cursor)}`,
        selectionStart: cursor + filteredValue.length,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
    event.preventDefault();
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

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(transform(value));
  }, [value]);

  // Re-positions cursor at the right place when using transform function.
  React.useEffect(() => {
    if (/^(url|text|tel|search|password)$/.test(type as string)) {
      (inputRef.current as HTMLInputElement).selectionStart = cursorPosition;
      (inputRef.current as HTMLInputElement).selectionEnd = cursorPosition;
    }
  }, [currentValue, cursorPosition]);

  const children = [
    (icon !== null)
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      ? <i key="icon" role="button" tabIndex={0} className="ui-textfield__wrapper__icon" onClick={onIconClick || undefined}>{icon}</i>
      : null,
    <input
      key="input"
      name={name}
      id={randomId}
      ref={inputRef}
      onPaste={paste}
      onBlur={blurField}
      onFocus={focusField}
      onKeyDown={checkPattern}
      max={max as number}
      min={min as number}
      step={step as number}
      type={type as string}
      size={size as number}
      disabled={isDisabled}
      value={currentValue as string}
      readOnly={readonly as boolean}
      maxLength={maxlength as number}
      autoComplete={autocomplete as string}
      placeholder={placeholder as string}
      className="ui-textfield__wrapper__field"
      onChange={(readonly === false && !isDisabled) ? changeValue : undefined}
    />,
  ];

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null && label !== undefined)
        // eslint-disable-next-line react/no-danger, jsx-a11y/label-has-associated-control
        ? <label className="ui-textfield__label" htmlFor={randomId} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
        : null}
      <div className="ui-textfield__wrapper">
        {(iconPosition === 'left') ? children : children.reverse()}
      </div>
      {(helper !== null) ? <span className="ui-textfield__helper">{helper}</span> : null}
    </div>
  );
}

UITextfield.propTypes = propTypes;
UITextfield.defaultProps = defaultProps;
UITextfield.displayName = 'UITextfield';
