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

const optionType = {
  type: PropTypes.oneOf(['header', 'divider', 'option']).isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  helper: PropTypes.string,
  modifiers: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ]),
  options: PropTypes.arrayOf(PropTypes.shape(optionType).isRequired).isRequired,
};

const defaultProps = {
  id: null,
  value: [],
  icon: null,
  label: null,
  helper: null,
  onFocus: null,
  modifiers: '',
  onChange: null,
  multiple: false,
};

type Mapping = Record<string, string>;
type Option = InferProps<typeof optionType>;
const findOption = (value: string) => (options: Option[]): number => (
  options.findIndex((option) => value === option.value && option.value !== undefined)
);
const toArray = (value: string | string[]): string[] => (Array.isArray(value) ? value : [value]);
const generateMapping = (mapping: Mapping, option: Option): Mapping => (
  (option.value !== undefined && option.label !== undefined)
    ? ({ ...mapping, [option.value as string]: markdown(option.label as string) })
    : mapping
);

/**
 * Dropdown.
 */
export default function UIDropdown(props: InferProps<typeof propTypes>): JSX.Element {
  const {
    options, id, modifiers, multiple, label, helper, icon, name, onChange, value, onFocus,
  } = props;

  const findSiblingOption = (startIndex: number, direction: number, offset = 1): number => {
    const nextIndex = startIndex + direction * offset;
    if (nextIndex < 0 || nextIndex >= options.length) {
      return startIndex;
    }
    const option = options[nextIndex];
    return (option.value !== undefined && option.disabled !== true)
      ? nextIndex
      : findSiblingOption(startIndex, direction, offset + 1);
  };

  const ulRef = React.useRef<HTMLUListElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [randomId] = React.useState(generateRandomId);
  const [mounted, setMounted] = React.useState(false);
  const [position, setPosition] = React.useState('bottom');
  const [mapping, setMapping] = React.useState(options.reduce(generateMapping, {}));
  const [isDisplayed, setIsDisplayed] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(toArray(value as unknown as string));
  const [focusedOption, setFocusedOption] = React.useState(findOption(currentValue[0])(options));
  const className = buildClass('ui-dropdown', (modifiers as string).split(' '));

  const clearOptions = (): void => {
    setCurrentValue([]);
  };

  const focusField = (focusedValue?: string) => (): void => {
    if (onFocus !== undefined && onFocus !== null) {
      onFocus(focusedValue);
    }
  };

  const focusOption = (optionIndex: number): void => {
    if (ulRef.current !== null && ulRef.current.childNodes.length > 0) {
      (ulRef.current.childNodes[optionIndex] as HTMLElement).focus();
    }
    setFocusedOption(optionIndex);
    focusField((options[optionIndex] || {}).value as string)();
  };

  const displayList = (): void => {
    const relativeOffsetTop = (buttonRef.current as HTMLInputElement).getBoundingClientRect().top;
    setPosition((relativeOffsetTop > window.innerHeight / 2) ? 'top' : 'bottom');
    setIsDisplayed(true);
  };

  const hideList = (force = false) => (event: React.FocusEvent<HTMLElement> | null): void => {
    // We first ensure that the newly focused element is not an option of the list.
    const focusIsOutsideList = (event !== null)
      ? !event.currentTarget.contains(event.relatedTarget as Node)
      : true;
    if (focusIsOutsideList && (force === true || multiple === false)) {
      setIsDisplayed(false);
    }
  };

  const toggleOption = (optionIndex: number) => (): void => {
    let newValue;
    const selectedValue = options[optionIndex].value as string;
    if (multiple === false) {
      newValue = [selectedValue];
    } else {
      const selectedIndex = currentValue.indexOf(selectedValue);
      newValue = (selectedIndex >= 0)
        ? currentValue.slice(0, selectedIndex).concat(currentValue.slice(selectedIndex + 1))
        : currentValue.concat([selectedValue]);
    }
    setCurrentValue(newValue);
    if (onChange !== undefined && onChange !== null) {
      onChange(multiple ? newValue : newValue[0]);
    }
  };

  const selectOption = (optionIndex: number) => (): void => {
    focusOption(optionIndex);
    toggleOption(optionIndex)();
    hideList()(null);
  };

  const navigate = (event: React.KeyboardEvent<HTMLElement>): void => {
    const { key } = event;
    // `event.preventDefault` is not called globally to avoid preventing tabs.
    switch (key) {
      case 'ArrowUp':
        focusOption(findSiblingOption(focusedOption, -1));
        event.preventDefault();
        break;
      case 'ArrowDown':
        focusOption(findSiblingOption(focusedOption, +1));
        event.preventDefault();
        break;
      case 'PageUp':
      case 'Home':
        focusOption(Math.max(0, findSiblingOption(-1, +1)));
        event.preventDefault();
        break;
      case 'End':
      case 'PageDown':
        focusOption(Math.min(options.length - 1, findSiblingOption(options.length, -1)));
        event.preventDefault();
        break;
      case ' ':
      case 'Enter':
        if (isDisplayed === false) {
          setIsDisplayed(true);
        } else {
          selectOption(focusedOption)();
        }
        event.preventDefault();
        break;
      case 'Escape':
        hideList(true)(null);
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  // Prevents focusing the dropdown at component mount.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Updates current value each time the `value` property is changed.
  React.useEffect(() => {
    const newValue = toArray(value as unknown as string);
    setCurrentValue(newValue);
    setFocusedOption(findOption(newValue[0])(options));
  }, [value]);

  // Avoids having to pass through the entire options array at each rendering.
  React.useEffect(() => {
    setMapping(options.reduce(generateMapping, {}));
    if (focusedOption >= options.length) {
      setFocusedOption(Math.min(0, findSiblingOption(options.length - 1, -1)));
    }
  }, [options]);

  // HTML elements with `display: none` can't be focused. Thus, we need to wait for the HTML list to
  // be displayed before actually focusing it.
  React.useEffect(() => {
    if (ulRef.current !== null && isDisplayed === true) {
      focusOption(Math.max(0, focusedOption));
    } else if (isDisplayed === false && buttonRef.current !== null && mounted === true) {
      buttonRef.current.focus();
    }
  }, [isDisplayed]);

  return (
    <div
      id={id as string}
      className={className}
    >
      {(label !== null && label !== undefined)
        // eslint-disable-next-line react/no-danger, jsx-a11y/label-has-associated-control
        ? <label className="ui-dropdown__label" htmlFor={randomId} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
        : null}
      <div className="ui-dropdown__wrapper">
        <button
          name={name}
          type="button"
          id={randomId}
          ref={buttonRef}
          onKeyDown={navigate}
          onFocus={focusField()}
          aria-haspopup="listbox"
          onMouseDown={displayList}
          className="ui-dropdown__wrapper__field"
          aria-labelledby={`${randomId} ${randomId}`}
          tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: currentValue.map((option) => mapping[option]).join(', ') }}
        />
        {(icon !== null)
          ? (
            <button
              type="button"
              id={`${randomId}icon`}
              onClick={clearOptions}
              className="ui-dropdown__wrapper__clear-button"
              aria-labelledby={`${randomId} ${randomId}icon`}
              tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
            >
              <i className="ui-dropdown__wrapper__clear-button__icon">{icon}</i>
            </button>
          )
          : null}
        <ul
          ref={ulRef}
          tabIndex={-1}
          role="listbox"
          onKeyDown={navigate}
          onBlur={hideList(true)}
          aria-labelledby={randomId}
          aria-expanded={isDisplayed}
          aria-activedescendant={`${randomId}${(focusedOption)}`}
          className={buildClass('ui-dropdown__wrapper__list', (isDisplayed === true) ? [position, 'expanded'] : [position])}
        >
          {options.map((option, index) => {
            const key = `${randomId}${index}`;
            const optionModifiers = (option.disabled === true) ? ['disabled'] : [];
            if (currentValue.includes(option.value as string)) {
              optionModifiers.push('selected');
            }
            return (
              <li
                id={key}
                key={key}
                tabIndex={-1}
                aria-selected={focusedOption === index}
                role={(option.type === 'option') ? 'option' : undefined}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: markdown(option.label || '') }}
                onMouseDown={(option.type === 'option') ? selectOption(index) : undefined}
                className={buildClass(`ui-dropdown__wrapper__list__${option.type}`, optionModifiers)}
              />
            );
          })}
        </ul>
      </div>
      {(helper !== null) ? <span className="ui-dropdown__helper">{helper}</span> : null}
    </div>
  );
}

UIDropdown.propTypes = propTypes;
UIDropdown.defaultProps = defaultProps;
UIDropdown.displayName = 'UIDropdown';
