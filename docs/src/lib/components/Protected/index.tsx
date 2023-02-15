// dependencies
import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
// types
export interface IProtectedProps {
  isMaybeAuthenticated: boolean;
  asyncCheckAuthentication: () => Promise<boolean>;
  loadingView?: JSX.Element;
  children: JSX.Element;
  redirectPath: string;
}

export type IAuthState = 'authenticated' | 'unknown' | 'unauthenticated';

export function Protected({
  asyncCheckAuthentication,
  children,
  isMaybeAuthenticated,
  loadingView,
  redirectPath,
}: IProtectedProps): JSX.Element {
  const [authState, setAuthState] = useState<IAuthState>('unknown');

  const location = useLocation();
  const to = { pathname: redirectPath, state: { from: location } };

  useEffect(() => {
    if (!isMaybeAuthenticated) {
      return;
    }

    asyncCheckAuthentication()
      .then((isAuthed: boolean) =>
        setAuthState(isAuthed ? 'authenticated' : 'unauthenticated')
      )
      .catch((err) => {
        console.error(`Protected.asyncCheckAuthentication errored:`, err);
        setAuthState('unauthenticated');
      });
  }, [isMaybeAuthenticated]);

  if (!isMaybeAuthenticated || authState === 'unauthenticated') {
    return <Redirect to={to} />;
  }
  if (authState === 'unknown') {
    return loadingView || <div className='ArcProtected'>Loading...</div>;
  }
  // authState === 'authenticated'
  return children;
}
