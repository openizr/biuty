/**
 * Copyright (c) KivFinance, Inc.
 * All rights reserved.
 */

import * as React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'sonar-ui/helpers/buildClass';

const propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.string,
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
  value: '',
  selected: '',
  modifiers: '',
  onChange: null,
  readonly: false,
};

/**
 * Radio.
 */
export default function UIRadio(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { id, modifiers, label, helper, onChange, value, name, readonly, selected } = props;
  const [currentValue, setCurrentValue] = React.useState(selected);
  const className = buildClass('ui-radio', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(selected);
  }, [selected]);

  const changeValue = (): void => {
    setCurrentValue(value);
    if (onChange !== undefined && onChange !== null) {
      onChange(value);
    }
  };

  return (
    <div
      id={id as string}
      className={className}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="ui-radio__wrapper">
        <input
          name={name}
          type="radio"
          value={value as string}
          checked={currentValue === value}
          className="ui-radio__wrapper__field"
          onChange={(readonly === false) ? changeValue : undefined}
          tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
        />
        {(label !== null) ? <span className="ui-radio__wrapper__label">{label}</span> : null}
      </label>
      {(helper !== null) ? <span className="ui-radio__wrapper__helper">{helper}</span> : null}
    </div>
  );
}

UIRadio.propTypes = propTypes;
UIRadio.defaultProps = defaultProps;
UIRadio.displayName = 'UIRadio';
