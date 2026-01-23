// dependencies
import { Button, cn, Title, useStateIterator } from '@adam-sv/arc';
// types
import type {
  IARCProps,
  IButtonProps,
  FormField,
  IFormListProps,
  TitleType,
} from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';
import { IFormFieldRenderer } from '../types';

import type { JSX } from 'react';

const CustomCloseIcon = ({ crossSize }: { crossSize: number }) => (
  <svg
    viewBox={`0 0 ${crossSize} ${crossSize}`}
    className='X'
    height={crossSize}
    width={crossSize}
  >
    <line x1={crossSize / 2} x2={crossSize / 2} y1={0} y2={crossSize} />
    <line x1={0} x2={crossSize} y1={crossSize / 2} y2={crossSize / 2} />
  </svg>
);

export const handledMappings = ['list'];
export function renderField<T>(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  renderFormComponent: IFormFieldRenderer
): JSX.Element {
  const props = field.componentProps as IFormListProps;
  const values = (getCurrentValue(field.id) as Array<T>) || [];

  return (
    <List<T>
      key={field.name}
      field={props.field}
      itemLabel={props.itemLabel}
      maxMembers={props.maxMembers}
      newItemButtonProps={props.newItemButtonProps}
      renderFormComponent={renderFormComponent}
      titleText={props.titleText}
      titleType={3}
      values={values}
      valuesDidChange={(newValue: T[]) => {
        updateField(field.id, newValue);
      }}
    />
  );
}

export interface IListProps<T = unknown> extends IARCProps {
  field: FormField;
  itemLabel: string;
  lifecycleKey?: string;
  maxMembers?: number;
  newItemButtonProps: IButtonProps;
  titleText: string;
  titleType: TitleType;
  values?: T[];
  valuesDidChange?: (value: T[]) => void;
  renderFormComponent?: IFormFieldRenderer;
}

export function List<T>(props: IListProps<T>): JSX.Element {
  const [iteration, iterator] = useStateIterator();
  const values = props.values || [];
  const {
    field,
    itemLabel,
    maxMembers,
    newItemButtonProps,
    renderFormComponent,
    titleText,
    titleType,
    valuesDidChange,
  } = props;

  const crossSize = 14;
  let listCanAcceptMoreMembers = true;
  if (typeof maxMembers === 'number') {
    listCanAcceptMoreMembers = values.length < maxMembers;
  }

  return (
    <div className={cn('ArcList', props.className)}>
      <Title titleType={titleType}>{titleText}</Title>
      {values.length < 1 && <div className='text'>No items yet.</div>}
      {values.map((child: T, i: number) => (
        <div className='ArcList-member' key={`${iteration}-${i}`}>
          <div className='ArcList-memberHeader'>
            <div className='flex-button-offset' />
            <Title titleType={4}>{`${itemLabel} ${i + 1}`}</Title>
            <Button
              className='remove-member'
              onClick={() => {
                const filteredValue = values.slice();
                filteredValue.splice(i, 1);
                iterator();
                if (valuesDidChange) valuesDidChange(filteredValue);
                iterator();
              }}
            >
              <CustomCloseIcon crossSize={crossSize} />
            </Button>
          </div>
          <div className='ArcList-member-fields ArcForm-row' key={i}>
            {renderFormComponent &&
              renderFormComponent(
                field,
                () => child,
                (fieldName: string, newFieldValue: T) => {
                  child = newFieldValue;
                  valuesDidChange &&
                    valuesDidChange(
                      values
                        .slice(0, i)
                        .concat(child)
                        .concat(values.slice(i + 1))
                    );
                },
                renderFormComponent
              )}
          </div>
        </div>
      ))}
      {listCanAcceptMoreMembers && (
        <Button
          {...newItemButtonProps}
          onClick={() => {
            valuesDidChange &&
              valuesDidChange(values.concat(field.initialValue as T));
          }}
        />
      )}
    </div>
  );
}
