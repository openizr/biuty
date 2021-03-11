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
  cols: PropTypes.number,
  rows: PropTypes.number,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  maxlength: PropTypes.number,
  modifiers: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  id: null,
  cols: null,
  rows: null,
  value: '',
  label: null,
  helper: null,
  modifiers: '',
  onBlur: null,
  onChange: null,
  readonly: false,
  maxlength: null,
  placeholder: null,
};

/**
 * Textarea.
 */
export default function UITextarea(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    id, modifiers, label, helper, onChange, value, name,
    placeholder, readonly, rows, cols, onBlur, maxlength,
  } = props;
  const [randomId] = React.useState(generateRandomId());
  const [currentValue, setCurrentValue] = React.useState(value);
  const className = buildClass('ui-textarea', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const changeValue = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCurrentValue(event.target.value);
    if (onChange !== undefined && onChange !== null) {
      onChange(event.target.value);
    }
  };

  const blurField = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (onBlur !== undefined && onBlur !== null) {
      onBlur(event.target.value);
    }
  };

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null) ? <label className="ui-textarea__label" htmlFor={randomId}>{label}</label> : null}
      <textarea
        name={name}
        id={randomId}
        onBlur={blurField}
        cols={cols as number}
        rows={rows as number}
        className="ui-textarea__field"
        value={currentValue as string}
        readOnly={readonly as boolean}
        maxLength={maxlength as number}
        placeholder={placeholder as string}
        onChange={(readonly === false) ? changeValue : undefined}
        tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
      />
      {(helper !== null) ? <span className="ui-textarea__helper">{helper}</span> : null}
    </div>
  );
}

UITextarea.propTypes = propTypes;
UITextarea.defaultProps = defaultProps;
UITextarea.displayName = 'UITextarea';
