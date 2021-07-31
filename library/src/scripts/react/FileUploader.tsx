/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import markdown from 'scripts/helpers/markdown';
import PropTypes, { InferProps } from 'prop-types';
import buildClass from 'scripts/helpers/buildClass';
import generateRandomId from 'scripts/helpers/generateRandomId';

const propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  modifiers: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  value: PropTypes.arrayOf(PropTypes.instanceOf(File).isRequired),
};

const defaultProps = {
  id: null,
  value: [],
  icon: null,
  label: null,
  helper: null,
  accept: null,
  onFocus: null,
  modifiers: '',
  multiple: false,
  placeholder: null,
  onChange: undefined,
  iconPosition: 'left',
};

/**
 * File uploader.
 */
export default function UIFileUploader(props: InferProps<typeof propTypes>): JSX.Element {
  const { value } = props;
  const { accept, id, modifiers } = props;
  const { icon, onChange, multiple } = props;
  const { name, placeholder, onFocus } = props;
  const { label, helper, iconPosition } = props;
  const [randomId] = React.useState(generateRandomId);
  const [currentValue, setCurrentValue] = React.useState<File[]>(value as File[]);
  const className = buildClass('ui-file-uploader', (modifiers as string).split(' '));

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    setCurrentValue(value as File[]);
  }, [value]);

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = [];
    const numberOfFiles = (event.target.files?.length || 0);
    for (let index = 0; index < numberOfFiles; index += 1) {
      files.push((event.target.files as FileList)[index]);
    }
    setCurrentValue(files);
    if (onChange !== undefined && onChange !== null) {
      onChange(files);
    }
  };

  const focusField = (): void => {
    if (onFocus !== undefined && onFocus !== null) {
      onFocus(currentValue);
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
      accept={accept as string}
      multiple={multiple as boolean}
      className="ui-file-uploader__field"
    />,
  ];
  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null && label !== undefined)
        // eslint-disable-next-line react/no-danger, jsx-a11y/label-has-associated-control
        ? <label className="ui-file-uploader__label" htmlFor={randomId} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
        : null}
      {(iconPosition === 'left') ? children : children.reverse()}
      <span className="ui-file-uploader__files-list">{(currentValue.length === 0) ? placeholder : currentValue.map((file) => file.name).join(', ')}</span>
      {(helper !== null) ? <p className="ui-file-uploader__helper">{helper}</p> : null}
    </div>
  );
}

UIFileUploader.propTypes = propTypes;
UIFileUploader.defaultProps = defaultProps;
UIFileUploader.displayName = 'UIFileUploader';
