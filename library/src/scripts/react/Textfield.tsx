/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import UIIcon from 'scripts/react/Icon';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

type KeyType = 'default' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey';
type AllowedKeys = Record<KeyType, RegExp | null>;

const JSXUIIcon = UIIcon as JSXElement;

const keyTypes: KeyType[] = ['default', 'ctrlKey', 'altKey', 'shiftKey', 'metaKey'];
const specialKeysRegexp = /Tab|Control|Shift|Meta|ContextMenu|Alt|Escape|Insert|Home|End|AltGraph|NumLock|Backspace|Delete|Enter|ArrowRight|ArrowLeft|ArrowDown|ArrowUp/;
const defaultTransform = (value: string): string[] => [value];

/**
 * Text field.
 */
function UITextfield(props: UITextfieldProps & {
  /** `focus` event handler. */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /** `change` event handler. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /** `blur` event handler. */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /** `paste` event handler. */
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;

  /** `keyDown` event handler. */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  /** `iconKeyDown` event handler. */
  onIconKeyDown?: React.KeyboardEventHandler<HTMLElement>;

  /** `iconClick` event handler. */
  onIconClick?: React.MouseEventHandler<HTMLElement>;
}): JSX.Element {
  const { min, max } = props;
  const { maxlength, onFocus } = props;
  const { type = 'text', size } = props;
  const { id, modifiers = '', label } = props;
  const { autofocus = false, onPaste } = props;
  const { helper, onChange, value = '' } = props;
  const { name, transform = defaultTransform } = props;
  const { iconPosition = 'left', icon, onBlur } = props;
  const { onIconKeyDown, readonly = false, step } = props;
  const { onIconClick, autocomplete = 'on', placeholder } = props;
  const { debounceTimeout = 50, allowedKeys = {}, onKeyDown } = props;

  const isUserTyping = React.useRef(false);
  const [randomId] = React.useState(generateRandomId);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const isDisabled = (modifiers).includes('disabled');
  const className = buildClass('ui-textfield', modifiers);
  const [cursorPosition, setCursorPosition] = React.useState<number | null>(null);
  const [currentValue, setCurrentValue] = React.useState(() => transform(value, 0)[0]);

  // Memoizes global version of allowed keys RegExps (required for filtering out a whole text).
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
    clearTimeout(timeout.current as NodeJS.Timeout);
    isUserTyping.current = true;
    const filteredValue = (filter && globalAllowedKeys.default !== null)
      ? (event.target.value.match(globalAllowedKeys.default) || []).join('')
      : event.target.value;
    const { selectionStart } = event.target;
    const [newValue, newCursorPosition] = transform(filteredValue, selectionStart);
    setCurrentValue(newValue);
    if (newCursorPosition !== undefined) {
      setCursorPosition(newCursorPosition);
    } else {
      // At this point, the input's value has already changed, which means the cursor's position is
      // at n + 1, which is why we substract 1 when checking last position.
      const currentCursorPosition = event.target.selectionStart;
      const isAtTheEnd = currentCursorPosition - 1 >= currentValue.length;
      setCursorPosition(isAtTheEnd ? newValue.length : currentCursorPosition);
    }
    // This debounce system prevents triggering `onChange` callback too many times when user is
    // still typing to improve performance and make UI more reactive on low-perfomance devices.
    timeout.current = setTimeout(() => {
      isUserTyping.current = false;
      if (onChange !== undefined && onChange !== null) {
        onChange(newValue, event);
      }
    }, debounceTimeout);
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
    // `selectionStart` and `selectionEnd` do not exist on inputs with type `number`, so we just
    // want to replace the entire content when pasting something in that case.
    const selectionStart = (event.target as HTMLInputElement).selectionStart || 0;
    const selectionEnd = (event.target as HTMLInputElement).selectionEnd || currentValue.length;
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
    // Do not update current value immediatly while user is typing something else.
    if (!isUserTyping.current) {
      const [newValue] = transform(value, 0);
      setCurrentValue(newValue);
    }
  }, [value, transform]);

  // Re-positions cursor at the right place when using transform function.
  React.useEffect(() => {
    if (/^(url|text|tel|search|password)$/.test(type)) {
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
          className="ui-textfield__wrapper__icon"
          onClick={onIconClick as React.MouseEventHandler<HTMLSpanElement>}
          onKeyDown={onIconKeyDown as React.KeyboardEventHandler<HTMLSpanElement>}
        >
          <JSXUIIcon name={icon} />
        </span>
      )
      : null,
    <input
      key="input"
      max={max}
      min={min}
      step={step}
      size={size}
      type={type}
      name={name}
      id={randomId}
      ref={inputRef}
      disabled={isDisabled}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={currentValue}
      readOnly={readonly}
      maxLength={maxlength}
      autoFocus={autofocus}
      placeholder={placeholder}
      autoComplete={autocomplete}
      className="ui-textfield__wrapper__field"
      onPaste={(readonly === false && !isDisabled) ? handlePaste : undefined}
      onChange={(readonly === false && !isDisabled) ? handleChange : undefined}
      onKeyDown={(readonly === false && !isDisabled) ? handleKeyDown : undefined}
    />,
  ];

  return (
    <div
      id={id}
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

export default React.memo(UITextfield);
