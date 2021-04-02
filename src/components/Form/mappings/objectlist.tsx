// dependencies
import React from 'react';
import { Button, cn, Title, useStateIterator} from '@adam-sv/arc';
// types
import type { IARCProps, IButtonProps, IFormObjectListProps, IFormField, IFormSectionTitle, Optionalize, RenderableContent, TitleType } from '@adam-sv/arc';

export const handledMappings = ['objectlist'];
export function renderField(
  field: IFormField,
  getCurrentValue: (fieldName: string) => any,
  updateField: (fieldName: string, value: any) => void,
  lifecycleKey: string,
  renderFormComponent: (
    field: IFormField | IFormSectionTitle,
    getCurrentValue: (fieldName: string) => any,
    updateField: (fieldName: string, value: any) => void,
    key: string,
  ) => RenderableContent,
) {
  const props = field.componentProps as IFormObjectListProps;
  const value = getCurrentValue(field.name) || [];

  return <ObjectList
    key={field.name}
    fields={props.fields}
    itemLabel={props.itemLabel}
    lifecycleKey={lifecycleKey}
    maxMembers={props.maxMembers}
    newItemButtonProps={props.newItemButtonProps}
    renderFormComponent={renderFormComponent}
    titleText={props.label}
    titleType={3}
    value={value}
    valueDidChange={(newValue: any[]) => updateField(field.name, newValue)}
  />;
}

export interface IObjectListProps extends IARCProps {
  fields: IFormField[];
  itemLabel: string;
  lifecycleKey?: string;
  maxMembers?: number;
  newItemButtonProps: Optionalize<IButtonProps, { onClick: any }>;
  titleText: string;
  titleType: TitleType;
  value: any[];
  valueDidChange: (value: any[]) => void;
  renderFormComponent: (
    field: IFormField | IFormSectionTitle,
    getCurrentValue: (fieldName: string) => any,
    updateField: (fieldName: string, value: any) => void,
    key: string,
  ) => RenderableContent;
}

export function ObjectList(props: IObjectListProps) {
  const [iteration, iterator] = useStateIterator();
  const { fields, itemLabel, lifecycleKey, maxMembers, newItemButtonProps, renderFormComponent, titleText, titleType, valueDidChange } = props;
  const value = props.value || [];
  let listCanAcceptMoreMembers = true;
  if (typeof maxMembers === 'number') {
    listCanAcceptMoreMembers = (value.length < maxMembers);
  }

  const crossSize = 14;

  return (
    <div className={cn("ArcObjectList", props.className)}>
      <Title titleType={titleType} text={titleText} />
      {value.length < 1 && <div className="text">No items yet.</div>}
      {value.map((child: any, i: number) => (
        <div className="ArcObjectList-member" key={`${iteration}-${i}`}>
          <div className="ArcObjectList-memberHeader">
            <div className="flex-button-offset" />
            <Title titleType={4} text={`${itemLabel} ${i+1}`} />
            <Button 
              className="remove-member"
              onClick={() => {
                const filteredValue = value.slice();
                filteredValue.splice(i, 1);
                iterator();
                valueDidChange(filteredValue);
                iterator();
              }}
            >
              <svg
                viewBox={`0 0 ${crossSize} ${crossSize}`}
                className="X"
                height={crossSize}
                width={crossSize}
              >
                <line x1={crossSize / 2} x2={crossSize / 2} y1={0} y2={crossSize} />
                <line x1={0} x2={crossSize} y1={crossSize / 2} y2={crossSize / 2} />
              </svg>
            </Button>
          </div>
          {fields.map((field: IFormField, j: number) => 
            <div className="ArcObjectList-member-fields ArcForm-row">
              {renderFormComponent(
                Object.assign({ initialValue: child[field.name] }, field),
                (fieldName: string) => child[fieldName],
                (fieldName: string, newFieldValue: any) => {
                  child[fieldName] = newFieldValue;
                  valueDidChange(value.slice(0, i).concat(child).concat(value.slice(i + 1)));
                },
                lifecycleKey,
              )}
            </div>
          )}
        </div>
      ))}
      {listCanAcceptMoreMembers && <Button
        {...newItemButtonProps}
        onClick={() => {
          valueDidChange(value.concat([getDefaultMember(fields)]));
        }}
      />}
    </div>
  );
}

function getDefaultMember(fields: IFormField[]) {
  const member = {};
  fields.forEach(field => {
    if (field.name) {
      member[field.name] = field.initialValue;
    }
  });
  return member;
}
