import React from 'react';
import { TemporalInput } from '@adam-sv/arc';

export const TemporalInputs = (): JSX.Element => (
  <div>
    <TemporalInput
      onChange={(v, e) => {
        console.info(e?.target.value);
      }}
      type={'date'}
      label={'date'}
    />
    <TemporalInput
      onChange={(v, e) => {
        console.info(e?.target.value);
      }}
      type={'time'}
      label={'time'}
    />
    <TemporalInput
      onChange={(v, e) => {
        console.info(e?.target.value);
      }}
      type={'datetime-local'}
      label={'datetime-local'}
    />
    <TemporalInput
      onChange={(v, e) => {
        console.info(e?.target.value);
      }}
      type={'datetime-local'}
      label={'datetime-local'}
    />
    <TemporalInput
      onChange={(v, e) => {
        console.info(e?.target.value);
      }}
      type={'month'}
      label={'month'}
    />
    <TemporalInput
      onChange={(v, e) => {
        console.info(e?.target.value);
      }}
      type={'week'}
      label={'week'}
    />
  </div>
);
