import * as React from 'react';
import { UITextarea } from 'biuty/react';

const onChange = (value: string): void => {
  console.log('Changed!', value);
};

const onBlur = (value: string): void => {
  console.log('Blurred!', value);
};

const onFocus = (): void => {
  console.log('Focused!');
};

const onPaste = (...args: any[]): void => {
  console.log('Pasted!', args);
};

/**
 * Textareas page.
 */
export default function Textareas(): JSX.Element {
  const [newValue, setNewValue] = React.useState('test');

  React.useEffect(() => {
    setTimeout(() => {
      setNewValue('new test');
    }, 3000);
  }, []);

  return (
    <div className="vgap-5">
      <main className="grid cols-1 hgap-3 vgap-5">
        <a href="/" className="cols-l-3">GO BACK</a>
        <UITextarea name="textarea1" />
        <UITextarea name="textarea2" label="*ui-textarea*" />
        <UITextarea name="textarea3" label="ui-textarea readonly" readonly />
        <UITextarea name="textarea4" label="ui-textarea with value" value={newValue} />
        <UITextarea name="textarea5" label="ui-textarea with autofocus" autofocus />
        <UITextarea name="textarea6" label="ui-textarea with helper" helper="helper" />
        <UITextarea name="textarea7" label="ui-textarea with listener" onChange={onChange} />
        <UITextarea name="textarea8" label="ui-textarea with debounce" onChange={onChange} debounceTimeout={250} />
        <UITextarea name="textarea9" label="ui-textarea with blur listener" onBlur={onBlur} />
        <UITextarea name="textarea10" label="ui-textarea with maxlength" maxlength={10} />
        <UITextarea name="textarea11" label="ui-textarea with placeholder" placeholder="placeholder" />
        <UITextarea name="textarea12" label="ui-textarea with rows and cols" rows={10} cols={10} />
        <UITextarea name="textarea13" label="ui-textarea disabled" modifiers="disabled" />
        <UITextarea name="textarea14" label="ui-textarea with autoresize" autoresize />
        <UITextarea name="textarea15" label="ui-textarea with focus listener" onFocus={onFocus} onPaste={onPaste} />
      </main>
    </div>
  );
}

Textareas.displayName = 'Textareas';
