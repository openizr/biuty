/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'sonar-ui/helpers/buildClass';
import generateRandomId from 'sonar-ui/helpers/generateRandomId';

const propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  modifiers: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  readonly: PropTypes.bool,
  maxlength: PropTypes.number,
  size: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  type: PropTypes.oneOf(['text', 'email', 'number', 'password', 'search', 'tel', 'url']),
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

const defaultProps = {
  id: null,
  label: null,
  helper: null,
  icon: null,
  value: '',
  size: null,
  min: null,
  max: null,
  step: null,
  type: 'text',
  readonly: false,
  maxlength: null,
  placeholder: null,
  iconPosition: 'left',
  modifiers: 'contained',
  onChange: (): null => null,
  onBlur: (): null => null,
};

/**
 * Text field.
 */
export default function UITextField(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { id, modifiers, label, helper, placeholder, iconPosition, icon, onChange,
    onBlur,
    value,
    type,
    size, max, min, step,
    maxlength, readonly,
  } = props;
  const [randomId] = React.useState(generateRandomId());
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [currentValue, setCurrentValue] = React.useState(value);
  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentValue(event.target.value);
    (onChange as (value: string) => null)(event.target.value);
  };
  const classes = buildClass('ui-text-field', (modifiers as string).split(' '));
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (inputRef.current !== null) {
      if (event.key === 'Escape') {
        inputRef.current.blur();
      } else if (event.key === 'Enter') {
        // const evt = new KeyboardEvent('keydown', {
        //   key: 'Tab', code: 'Tab', keyCode: 9, bubbles: true, cancelable: true, isTrusted: true,
        // } as any);
        // window.dispatchEvent(evt);
        // TODO find a way to trigger Tab
      }
    }
  };
  const children = [
    (icon !== null) ? <i key="icon" className="ui-button__icon">{icon}</i> : null,
    <input
      id={randomId}
      ref={inputRef}
      key={randomId}
      readOnly={readonly as boolean}
      maxLength={maxlength as number}
      size={size as number}
      max={max as number}
      min={min as number}
      step={step as number}
      className="ui-text-field__field"
      type={type as string}
      value={currentValue as string}
      placeholder={placeholder as string}
      onChange={changeValue}
      onKeyDown={onKeyDown}
      onBlur={
        (event: React.ChangeEvent<HTMLInputElement>): void => {
          (onBlur as (value: string) => null)(event.target.value);
        }
      }
    />,
  ];
  return (
    <div
      id={id as string}
      className={classes}
    >
      {(label !== null)
        ? <label className="ui-text-field__label" htmlFor={randomId}>{label}</label>
        : null}
      {(iconPosition === 'left') ? children : children.reverse()}
      {(helper !== null) ? <p className="ui-text-field__helper">{helper}</p> : null}
    </div>
  );
}

UITextField.propTypes = propTypes;
UITextField.defaultProps = defaultProps;
UITextField.displayName = 'UITextField';
