import * as React from 'react';
import { UIButton } from 'biuty/react';

const onClick = (): void => {
  console.log('Clicked!');
};

const onFocus = (): void => {
  console.log('Focused!');
};

/**
 * Buttons page.
 */
export default function Buttons(): JSX.Element {
  return (
    <div>
      <main className="grid cols-1 hgap-3 vgap-5">
        <a href="/">GO BACK</a>
        <UIButton label="ui-button" />
        <UIButton label="ui-button icon left" icon="star" />
        <UIButton label="ui-button icon right" icon="star" iconPosition="right" />
        <UIButton label="ui-button disabled" modifiers="disabled" />
        <UIButton label="ui-button with listener" onClick={onClick} />
        <UIButton label="ui-button with type submit" type="submit" />
        <UIButton label="ui-button with focus listener" onFocus={onFocus} />
        <UIButton icon="star" onFocus={onFocus} />
      </main>
    </div>
  );
}

Buttons.displayName = 'Buttons';
