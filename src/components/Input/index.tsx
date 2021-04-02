// dependencies
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
// internal
import { cn, getSizeClassName, InfoIcon } from '@adam-sv/arc';
// styles
import "./style.css";
// types
import type { IInputProps, InputType } from './types';
export type { IInputProps, InputType };

declare interface I_Input$State {
  value: string,
  inputRef: any | null;
  isFocused: boolean,
}

declare interface I_InputDerivedProps {
  Tag: 'input' | 'textarea';
  type: string;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
}

// This component can and will be redone with hooks
// works and is readable for now, low priority
@observer
export class Input extends React.Component<IInputProps> {
  /* INITIAL STATE */
  @observable $state:I_Input$State = {
    value: '',
    inputRef: null,
    isFocused: false,
  }

  @action.bound
  setInputRef(ref) {
    this.$state.inputRef = ref;
  }

  @action.bound
  setFocused(isFocused: boolean) {
    this.$state.isFocused = isFocused;
  }

  componentDidMount() {
    if (typeof this.props.value === 'number' || typeof this.props.value === 'string') {
      this.setInputValue(this.props.value);
    }
  }

  @computed get computedClassName() {
    return cn(
      !this.props.overrideDefaultClassName && 'ArcInput',
      this.props.className,
      this.props.componentSize && getSizeClassName(this.props.componentSize),
      this.props.disabled && 'disabled',
      this.props.error && 'error',
      this.$state.isFocused && 'focused',
      !this.getLabelText() && 'no-label',
    );
  }

  getTitleText() {
    if (this.props.disabled) {
      return this.props.title || `[READ ONLY] - ${this.props.value}`;
    }

    return undefined;
  }

  getLabelText() {
    if (this.props.alwaysShowLabel) {
      return this.props.label;
    }

    if (
      typeof this.$state.value === 'string' && this.$state.value.length > 0
      || typeof this.$state.value === 'number'
    ) {
      return this.props.label;
    }

    return undefined;
  }

  @computed get inputTypeProps(): I_InputDerivedProps {
    const typeInformation: any = {
      Tag: 'input',
      type: 'text',
    };

    const type = this.props.type || 'text';

    if (type === 'textarea') {
      typeInformation.Tag = 'textarea';
    }

    if (this.props.disabled) {
      typeInformation.disabled = true;
    }

    if (['text', 'password'].indexOf(type) >= 0) {
      typeInformation.type = type;
    } else if (this.props.type === 'integer') {
      typeInformation.type = 'number';
      typeInformation.step = 1;

      if (typeof this.props.min === 'number') {
        typeInformation.min = this.props.min;
      }
      if (typeof this.props.max === 'number') {
        typeInformation.max = this.props.max;
      }
    } else if (this.props.type === 'float') {
      typeInformation.type = 'number';

      if (typeof this.props.min === 'number') {
        typeInformation.min = this.props.min;
      }

      if (typeof this.props.max === 'number') {
        typeInformation.max = this.props.max;
      }
    }

    return typeInformation;
  }

  @action.bound
  handleKeyUp(event){
    if (this.inputTypeProps.Tag === 'textarea') {
      return;
    }

    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  }

  formatValue(value) {
    try {
      if (this.props.type === 'float' || this.props.type === 'integer') {
        const num = Number(value);

        if (isNaN(num)) {
          return value;
        }

        if (this.props.type === 'integer') {
          return Math.floor(num / 1);
        }

        return num;
      }

      return value;
    } catch (e) {
      console.error('Error formatting value:', e);

      return value;
    }
  }

  @action.bound
  onChange(event){
    const newValue = this.formatValue(event.target.value);

    this.setInputValue(newValue);
    this.props.onChange(event, this.$state.value);
  }

  @action.bound
  setInputValue(value) {
    const { $state } = this;
    $state.value = value;

    if (!$state.inputRef) {
      return;
    }

    $state.inputRef.value = value;
  }

  label() {
    const labelText = this.getLabelText();

    if (labelText) {
      return <label className='label'>{labelText}</label>;
    }
  }

  error() {
    if (this.props.error) {
      const errorText = (typeof this.props.error === 'string' ? this.props.error : 'Required');
      return <label className="ArcInput-error-label">{errorText}</label>;
    }
  }

  render() {
    const { Tag, ...rest } = this.inputTypeProps;

    const label = this.label();
    const error = this.error();
    const showLabelFrame = Boolean(label || error);

    return (
      <div
        className={this.computedClassName}
        title={this.getTitleText()}
      >
        {showLabelFrame && <div className="ArcInput-label-row">
          {this.label()}
          {this.error()}
        </div>}
        <div className={`ArcInput-input-row ArcInput-input-row-${Tag}`}>
          <InfoIcon>{this.props.info}</InfoIcon>
          <Tag
            {...rest}
            onFocus={e => this.setFocused(true)}
            onBlur={e => this.setFocused(false)}
            ref={this.setInputRef}
            placeholder={this.props.alwaysShowLabel ? this.props.placeholder : this.props.label}
            onChange={this.onChange}
            onKeyUp={this.handleKeyUp}
          />
        </div>
      </div>
    );
  }
}
