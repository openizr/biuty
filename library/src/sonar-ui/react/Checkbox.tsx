/**
 * Copyright (c) KivFinance, Inc.
 * All rights reserved.
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'sonar-ui/helpers/buildClass';
import generateRandomId from 'sonar-ui/helpers/generateRandomId';

const propTypes = {
  id: PropTypes.string,
  value: PropTypes.bool,
  label: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  modifiers: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  label: null,
  helper: null,
  value: false,
  modifiers: '',
  onChange: null,
  readonly: false,
};

/**
 * Checkbox.
 */
export default function UICheckbox(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { id, modifiers, label, helper, onChange, value, name, readonly } = props;
  const [randomId] = React.useState(generateRandomId());
  const [currentValue, setCurrentValue] = React.useState(value);
  const className = buildClass('ui-checkbox', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentValue(event.target.checked);
    if (onChange !== undefined && onChange !== null) {
      onChange(event.target.checked);
    }
  };

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null) ? <label className="ui-checkbox__label" htmlFor={randomId}>{label}</label> : null}
      <input
        name={name}
        id={randomId}
        type="checkbox"
        readOnly={readonly as boolean}
        checked={currentValue as boolean}
        onChange={(readonly === false) ? changeValue : undefined}
        tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
      />
      {(helper !== null) ? <span className="ui-checkbox__helper">{helper}</span> : null}
    </div>
  );
}

UICheckbox.propTypes = propTypes;
UICheckbox.defaultProps = defaultProps;
UICheckbox.displayName = 'UICheckbox';
