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
  onIconClick: undefined,
  debounceTimeout: null,
  transform: (value: string): string => value,
};

/**
 * Textfield.
 */
export default function UITextfield(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    id, modifiers, label, helper, onChange, value, name, readonly, step, onIconClick, autocomplete,
    placeholder, iconPosition, icon, onBlur, type, size, max, min, maxlength, onFocus,
    debounceTimeout,
  } = props;
  const [randomId] = React.useState(generateRandomId);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const { transform } = (props as { transform: (value?: string | null) => string });
  const [currentValue, setCurrentValue] = React.useState(transform(value));
  const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);
  const isDisabled = (modifiers as string).includes('disabled');
  const className = buildClass('ui-textfield', (modifiers as string).split(' '));

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
    if (/^(url|text|tel|search|password)$/.test(type as string)) {
      (inputRef.current as HTMLInputElement).selectionStart = cursorPosition;
      (inputRef.current as HTMLInputElement).selectionEnd = cursorPosition;
    }
    return undefined;
  }, [currentValue]);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
      onBlur={blurField}
      onFocus={focusField}
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
      className="ui-textfield__wrapper__field"
      placeholder={placeholder as string}
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
