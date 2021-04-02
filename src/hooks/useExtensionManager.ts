import { useMemo, useState } from 'react';

export function useExtensionManager<IExtensionInterface>() {
  const [extension, setExtension] = useState<IExtensionInterface>(
    {} as IExtensionInterface
  );

  const registerExtension = useMemo(
    () => (name: keyof IExtensionInterface, controls: any) => {
      setExtension(extensions => {
        extensions[name] = controls;
        return extensions;
      });
    },
    []
  );

  const unregisterExtension = useMemo(
    () => (name: keyof IExtensionInterface) => {
      setExtension(extensions => {
        extensions[name] = undefined;
        return extensions;
      });
    },
    []
  );

  return { extension, registerExtension, unregisterExtension };
}
