import { FormResourceState, FormValues } from '@adam-sv/arc';

export const fakeAsyncOnSubmit = (values: FormValues, hooks: {
  setFormResourceState: (state: FormResourceState) => void,
  setLoadingMessage: (message: string) => void,
}): void => {
  console.info('Form submitted', values);

  const { setFormResourceState, setLoadingMessage } = hooks;
  setFormResourceState('loading' as FormResourceState);
  setLoadingMessage('Some async trip...');

  setTimeout(() => {
    setFormResourceState('success' as FormResourceState);
    setLoadingMessage('Some success message!');
  }, 2000);

  setTimeout(() => setFormResourceState('default' as FormResourceState), 4000);
};