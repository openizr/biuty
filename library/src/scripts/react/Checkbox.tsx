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
  label: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  modifiers: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string.isRequired),
  options: PropTypes.arrayOf(PropTypes.shape(optionType).isRequired).isRequired,
};

const defaultProps = {
  id: null,
  label: null,
  helper: null,
  value: [],
  modifiers: '',
  onFocus: null,
  onChange: null,
};

/**
 * Checkbox.
 */
export default function UICheckbox(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { id, modifiers, label, helper, value, name, options, onFocus } = props;
  const [randomId] = React.useState(generateRandomId);
  const [currentValue, setCurrentValue] = React.useState(value as string[]);
  const className = buildClass('ui-checkbox', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(value as string[]);
  }, [value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedIndex = currentValue.indexOf(event.target.value);
    const newValue = (selectedIndex >= 0)
      ? currentValue.slice(0, selectedIndex).concat(currentValue.slice(selectedIndex + 1))
      : currentValue.concat([event.target.value]);
    setCurrentValue(newValue);
    if (props.onChange !== undefined && props.onChange !== null) {
      props.onChange(newValue);
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
      {(label !== null) ? <label className="ui-checkbox__label" htmlFor={randomId}>{label}</label> : null}
      <div className="ui-checkbox__wrapper">
        {options.map((option) => {
          const isChecked = currentValue.includes(option.value);
          const isDisabled = option.disabled === true;
          const optionClassName = buildClass('ui-checkbox__wrapper__option', [isChecked ? 'checked' : '', isDisabled ? 'disabled' : '']);
          return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label key={option.value} className={optionClassName}>
              <input
                name={name}
                type="checkbox"
                checked={isChecked}
                value={option.value}
                disabled={isDisabled}
                onChange={onChange}
                onFocus={focusField(option.value)}
                className="ui-checkbox__wrapper__option__checkbox"
                tabIndex={((modifiers as string).includes('disabled') || isDisabled ? -1 : 0)}
              />
              <span className="ui-checkbox__wrapper__option__label">{option.label}</span>
            </label>
          );
        })}
      </div>
      {(helper !== null) ? <span className="ui-checkbox__wrapper__helper">{helper}</span> : null}
    </div>
  );
}

UICheckbox.propTypes = propTypes;
UICheckbox.defaultProps = defaultProps;
UICheckbox.displayName = 'UICheckbox';
