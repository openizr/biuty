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

const optionType = {
  type: PropTypes.oneOf(['header', 'divider', 'option']).isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const propTypes = {
  id: PropTypes.string,
  multiple: PropTypes.bool,
  helper: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(optionType).isRequired).isRequired,
  label: PropTypes.string,
  modifiers: PropTypes.string,
  clearIcon: PropTypes.string,
  defaultOptions: PropTypes.arrayOf(PropTypes.string.isRequired),
  onChange: PropTypes.func,
};

const defaultProps = {
  id: null,
  label: null,
  helper: null,
  multiple: false,
  clearIcon: null,
  defaultOptions: [],
  modifiers: 'contained',
  onChange: (): null => null,
};

type options = InferProps<typeof optionType>[];

const findSiblingOption = (
  options: options,
  currentIndex: number,
  direction: number,
  lastOption: (number | null) = null,
): number => {
  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= options.length) {
    return lastOption || currentIndex;
  }
  const option = options[nextIndex];
  return (option.value !== undefined && option.disabled !== true)
    ? nextIndex
    : findSiblingOption(options, nextIndex, direction, lastOption || currentIndex);
};

/**
 * Dropdown.
 */
export default function UIDropdown(props: InferProps<typeof propTypes>): JSX.Element {
  // TODO WE DON'T WANT TO TRIGGER ONCHANGE WHEN DEFAULT OPTION IS UPDATED AND NO OPTION IS SELECTED
  // eslint-disable-next-line object-curly-newline
  const { options, id, modifiers, defaultOptions, multiple, label, helper, clearIcon,
    onChange,
  } = props;
  const [randomId] = React.useState(generateRandomId());
  const [position, setPosition] = React.useState('bottom');
  const [isDisplayed, setIsDisplayed] = React.useState(false);
  const [focusedOption, setFocusedOption] = React.useState(-1);
  const [mapping, setMapping] = React.useState({} as Record<string, string>);
  const [selectedOptions, setSelectedOptions] = React.useState(defaultOptions as string[]);
  const classes = buildClass('ui-dropdown', (modifiers as string).split(' '));
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);
  const initial = React.useRef(false);

  // Avoids having to pass through the entire options array at each rendering.
  React.useEffect(() => {
    setMapping(options.reduce((finalMapping, option) => {
      if (option.value !== undefined) {
        return { ...finalMapping, [option.value as string]: option.label };
      }
      return finalMapping;
    }, {}));
  }, [options]);

  React.useEffect(() => {
    (onChange as any)(selectedOptions);
  }, [selectedOptions]);

  React.useEffect(() => {
    if (
      selectedOptions.length === 0
      && JSON.stringify(selectedOptions) !== JSON.stringify(defaultOptions)) {
      setSelectedOptions(defaultOptions as string[]);
    }
  }, [defaultOptions]);

  // HTML elements with `display: none` can't be focused. Thus, we need to wait for the HTML list to
  // be displayed before actually focusing it.
  React.useEffect(() => {
    if (ulRef.current !== null && isDisplayed === true) {
      const focusedIndex = (focusedOption >= 0) ? focusedOption : findSiblingOption(options, 0, +1);
      (ulRef.current.childNodes[focusedIndex] as HTMLElement).focus();
      setFocusedOption(focusedIndex);
    } else if (isDisplayed === false && buttonRef.current !== null && initial.current === true) {
      buttonRef.current.focus();
    }
  }, [isDisplayed]);

  React.useEffect(() => {
    if (ulRef.current !== null && focusedOption >= 0 && isDisplayed === true) {
      (ulRef.current.childNodes[focusedOption] as HTMLElement).focus();
    }
  }, [focusedOption]);

  React.useEffect(() => {
    initial.current = true;
  }, []);

  const clearOptions = (): void => {
    setSelectedOptions([options[findSiblingOption(options, 0, +1)].value as string]);
  };

  const displayList = (): void => {
    if (buttonRef.current !== null) {
      const relativeOffsetTop = buttonRef.current.getBoundingClientRect().top;
      setPosition((relativeOffsetTop > window.innerHeight / 2) ? 'top' : 'bottom');
      setIsDisplayed(true);
    }
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
    const selectedOption = options[optionIndex].value as string;
    if (multiple === false) {
      setSelectedOptions([selectedOption]);
    } else {
      const selectedIndex = selectedOptions.indexOf(selectedOption);
      setSelectedOptions((selectedIndex >= 0)
        ? selectedOptions.slice(0, selectedIndex).concat(selectedOptions.slice(selectedIndex + 1))
        : selectedOptions.concat([selectedOption]));
    }
  };

  const clickOnOption = (optionIndex: number) => (): void => {
    setFocusedOption(optionIndex);
    toggleOption(optionIndex)();
    hideList()(null);
  };

  const navigate = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (ulRef.current !== null) {
      const { key } = event;
      switch (key) {
        case 'ArrowUp':
          setFocusedOption(findSiblingOption(options, focusedOption, -1));
          event.preventDefault();
          break;
        case 'ArrowDown':
          setFocusedOption(findSiblingOption(options, focusedOption, +1));
          event.preventDefault();
          break;
        case 'PageUp':
        case 'Home':
          setFocusedOption(findSiblingOption(options, 0, +1));
          event.preventDefault();
          break;
        case 'End':
        case 'PageDown':
          setFocusedOption(findSiblingOption(options, options.length, -1));
          event.preventDefault();
          break;
        case ' ':
        case 'Enter':
          if (isDisplayed === false) {
            setIsDisplayed(true);
          } else {
            toggleOption(focusedOption)();
            hideList()(null);
          }
          break;
        case 'Escape':
          hideList(true)(null);
          break;
        default:
          break;
      }
    }
  };

  const listModifiers = ['', position].concat((isDisplayed === true) ? ['expanded'] : []);
  return (
    <div
      id={id as string}
      className={classes}
    >
      {(label !== null)
        ? <label className="ui-dropdown__label" htmlFor={randomId}>{label}</label>
        : null}
      <div className="ui-dropdown__wrapper">

        <button
          type="button"
          id={randomId}
          ref={buttonRef}
          onKeyDown={navigate}
          aria-haspopup="listbox"
          onMouseDown={displayList}
          className="ui-dropdown__wrapper__field"
          aria-labelledby={`${randomId} ${randomId}`}
          tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
        >
          {selectedOptions.map((value) => mapping[value]).join(', ')}
        </button>
        {(clearIcon !== null)
          ? (
            <button
              type="button"
              id={`${randomId}c`}
              onClick={clearOptions}
              className="ui-dropdown__wrapper__clear-button"
              aria-labelledby={`${randomId} ${randomId}c`}
              tabIndex={((modifiers as string).includes('disabled') ? -1 : 0)}
            >
              <i className="ui-dropdown__wrapper__clear-button__icon">{clearIcon}</i>
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
          aria-activedescendant={`${randomId}${focusedOption}`}
          className={buildClass('ui-dropdown__wrapper__list', listModifiers)}
        >
          {options.map((option, index) => {
            const key = randomId + index;
            // Divider...
            if (option.type === 'divider') {
              return <li key={key} className="ui-dropdown__wrapper__list__divider" />;
            }
            // Group's header...
            if (option.type === 'header') {
              return <li key={key} className="ui-dropdown__wrapper__list__header">{option.label}</li>;
            }
            // Disabled option...
            if (option.disabled === true) {
              return (
                <li
                  key={key}
                  className="ui-dropdown__wrapper__list__option ui-dropdown__wrapper__list__option--disabled"
                >
                  {option.label}
                </li>
              );
            }
            // Classic option...
            const optionModifiers = selectedOptions.includes(option.value as string) ? ['selected'] : [];
            return (
              <li
                id={key}
                key={key}
                role="option"
                tabIndex={-1}
                onMouseDown={clickOnOption(index)}
                aria-selected={focusedOption === index}
                className={buildClass('ui-dropdown__wrapper__list__option', optionModifiers)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
      {(helper !== null) ? <p className="ui-dropdown__wrapper__helper">{helper}</p> : null}
    </div>
  );
}

UIDropdown.propTypes = propTypes;
UIDropdown.defaultProps = defaultProps;
UIDropdown.displayName = 'UIDropdown';
