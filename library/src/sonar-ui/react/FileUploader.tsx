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
  onFocus: PropTypes.func,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  modifiers: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

const defaultProps = {
  id: null,
  icon: null,
  label: null,
  helper: null,
  onFocus: null,
  modifiers: '',
  multiple: false,
  placeholder: null,
  iconPosition: 'left',
  onChange: (): null => null,
};

/**
 * File uploader.
 */
export default function UIFileUploader(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    id, modifiers, label, helper, iconPosition, icon,
    onChange, multiple, name, placeholder, onFocus,
  } = props;
  const [randomId] = React.useState(generateRandomId);
  const [currentValue, setCurrentValue] = React.useState([] as string[]);
  const className = buildClass('ui-file-uploader', (modifiers as string).split(' '));

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = [];
    const numberOfFiles = (event.target.files?.length || 0);
    for (let index = 0; index < numberOfFiles; index += 1) {
      files.push((event.target.files as FileList)[index]);
    }
    setCurrentValue(files.map((file) => file.name));
    if (onChange !== undefined && onChange !== null) {
      onChange(files);
    }
  };

  const focusField = (): void => {
    if (onFocus !== undefined && onFocus !== null) {
      onFocus();
    }
  };

  const children = [
    (icon !== null) ? <i key="icon" className="ui-button__icon">{icon}</i> : null,
    <input
      type="file"
      name={name}
      id={randomId}
      key={randomId}
      onFocus={focusField}
      onChange={changeValue}
      multiple={multiple as boolean}
      className="ui-file-uploader__field"
    />,
  ];
  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null)
        ? <label className="ui-file-uploader__label" htmlFor={randomId}>{label}</label>
        : null}
      {(iconPosition === 'left') ? children : children.reverse()}
      <span className="ui-file-uploader__files-list">{(currentValue.length === 0) ? placeholder : currentValue.join(', ')}</span>
      {(helper !== null) ? <p className="ui-file-uploader__helper">{helper}</p> : null}
    </div>
  );
}

UIFileUploader.propTypes = propTypes;
UIFileUploader.defaultProps = defaultProps;
UIFileUploader.displayName = 'UIFileUploader';
