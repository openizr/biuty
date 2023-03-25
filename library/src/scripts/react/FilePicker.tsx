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
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const JSXUIIcon = UIIcon as JSXElement;

const propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  modifiers: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  value: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    lastModified: PropTypes.number.isRequired,
  }).isRequired),
};

const defaultProps = {
  id: null,
  value: [],
  icon: null,
  label: null,
  helper: null,
  accept: null,
  onBlur: null,
  onFocus: null,
  modifiers: '',
  onChange: null,
  multiple: false,
  placeholder: null,
  iconPosition: 'left',
};

const defaultValue: File[] = [];

/**
 * File picker.
 */
function UIFilePicker(props: InferProps<typeof propTypes>): JSX.Element {
  const { name } = props;
  let { placeholder } = props;
  let { value, onBlur, onFocus } = props;
  let { accept, id, modifiers } = props;
  let { icon, onChange, multiple } = props;
  let { label, helper, iconPosition } = props;

  // Enforces props default values.
  id = id || null;
  icon = icon || null;
  label = label || null;
  helper = helper || null;
  accept = accept || null;
  onBlur = onBlur || null;
  onFocus = onFocus || null;
  onChange = onChange || null;
  modifiers = modifiers || '';
  multiple = multiple || false;
  value = value || defaultValue;
  placeholder = placeholder || null;
  iconPosition = iconPosition || 'left';

  const [randomId] = React.useState(generateRandomId);
  const [currentValue, setCurrentValue] = React.useState<File[]>(value as File[]);
  const className = buildClass('ui-file-picker', `${modifiers}${(multiple ? ' multiple' : '')}`);

  // -----------------------------------------------------------------------------------------------
  // CALLBACKS DECLARATION.
  // -----------------------------------------------------------------------------------------------

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = [];
    const numberOfFiles = ((event.target.files as FileList).length);
    for (let index = 0; index < numberOfFiles; index += 1) {
      files.push((event.target.files as FileList)[index]);
    }
    setCurrentValue(files);
    if (onChange !== null) {
      (onChange as JSXElement)(files, event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (onFocus !== null) {
      (onFocus as JSXElement)(currentValue, event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (onBlur !== null) {
      (onBlur as JSXElement)(currentValue, event);
    }
  };

  // -----------------------------------------------------------------------------------------------
  // PROPS REACTIVITY MANAGEMENT.
  // -----------------------------------------------------------------------------------------------

  // Updates current value whenever `value` prop changes.
  React.useEffect(() => {
    setCurrentValue(value as File[]);
  }, [value]);

  // -----------------------------------------------------------------------------------------------
  // COMPONENT RENDERING.
  // -----------------------------------------------------------------------------------------------

  const children = [
    (icon !== null && icon !== undefined) ? <JSXUIIcon key="icon" name={icon} /> : null,
    <input
      key="file"
      type="file"
      name={name}
      id={randomId}
      multiple={multiple}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      accept={accept as string}
      className="ui-file-picker__wrapper__field"
      tabIndex={modifiers.includes('disabled') ? -1 : 0}
    />,
  ];
  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null && label !== undefined)
        ? <label className="ui-file-picker__label" htmlFor={randomId} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
        : null}
      <div className="ui-file-picker__wrapper">
        {(iconPosition === 'left') ? children : children.reverse()}
        <span className="ui-file-picker__wrapper__placeholder">
          {(currentValue.length === 0) ? placeholder : currentValue.map((file) => file.name).join(', ')}
        </span>
      </div>
      {(helper !== null && helper !== undefined)
        ? <span className="ui-file-picker__helper" dangerouslySetInnerHTML={{ __html: markdown(helper) }} />
        : null}
    </div>
  );
}

UIFilePicker.propTypes = propTypes;
UIFilePicker.defaultProps = defaultProps;
UIFilePicker.displayName = 'UIFilePicker';

export default React.memo(UIFilePicker);
