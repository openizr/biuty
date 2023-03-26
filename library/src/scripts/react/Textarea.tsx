/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import markdown from 'scripts/helpers/markdown';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

/**
 * Text area.
 */
function UITextarea(props: UITextareaProps & {
  /** `focus` event handler. */
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;

  /** `change` event handler. */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;

  /** `blur` event handler. */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;

  /** `paste` event handler. */
  onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;

  /** `keyDown` event handler. */
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}): JSX.Element {
  let { rows } = props;
  const { name } = props;
  const { autoresize = false } = props;
  const { readonly = false, cols } = props;
  const { id, modifiers = '', label } = props;
  const { onBlur, maxlength, onPaste } = props;
  const { helper, onChange, value = '' } = props;
  const { onFocus, debounceTimeout = 50, placeholder } = props;
  const { autofocus = false, autocomplete = 'on', onKeyDown } = props;

  const isUserTyping = React.useRef(false);
  const [randomId] = React.useState(generateRandomId);
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const [currentValue, setCurrentValue] = React.useState(value);
  const isDisabled = modifiers.includes('disabled');
  const className = buildClass('ui-textarea', modifiers);
  rows = (autoresize && rows === null) ? Math.max(1, currentValue.split('\n').length) : rows;

  // -----------------------------------------------------------------------------------------------
  // CALLBACKS DECLARATION.
  // -----------------------------------------------------------------------------------------------

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    clearTimeout(timeout.current as NodeJS.Timeout);
    isUserTyping.current = true;
    const newValue = event.target.value;
    setCurrentValue(newValue);
    if (onChange !== null) {
      // This debounce system prevents triggering `onChange` callback too many times when user is
      // still typing to save performance and make the UI more reactive on low-perfomance devices.
      timeout.current = setTimeout(() => {
        isUserTyping.current = false;
        (onChange as JSXElement)(newValue, event);
      }, debounceTimeout as number);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    if (onBlur !== undefined && onBlur !== null) {
      onBlur(currentValue, event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    if (onFocus !== undefined && onFocus !== null) {
      onFocus(currentValue, event);
    }
  };

  // -----------------------------------------------------------------------------------------------
  // PROPS REACTIVITY MANAGEMENT.
  // -----------------------------------------------------------------------------------------------

  // Updates current value whenever `value` prop changes.
  React.useEffect(() => {
    // Do not update current value immediatly while user is typing something else.
    if (!isUserTyping.current) {
      setCurrentValue(value);
    }
  }, [value]);

  // -----------------------------------------------------------------------------------------------
  // COMPONENT RENDERING.
  // -----------------------------------------------------------------------------------------------

  return (
    <div
      id={id}
      className={className}
    >
      {(label !== null)
        ? <label className="ui-textarea__label" htmlFor={randomId} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
        : null}
      <div className="ui-textarea__wrapper">
        <textarea
          cols={cols}
          rows={rows}
          name={name}
          id={randomId}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={isDisabled}
          maxLength={maxlength}
          value={currentValue}
          readOnly={readonly}
          autoFocus={autofocus}
          placeholder={placeholder}
          autoComplete={autocomplete}
          className="ui-textarea__wrapper__field"
          onChange={(readonly === false && !isDisabled) ? handleChange : undefined}
          onPaste={(readonly === false && !isDisabled) ? onPaste as JSXElement : undefined}
          onKeyDown={(readonly === false && !isDisabled) ? onKeyDown as JSXElement : undefined}
        />
      </div>
      {(helper !== null)
        ? <span className="ui-textarea__helper" dangerouslySetInnerHTML={{ __html: markdown(helper) }} />
        : null}
    </div>
  );
}

export default React.memo(UITextarea);
