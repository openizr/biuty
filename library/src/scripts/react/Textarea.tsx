/**
 * Copyright (c) Openizr. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable react/no-danger, jsx-a11y/label-has-associated-control */

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
  onPaste: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  onKeyDown: PropTypes.func,
  autofocus: PropTypes.bool,
  autoresize: PropTypes.bool,
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
  onPaste: null,
  modifiers: '',
  onChange: null,
  readonly: false,
  maxlength: null,
  onKeyDown: null,
  autofocus: false,
  placeholder: null,
  autoresize: false,
  autocomplete: 'on',
  debounceTimeout: 0,
};

/**
 * Text area.
 */
function UITextarea(props: InferProps<typeof propTypes>): JSX.Element {
  const { name } = props;
  let { autoresize } = props;
  let { id, modifiers, label } = props;
  let { readonly, rows, cols } = props;
  let { helper, onChange, value } = props;
  let { onBlur, maxlength, onPaste } = props;
  let { autofocus, autocomplete, onKeyDown } = props;
  let { onFocus, debounceTimeout, placeholder } = props;

  id = id || null;
  value = value || '';
  cols = cols || null;
  rows = rows || null;
  label = label || null;
  helper = helper || null;
  onBlur = onBlur || null;
  onFocus = onFocus || null;
  onPaste = onPaste || null;
  modifiers = modifiers || '';
  onChange = onChange || null;
  readonly = readonly || false;
  maxlength = maxlength || null;
  onKeyDown = onKeyDown || null;
  autofocus = autofocus || false;
  autoresize = autoresize || false;
  placeholder = placeholder || null;
  autocomplete = autocomplete || 'on';
  debounceTimeout = debounceTimeout || 0;

  const [randomId] = React.useState(generateRandomId);
  const timeout = React.useRef<NodeJS.Timeout | null>(null);
  const [currentValue, setCurrentValue] = React.useState(value);
  const isDisabled = (modifiers as string).includes('disabled');
  const className = buildClass('ui-textarea', modifiers as string);
  rows = (autoresize && rows === null) ? Math.max(1, currentValue.split('\n').length) : rows;

  // -----------------------------------------------------------------------------------------------
  // CALLBACKS DECLARATION.
  // -----------------------------------------------------------------------------------------------

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event.target.value;
    setCurrentValue(newValue);
    if (onChange !== null) {
      window.clearTimeout(timeout.current as NodeJS.Timeout);
      // This debounce system prevents triggering `onChange` callback too many times when user is
      // still typing to save performance and make the UI more reactive on low-perfomance devices.
      timeout.current = setTimeout(() => {
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
    setCurrentValue(value as string);
  }, [value]);

  // -----------------------------------------------------------------------------------------------
  // COMPONENT RENDERING.
  // -----------------------------------------------------------------------------------------------

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null)
        ? <label className="ui-textarea__label" htmlFor={randomId} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
        : null}
      <div className="ui-textarea__wrapper">
        <textarea
          name={name}
          id={randomId}
          onBlur={handleBlur}
          onFocus={handleFocus}
          cols={cols as number}
          rows={rows as number}
          disabled={isDisabled}
          value={currentValue as string}
          readOnly={readonly as boolean}
          maxLength={maxlength as number}
          placeholder={placeholder as string}
          autoComplete={autocomplete as string}
          className="ui-textarea__wrapper__field"
          autoFocus={autofocus as boolean} // eslint-disable-line jsx-a11y/no-autofocus
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

UITextarea.propTypes = propTypes;
UITextarea.defaultProps = defaultProps;
UITextarea.displayName = 'UITextarea';

export default React.memo(UITextarea);
