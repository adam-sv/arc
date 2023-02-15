// dependencies
import React from 'react';
import { Button, cn, Title, useStateIterator } from '@adam-sv/arc';
// types
import type {
  IARCProps,
  IButtonProps,
  FormField,
  IFormObjectListProps,
  IFormSectionTitle,
  JSObject,
  RenderableContent,
  TitleType,
} from '@adam-sv/arc';
import { FormFieldId, FormFieldValue } from '..';

export const handledMappings = ['objectlist'];
export function renderField(
  field: FormField,
  getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
  updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
  lifecycleKey: string,
  renderFormComponent: (
    field: FormField | IFormSectionTitle,
    getCurrentValue: (fieldId: FormFieldId) => FormFieldValue,
    updateField: (fieldId: FormFieldId, value: FormFieldValue) => void,
    key: string
  ) => RenderableContent
): JSX.Element {
  const props = field.componentProps as IFormObjectListProps;
  const values =
    (getCurrentValue(field.id) as ObjectListValue[]) ||
    ([] as ObjectListValue[]);

  return (
    <ObjectList
      key={field.name}
      fields={props.fields}
      formatFieldBeforeRender={props.formatFieldBeforeRender}
      itemLabel={props.itemLabel}
      lifecycleKey={lifecycleKey}
      maxMembers={props.maxMembers}
      newItemButtonProps={props.newItemButtonProps}
      renderFormComponent={renderFormComponent}
      titleText={props.label}
      titleType={3}
      values={values}
      valuesDidChange={(newValue: ObjectListValue[]) =>
        updateField(field.id, newValue)
      }
    />
  );
}

export type ObjectListValue = Record<string, any>;

export interface IObjectListProps extends IARCProps {
  fields: FormField[];
  formatFieldBeforeRender?: (field: FormField, listMember: any) => FormField;
  itemLabel: string;
  lifecycleKey?: string;
  maxMembers?: number;
  newItemButtonProps: IButtonProps;
  titleText: string;
  titleType: TitleType;
  values?: ObjectListValue[];
  valuesDidChange?: (value: ObjectListValue[]) => void;
  renderFormComponent?: (
    field: FormField | IFormSectionTitle,
    getCurrentValue: (fieldName: string) => any,
    updateField: (fieldName: string, value: any) => void,
    key: string
  ) => RenderableContent;
}

export function ObjectList(props: IObjectListProps): JSX.Element {
  const [iteration, iterator] = useStateIterator();
  const values = props.values || [];
  const {
    fields,
    formatFieldBeforeRender,
    itemLabel,
    lifecycleKey,
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
    <div className={cn('ArcObjectList', props.className)}>
      <Title titleType={titleType}>{titleText}</Title>
      {values.length < 1 && <div className='text'>No items yet.</div>}
      {values.map((child: ObjectListValue, i: number) => (
        <div className='ArcObjectList-member' key={`${iteration}-${i}`}>
          <div className='ArcObjectList-memberHeader'>
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
              <svg
                viewBox={`0 0 ${crossSize} ${crossSize}`}
                className='X'
                height={crossSize}
                width={crossSize}
              >
                <line
                  x1={crossSize / 2}
                  x2={crossSize / 2}
                  y1={0}
                  y2={crossSize}
                />
                <line
                  x1={0}
                  x2={crossSize}
                  y1={crossSize / 2}
                  y2={crossSize / 2}
                />
              </svg>
            </Button>
          </div>
          {fields.map((field: FormField, j: number) => {
            let adjustedField = Object.assign({}, field);
            if (typeof formatFieldBeforeRender === 'function') {
              adjustedField = formatFieldBeforeRender(adjustedField, child);
            }
            if (child[field.id] && !adjustedField.initialValue) {
              adjustedField.initialValue = child[field.id];
            }

            return (
              <div className='ArcObjectList-member-fields ArcForm-row' key={j}>
                {renderFormComponent &&
                  renderFormComponent(
                    adjustedField,
                    (fieldName: string) => child[fieldName],
                    (fieldName: string, newFieldValue: any) => {
                      child[fieldName] = newFieldValue;
                      valuesDidChange &&
                        valuesDidChange(
                          values
                            .slice(0, i)
                            .concat(child)
                            .concat(values.slice(i + 1))
                        );
                    },
                    lifecycleKey || ''
                  )}
              </div>
            );
          })}
        </div>
      ))}
      {listCanAcceptMoreMembers && (
        <Button
          {...newItemButtonProps}
          onClick={() => {
            valuesDidChange &&
              valuesDidChange(values.concat([getDefaultMember(fields)]));
          }}
        />
      )}
    </div>
  );
}

function getDefaultMember(fields: FormField[]) {
  const member: JSObject = {};
  fields.forEach((field) => {
    if (field.name) {
      member[field.name] = field.initialValue;
    }
  });
  return member;
}
