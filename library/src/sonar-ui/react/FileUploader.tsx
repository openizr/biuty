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
  multiple: PropTypes.bool,
  modifiers: PropTypes.string,
  name: PropTypes.string.isRequired,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

const defaultProps = {
  id: null,
  label: null,
  helper: null,
  icon: null,
  multiple: false,
  iconPosition: 'left',
  modifiers: 'contained',
  onChange: (): null => null,
};

/**
 * File uploader.
 */
export default function UIFileUploader(props: InferProps<typeof propTypes>): JSX.Element {
  // eslint-disable-next-line object-curly-newline
  const { id, modifiers, label, helper, iconPosition, icon, onChange, multiple, name } = props;
  const [randomId] = React.useState(generateRandomId());
  const className = buildClass('ui-file-uploader', (modifiers as string).split(' '));

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange !== undefined && onChange !== null) {
      onChange(event.target.files);
    }
  };

  const children = [
    (icon !== null) ? <i key="icon" className="ui-button__icon">{icon}</i> : null,
    <input
      type="file"
      name={name}
      id={randomId}
      key={randomId}
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
      {(helper !== null) ? <p className="ui-file-uploader__helper">{helper}</p> : null}
    </div>
  );
}

UIFileUploader.propTypes = propTypes;
UIFileUploader.defaultProps = defaultProps;
UIFileUploader.displayName = 'UIFileUploader';
