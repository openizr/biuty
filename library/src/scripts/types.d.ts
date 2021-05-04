declare module 'sonar-ui/vue' {
  import UIP from 'scripts/vue/P.vue';
  import UILink from 'scripts/vue/Link.vue';
  import UITitle from 'scripts/vue/Title.vue';
  import UIImage from 'scripts/vue/Image.vue';
  import UIRadio from 'scripts/vue/Radio.vue';
  import UIButton from 'scripts/vue/Button.vue';
  import UIDropdown from 'scripts/vue/Dropdown.vue';
  import UITextarea from 'scripts/vue/Textarea.vue';
  import UICheckbox from 'scripts/vue/Checkbox.vue';
  import markdown from 'scripts/helpers/markdown';
  import UITextfield from 'scripts/vue/Textfield.vue';
  import buildClass from 'scripts/helpers/buildClass';
  import UIFileUploader from 'scripts/vue/FileUploader.vue';
  import generateRandomId from 'scripts/helpers/generateRandomId';

  export {
    UIP,
    UILink,
    UIButton,
    UIImage,
    UIDropdown,
    UITitle,
    UITextfield,
    UITextarea,
    UICheckbox,
    UIRadio,
    UIFileUploader,
    markdown,
    buildClass,
    generateRandomId,
  };

}
declare module 'sonar-ui/react' {
  import UIP from 'scripts/react/P';
  import UILink from 'scripts/react/Link';
  import UITitle from 'scripts/react/Title';
  import UIImage from 'scripts/react/Image';
  import UIButton from 'scripts/react/Button';

  import UIDropdown from 'scripts/react/Dropdown';
  import UITextarea from 'scripts/react/Textarea';
  import UICheckbox from 'scripts/react/Checkbox';
  import UIRadio from 'scripts/react/Radio';
  import UITextfield from 'scripts/react/Textfield';

  import UIFileUploader from 'scripts/react/FileUploader';

  export {
    UIP,
    UILink,
    UIButton,
    UIImage,
    UIDropdown,
    UITitle,
    UITextfield,
    UITextarea,
    UICheckbox,
    UIRadio,
    UIFileUploader,
    markdown,
    buildClass,
    generateRandomId,
  };

}
