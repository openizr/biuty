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

const JSXUIIcon = UIIcon as JSXElement;

const defaultValue: File[] = [];

/**
 * File picker.
 */
function UIFilePicker(props: UIFilePickerProps & {
  /** `blur` event handler. */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /** `focus` event handler. */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /** `change` event handler. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
  const { name } = props;
  const { placeholder } = props;
  const { icon, onChange, multiple } = props;
  const { accept, id, modifiers = '' } = props;
  const { label, helper, iconPosition = 'left' } = props;
  const { value = defaultValue, onBlur, onFocus } = props;

  const [randomId] = React.useState(generateRandomId);
  const [currentValue, setCurrentValue] = React.useState<File[]>(value);
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
    setCurrentValue(value);
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
      accept={accept}
      multiple={multiple}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      className="ui-file-picker__wrapper__field"
      tabIndex={modifiers.includes('disabled') ? -1 : 0}
    />,
  ];
  return (
    <div
      id={id}
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

export default React.memo(UIFilePicker);
