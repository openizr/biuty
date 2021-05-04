/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const optionType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

const propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  modifiers: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(optionType).isRequired).isRequired,
};

const defaultProps = {
  id: null,
  value: '',
  label: null,
  helper: null,
  onFocus: null,
  modifiers: '',
  onChange: null,
};

/**
 * Radio.
 */
export default function UIRadio(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { id, modifiers, label, helper, value, name, options, onFocus } = props;
  const [randomId] = React.useState(generateRandomId);
  const [currentValue, setCurrentValue] = React.useState(value);
  const className = buildClass('ui-radio', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentValue(event.target.value);
    if (props.onChange !== undefined && props.onChange !== null) {
      props.onChange(event.target.value);
    }
  };

  const focusField = (focusedValue: string) => (): void => {
    if (onFocus !== undefined && onFocus !== null) {
      onFocus(focusedValue);
    }
  };

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null) ? <label className="ui-radio__label" htmlFor={randomId}>{label}</label> : null}
      <div className="ui-radio__wrapper">
        {options.map((option) => {
          const isChecked = currentValue === option.value;
          const isDisabled = option.disabled === true;
          const optionClassName = buildClass('ui-radio__wrapper__option', [isChecked ? 'checked' : '', isDisabled ? 'disabled' : '']);
          return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label key={option.value} className={optionClassName}>
              <input
                name={name}
                type="radio"
                checked={isChecked}
                value={option.value}
                disabled={isDisabled}
                onChange={onChange}
                onFocus={focusField(option.value)}
                className="ui-radio__wrapper__option__radio"
                tabIndex={((modifiers as string).includes('disabled') || isDisabled ? -1 : 0)}
              />
              <span className="ui-radio__wrapper__option__label">{option.label}</span>
            </label>
          );
        })}
      </div>
      {(helper !== null) ? <span className="ui-radio__wrapper__helper">{helper}</span> : null}
    </div>
  );
}

UIRadio.propTypes = propTypes;
UIRadio.defaultProps = defaultProps;
UIRadio.displayName = 'UIRadio';
