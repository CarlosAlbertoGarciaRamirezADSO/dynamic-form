export class QuestionBase<T> {
    value: T|undefined;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    options: {key: string, value: string}[];
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    errorMessage?: string;
    helpText?: string;
    disabled?: boolean;
    readonly?: boolean;
    multiple?: boolean; // for file inputs
    accept?: string; // for file inputs
    step?: number; // for numeric inputs
    rows?: number; // for textarea
    cols?: number; // for textarea
  
    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        options?: {key: string, value: string}[];
        placeholder?: string;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        pattern?: string;
        errorMessage?: string;
        helpText?: string;
        disabled?: boolean;
        readonly?: boolean;
        multiple?: boolean;
        accept?: string;
        step?: number;
        rows?: number;
        cols?: number;
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.options = options.options || [];
      this.placeholder = options.placeholder;
      this.minLength = options.minLength;
      this.maxLength = options.maxLength;
      this.min = options.min;
      this.max = options.max;
      this.pattern = options.pattern;
      this.errorMessage = options.errorMessage;
      this.helpText = options.helpText;
      this.disabled = options.disabled || false;
      this.readonly = options.readonly || false;
      this.multiple = options.multiple || false;
      this.accept = options.accept;
      this.step = options.step;
      this.rows = options.rows;
      this.cols = options.cols;
    }
  }
  
  // Specific question types for better type safety
  export class TextboxQuestion extends QuestionBase<string> {
    override controlType = 'textbox';
  }
  
  export class RadioQuestion extends QuestionBase<string> {
    override controlType = 'radio';
  }
  
  export class SelectQuestion extends QuestionBase<string> {
    override controlType = 'select';
  }
  
  export class CheckboxQuestion extends QuestionBase<boolean> {
    override controlType = 'checkbox';
  }
  
  export class FileQuestion extends QuestionBase<File> {
    override controlType = 'file';
  }
  
  export class TextareaQuestion extends QuestionBase<string> {
    override controlType = 'textarea';
  }