/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable react/no-danger, jsx-a11y/label-has-associated-control */

import * as React from 'react';
import UIIcon from 'scripts/react/Icon';
import markdown from 'scripts/helpers/markdown';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

type KeyType = 'default' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey';
type AllowedKeys = Record<KeyType, RegExp | null>;

const JSXUIIcon = UIIcon as JSXElement;

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
  onPaste: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  readonly: PropTypes.bool,
  transform: PropTypes.func,
  autofocus: PropTypes.bool,
  maxlength: PropTypes.number,
  modifiers: PropTypes.string,
  onIconClick: PropTypes.func,
  placeholder: PropTypes.string,
  onIconKeyDown: PropTypes.func,
  autocomplete: PropTypes.string,
  name: PropTypes.string.isRequired,
  debounceTimeout: PropTypes.number,
  allowedKeys: PropTypes.shape({
    altKey: PropTypes.instanceOf(RegExp),
    metaKey: PropTypes.instanceOf(RegExp),
    ctrlKey: PropTypes.instanceOf(RegExp),
    default: PropTypes.instanceOf(RegExp),
    shiftKey: PropTypes.instanceOf(RegExp),
  }),
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
  onPaste: null,
  onChange: null,
  onKeyDown: null,
  allowedKeys: {},
  transform: null,
  readonly: false,
  autofocus: false,
  maxlength: null,
  onIconClick: null,
  placeholder: null,
  autocomplete: 'on',
  iconPosition: 'left',
  onIconKeyDown: null,
  debounceTimeout: 0,
};

const keyTypes: KeyType[] = ['default', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
const specialKeysRegexp = /Tab|Control|Shift|Meta|ContextMenu|Alt|Escape|Insert|Home|End|AltGraph|NumLock|Backspace|Delete|Enter|ArrowRight|ArrowLeft|ArrowDown|ArrowUp/;
const defaultTransform = (value: string): string[] => [value];

/**
 * Text field.
 */
function UITextfield(props: InferProps<typeof propTypes>): JSX.Element {
  const { autofocus } = props;
  const { type, size, max } = props;
  const { name, readonly, step } = props;
  const { id, modifiers, label } = props;
  const { helper, onChange, value } = props;
  const { min, maxlength, onFocus } = props;
  const { iconPosition, icon, onBlur } = props;
  const { onIconKeyDown, transform, onPaste } = props;
  const { onIconClick, autocomplete, placeholder } = props;
  const { debounceTimeout, allowedKeys, onKeyDown } = props;
  const [randomId] = React.useState(generateRandomId);
  const actualTransform = transform || defaultTransform;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const isDisabled = (modifiers as string).includes('disabled');
  const className = buildClass('ui-textfield', modifiers as string);
  const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);
  const [currentValue, setCurrentValue] = React.useState(() => actualTransform(value, 0)[0]);

  // Memoïzes global version of allowed keys RegExps (required for filtering out a whole text).
  const globalAllowedKeys = React.useMemo(() => keyTypes.reduce((allAllowedKeys, keyType) => {
    const allowedKeysForType = (allowedKeys as AllowedKeys)[keyType];
    return {
      ...allAllowedKeys,
      [keyType]: (allowedKeysForType !== undefined && allowedKeysForType !== null)
        ? new RegExp(allowedKeysForType.source, `${allowedKeysForType.flags}g`)
        : null,
    };
  }, {} as AllowedKeys), [allowedKeys]);

  // -----------------------------------------------------------------------------------------------
  // CALLBACKS DECLARATION.
  // -----------------------------------------------------------------------------------------------

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, filter = true): void => {
    const filteredValue = (filter && globalAllowedKeys.default !== null)
      ? (event.target.value.match(globalAllowedKeys.default) || []).join('')
      : event.target.value;
    const { selectionStart } = event.target;
    const [newValue, newCursorPosition] = actualTransform(filteredValue, selectionStart);
    setCurrentValue(newValue);
    if (newCursorPosition !== undefined) {
      setCursorPosition(newCursorPosition);
    } else {
      // At this point, the input's value has already changed, which means the cursor's position is
      // at n + 1, which is why we substract 1 when checking last position.
      const currentCursorPosition = event.target.selectionStart as number;
      const isAtTheEnd = currentCursorPosition - 1 >= currentValue.length;
      setCursorPosition(isAtTheEnd ? newValue.length : currentCursorPosition);
    }
    if (onChange !== undefined && onChange !== null) {
      window.clearTimeout(timeout.current as NodeJS.Timeout);
      // This debounce system prevents triggering `onChange` callback too many times when user is
      // still typing to improve performance and make UI more reactive on low-perfomance devices.
      timeout.current = setTimeout(() => {
        onChange(newValue, event);
      }, debounceTimeout as number);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    let allowedKeysForEvent = (allowedKeys as AllowedKeys).default || null;
    if (event.ctrlKey === true) {
      allowedKeysForEvent = (allowedKeys as AllowedKeys).ctrlKey || null;
    } else if (event.shiftKey === true) {
      allowedKeysForEvent = (allowedKeys as AllowedKeys).shiftKey || null;
    } else if (event.altKey === true) {
      allowedKeysForEvent = (allowedKeys as AllowedKeys).altKey || null;
    } else if (event.metaKey === true) {
      allowedKeysForEvent = (allowedKeys as AllowedKeys).metaKey || null;
    }
    if (
      allowedKeysForEvent !== null
      && !allowedKeysForEvent.test(event.key)
      && !specialKeysRegexp.test(event.key)
    ) {
      event.preventDefault();
    } else if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
    const selectionEnd = (event.target as HTMLInputElement).selectionEnd as number;
    const selectionStart = (event.target as HTMLInputElement).selectionStart as number;
    const filteredValue = (globalAllowedKeys.default !== null)
      ? (event.clipboardData.getData('text').match(globalAllowedKeys.default) || []).join('')
      : event.clipboardData.getData('text');
    handleChange({
      target: {
        value: `${currentValue.slice(0, selectionStart)}${filteredValue}${currentValue.slice(selectionEnd)}`,
        selectionStart: selectionStart + filteredValue.length,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>, false);
    event.preventDefault();
    if (onPaste !== undefined && onPaste !== null) {
      onPaste(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (onBlur !== undefined && onBlur !== null) {
      onBlur(currentValue, event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (onFocus !== undefined && onFocus !== null) {
      onFocus(currentValue, event);
    }
  };

  // -----------------------------------------------------------------------------------------------
  // PROPS REACTIVITY MANAGEMENT.
  // -----------------------------------------------------------------------------------------------

  // Updates current value whenever `value` and `transform` props change.
  React.useEffect(() => {
    const [newValue] = actualTransform(value, 0);
    setCurrentValue(newValue);
  }, [value, actualTransform]);

  // Re-positions cursor at the right place when using transform function.
  React.useEffect(() => {
    if (/^(url|text|tel|search|password)$/.test(type as string)) {
      (inputRef.current as HTMLInputElement).selectionStart = cursorPosition;
      (inputRef.current as HTMLInputElement).selectionEnd = cursorPosition;
    }
  }, [currentValue, cursorPosition, type]);

  // -----------------------------------------------------------------------------------------------
  // COMPONENT RENDERING.
  // -----------------------------------------------------------------------------------------------

  const children = [
    (icon !== null && icon !== undefined)
      ? (
        <span
          key="icon"
          tabIndex={0}
          role="button"
          onClick={onIconClick as undefined}
          onKeyDown={onIconKeyDown as undefined}
          className="ui-textfield__wrapper__icon"
        >
          <JSXUIIcon name={icon} />
        </span>
      )
      : null,
    <input
      key="input"
      name={name}
      id={randomId}
      ref={inputRef}
      max={max as number}
      min={min as number}
      step={step as number}
      type={type as string}
      size={size as number}
      disabled={isDisabled}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={currentValue as string}
      readOnly={readonly as boolean}
      maxLength={maxlength as number}
      autoComplete={autocomplete as string}
      placeholder={placeholder as string}
      className="ui-textfield__wrapper__field"
      autoFocus={autofocus as boolean} // eslint-disable-line jsx-a11y/no-autofocus
      onPaste={(readonly === false && !isDisabled) ? handlePaste : undefined}
      onChange={(readonly === false && !isDisabled) ? handleChange : undefined}
      onKeyDown={(readonly === false && !isDisabled) ? handleKeyDown : undefined}
    />,
  ];

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null && label !== undefined)
        ? <label className="ui-textfield__label" htmlFor={randomId} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
        : null}
      <div className="ui-textfield__wrapper">
        {(iconPosition === 'left') ? children : children.reverse()}
      </div>
      {(helper !== null && helper !== undefined)
        ? <span className="ui-textfield__helper" dangerouslySetInnerHTML={{ __html: markdown(helper) }} />
        : null}
    </div>
  );
}

UITextfield.propTypes = propTypes;
UITextfield.defaultProps = defaultProps;
UITextfield.displayName = 'UITextfield';

export default React.memo(UITextfield);
