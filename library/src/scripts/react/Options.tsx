/**
 * Copyright (c) Openizr. All Rights Reserved.
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

const toArray = (value: string | string[]): string[] => (Array.isArray(value) ? value : [value]);

const propTypes = {
  id: PropTypes.string,
  select: PropTypes.bool,
  label: PropTypes.string,
  onFocus: PropTypes.func,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  helper: PropTypes.string,
  modifiers: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    modifiers: PropTypes.string,
    type: PropTypes.oneOf(['header', 'divider', 'option']),
  }).isRequired).isRequired,
  selectPosition: PropTypes.oneOf(['top', 'bottom']),
};

const defaultProps = {
  id: null,
  label: null,
  helper: null,
  value: [],
  modifiers: '',
  onFocus: null,
  onChange: null,
  multiple: false,
  select: false,
  selectPosition: null,
};

/**
 * Set of selectable options.
 */
function UIOptions(props: InferProps<typeof propTypes>): JSX.Element {
  const { options, name } = props;
  let { selectPosition } = props;
  let { id, modifiers, label } = props;
  let { helper, value, onChange } = props;
  let { multiple, select, onFocus } = props;

  id = id || null;
  value = value || [];
  label = label || null;
  helper = helper || null;
  select = select || false;
  onFocus = onFocus || null;
  onChange = onChange || null;
  modifiers = modifiers || '';
  multiple = multiple || false;
  selectPosition = selectPosition || null;

  const mounted = React.useRef(false);
  const wrapperRef = React.useRef(null);
  const isFocused = React.useRef(false);
  const firstSelectedOption = React.useRef(-1);
  const [randomId] = React.useState(generateRandomId);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isDisplayed, setIsDisplayed] = React.useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
  const [position, setPosition] = React.useState(selectPosition || 'bottom');
  const [currentValue, setCurrentValue] = React.useState<string[]>(toArray(value));
  const className = buildClass('ui-options', `${modifiers} ${(select ? 'select' : '')} ${(multiple ? ' multiple' : '')}`);
  // Memoizes all options' parsed labels to optimize rendering.
  const optionParsedLabels = React.useMemo(() => options.reduce((mapping, option) => {
    if (option.value !== undefined && option.value !== null) {
      return { ...mapping, [option.value]: markdown(option.label || '') };
    }
    return mapping;
  }, { _: '' } as Record<string, string>), [options]);

  // -----------------------------------------------------------------------------------------------
  // CALLBACKS DECLARATION.
  // -----------------------------------------------------------------------------------------------

  // Updates the `isFocused` ref when blurring options.
  const handleBlur = React.useCallback(() => {
    isFocused.current = false;
  }, []);

  // In `select` mode only, displays the options list at the right place on the viewport.
  const displayList = React.useCallback((): void => {
    if (selectPosition !== null) {
      setPosition(selectPosition as string);
    } else {
      const relativeOffsetTop = (buttonRef.current as HTMLInputElement).getBoundingClientRect().top;
      setPosition((relativeOffsetTop > window.innerHeight / 2) ? 'top' : 'bottom');
    }
    setIsDisplayed(true);
  }, [selectPosition]);

  // In `select` mode only, hides the options list only if forced or if focus is lost.
  const hideList = React.useCallback(
    (force = false) => (event: React.FocusEvent<HTMLElement> | null): void => {
      // We first ensure that the newly focused element is not an option of the list.
      const focusIsOutsideList = (event !== null)
        ? !event.currentTarget.contains(event.relatedTarget as Node)
        : true;
      if (focusIsOutsideList && (force === true || multiple === false)) {
        handleBlur();
        setIsDisplayed(false);
      }
    },
    [multiple, handleBlur],
  );

  // Finds the direct previous or next option when navigating with keyboard.
  const findSiblingOption = React.useCallback(
    (startIndex: number, direction: number, offset = 1): number => {
      const nextIndex = startIndex + direction * offset;
      if (nextIndex < 0 || nextIndex >= options.length) {
        return startIndex;
      }
      const option = options[nextIndex];
      return (option.value !== undefined && option.disabled !== true)
        ? nextIndex
        : findSiblingOption(startIndex, direction, offset + 1);
    },
    [options],
  );

  // Automatically triggered when a `focus` event is fired.
  const handleFocus = React.useCallback((optionValue: string, optionIndex: number) => (
    (event: React.FocusEvent<HTMLElement>): void => {
      isFocused.current = true;
      setFocusedOptionIndex(optionIndex);
      if (onFocus !== undefined && onFocus !== null) {
        onFocus(optionValue, event);
      }
    }), [onFocus]);

  // Manually triggered, used to simulate `focus` events (`select` mode).
  const focusOption = React.useCallback((optionIndex: number): void => {
    const refNode = (wrapperRef as React.RefObject<HTMLElement>).current;
    if (refNode !== null && optionIndex < refNode.childNodes.length && optionIndex >= 0) {
      (refNode.childNodes[optionIndex] as HTMLElement).focus();
    }
  }, []);

  // Automatically triggered when a `change` event is fired.
  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedIndex = currentValue.indexOf(event.target.value);
    let newValue = [event.target.value];
    if (multiple === true) {
      newValue = (selectedIndex >= 0)
        ? currentValue.slice(0, selectedIndex).concat(currentValue.slice(selectedIndex + 1))
        : currentValue.concat([event.target.value]);
    }
    // If the value hasn't changed, we don't trigger anything.
    if (multiple || newValue[0] !== currentValue[0]) {
      setCurrentValue(newValue);
      if (onChange !== undefined && onChange !== null) {
        onChange((multiple === true) ? newValue : newValue[0], event);
      }
    }
  }, [onChange, currentValue, multiple]);

  // Manually triggered, used to simulate `change` events (`select` mode).
  const changeOption = React.useCallback((optionIndex: number) => (): void => {
    setFocusedOptionIndex(optionIndex);
    const optionValue = options[optionIndex].value;
    handleChange({ target: { value: optionValue } } as React.ChangeEvent<HTMLInputElement>);
    if (select === true) {
      hideList()(null);
    }
  }, [handleChange, hideList, options, select]);

  // -----------------------------------------------------------------------------------------------
  // KEYBOARD NAVIGATION.
  // -----------------------------------------------------------------------------------------------

  // Handles keyboard navigation amongst options.
  const handleKeydown = React.useCallback((event: React.KeyboardEvent<HTMLElement>): void => {
    const { key } = event;
    const navigationControls: Record<string, () => number> = {
      ArrowUp: () => findSiblingOption(focusedOptionIndex, -1),
      ArrowLeft: () => findSiblingOption(focusedOptionIndex, -1),
      ArrowDown: () => findSiblingOption(focusedOptionIndex, +1),
      ArrowRight: () => findSiblingOption(focusedOptionIndex, +1),
      PageUp: () => Math.max(0, findSiblingOption(-1, +1)),
      Home: () => Math.max(0, findSiblingOption(-1, +1)),
      PageDown: () => Math.min(options.length - 1, findSiblingOption(options.length, -1)),
      End: () => Math.min(options.length - 1, findSiblingOption(options.length, -1)),
    };
    const siblingOption = navigationControls[key];
    if (siblingOption !== undefined) {
      // User is navigating through options...
      if (isDisplayed || !select) {
        focusOption(siblingOption());
      } else {
        changeOption(siblingOption())();
      }
      // `event.preventDefault` is not called globally to avoid overriding `Tab` behaviour.
      event.preventDefault();
    } else if (key === ' ' || key === 'Enter') {
      // User wants to select / unselect an option...
      if (isDisplayed === false && select) {
        setIsDisplayed(true);
      } else {
        changeOption(focusedOptionIndex)();
      }
      event.preventDefault();
    } else if (key === 'Escape') {
      // User wants to hide list (`select` mode)...
      hideList(true)(null);
      event.preventDefault();
    }
  }, [
    focusOption,
    findSiblingOption,
    focusedOptionIndex,
    select,
    hideList,
    isDisplayed,
    changeOption,
    options.length,
  ]);

  // -----------------------------------------------------------------------------------------------
  // PROPS REACTIVITY MANAGEMENT.
  // -----------------------------------------------------------------------------------------------

  // Updates current value whenever `value` property changes.
  React.useEffect(() => {
    const newValue = toArray(value as string);
    setCurrentValue(newValue);
  }, [value]);

  // Updates current value whenever `multiple` property changes.
  React.useEffect(() => {
    setCurrentValue((prevValue) => (
      (multiple === true || prevValue.length === 0) ? prevValue : [prevValue[0]]));
  }, [multiple]);

  // Updates `firstSelectedOption` ref whenever `currentValue` changes.
  React.useEffect(() => {
    if (currentValue.length === 0) {
      firstSelectedOption.current = findSiblingOption(-1, 1);
    }
    firstSelectedOption.current = Math.max(0, options.findIndex(
      (option) => currentValue.includes(option.value as string),
    ));
  }, [currentValue, options, findSiblingOption]);

  // Re-focuses the right option whenever `options` property changes, to avoid out of range focus.
  React.useEffect(() => {
    if (isFocused.current === true) {
      focusOption(firstSelectedOption.current);
    }
  }, [options, focusOption]);

  // HTML elements with `display: none` can't be focused. Thus, we need to wait for the HTML list to
  // be displayed before actually focusing it (`select` mode).
  React.useEffect(() => {
    if (!isDisplayed && buttonRef.current !== null && mounted.current === true) {
      buttonRef.current.focus();
    } else if (isDisplayed && wrapperRef.current !== null) {
      setTimeout(() => {
        focusOption(firstSelectedOption.current);
      }, 10);
    }
  }, [isDisplayed, focusOption]);
  // Prevents focusing the dropdown at component mount in strict mode.
  React.useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // -----------------------------------------------------------------------------------------------
  // COMPONENT RENDERING.
  // -----------------------------------------------------------------------------------------------

  const labelComponent = (label !== null && label !== undefined)
    ? <label className="ui-options__label" htmlFor={select ? randomId : `${randomId}_${Math.max(firstSelectedOption.current, 0)}`} dangerouslySetInnerHTML={{ __html: markdown(label) }} />
    : null;

  const helperComponent = (helper !== null && helper !== undefined)
    ? <span className="ui-options__helper" dangerouslySetInnerHTML={{ __html: markdown(helper) }} />
    : null;

  // Display as select list...
  if (select) {
    return (
      <div
        id={id as string}
        className={className}
      >
        {labelComponent}
        <div className="ui-options__wrapper">
          <button
            name={name}
            type="button"
            id={randomId}
            ref={buttonRef}
            aria-haspopup="listbox"
            onKeyDown={handleKeydown}
            onMouseDown={displayList}
            className="ui-options__wrapper__button"
            aria-labelledby={`${randomId} ${randomId}`}
            tabIndex={(modifiers.includes('disabled') ? -1 : 0)}
            onFocus={handleFocus('', firstSelectedOption.current)}
            dangerouslySetInnerHTML={{ __html: currentValue.map((optionValue) => optionParsedLabels[optionValue]).join(', ') }}
          />
          <ul
            tabIndex={-1}
            role="listbox"
            ref={wrapperRef}
            onBlur={hideList(true)}
            onKeyDown={handleKeydown}
            aria-labelledby={randomId}
            aria-expanded={isDisplayed}
            aria-multiselectable={multiple === true}
            aria-activedescendant={`${randomId}${(focusedOptionIndex)}`}
            className={buildClass('ui-options__wrapper__list', isDisplayed ? `${position} expanded` : position)}
          >
            {options.map((option, index) => {
              const key = `${randomId}${index}`;
              let optionModifiers = `${option.modifiers || ''}${option.disabled ? ' disabled' : ''}`;
              const isChecked = currentValue.includes(option.value as string);
              if (isChecked) {
                optionModifiers += ' checked';
              }
              return (
                <li
                  id={key}
                  key={key}
                  tabIndex={-1}
                  onBlur={handleBlur}
                  aria-selected={isChecked}
                  role={(option.type === 'option') ? 'option' : undefined}
                  onFocus={handleFocus(option.value as string, index)}
                  dangerouslySetInnerHTML={{ __html: optionParsedLabels[option.value || '_'] }}
                  onMouseDown={(option.type === 'option') ? changeOption(index) : undefined}
                  className={buildClass(`ui-options__wrapper__list__${option.type}`, optionModifiers)}
                />
              );
            })}
          </ul>
        </div>
        {helperComponent}
      </div>
    );
  }

  // Display as radio buttons / checkboxes...
  return (
    <div
      id={id as string}
      className={className}
    >
      {labelComponent}
      <div
        ref={wrapperRef}
        className="ui-options__wrapper"
      >
        {options.map((option, index) => {
          const optionId = `${randomId}_${index}`;
          const isDisabled = option.disabled === true;
          const isChecked = currentValue.includes(option.value as string);
          let optionModifiers = `${option.modifiers || ''}${option.disabled ? ' disabled' : ''}`;
          if (isChecked) {
            optionModifiers += ' checked';
          }
          const optionClassName = buildClass('ui-options__wrapper__option', optionModifiers);
          return (
            <label key={option.value} className={optionClassName} htmlFor={optionId}>
              <input
                name={name}
                id={optionId}
                onBlur={handleBlur}
                checked={isChecked}
                disabled={isDisabled}
                onChange={handleChange}
                onKeyDown={handleKeydown}
                value={option.value as string}
                onFocus={handleFocus(option.value as string, index)}
                className="ui-options__wrapper__option__field"
                type={(multiple === true) ? 'checkbox' : 'radio'}
                tabIndex={((modifiers as string).includes('disabled') || isDisabled || !(((index === 0 || multiple === false) && currentValue.length === 0) || option.value === currentValue[0]) ? -1 : 0)}
              />
              <span
                className="ui-options__wrapper__option__label"
                dangerouslySetInnerHTML={{ __html: optionParsedLabels[option.value as string] }}
              />
            </label>
          );
        })}
      </div>
      {helperComponent}
    </div>
  );
}

UIOptions.propTypes = propTypes;
UIOptions.defaultProps = defaultProps;
UIOptions.displayName = 'UIOptions';

export default React.memo(UIOptions);
