# Protected

The `<Protected />` component is intended to allow users to "protect" authenticated routes, and deny users from ever seeing even markup from Protected pages unless an async `asyncIsAuthenticated` promise returns truthy.

This component is coupled to `react-router-dom`.

## Concepts

There are, from the POV of the library designer, 3 states a client can be in with respect to auth:

1. With a token, token is valid
2. With a token, token is invalid
3. Without a token

Case 1) is the authenticated case. Cases 2) and 3) are unauthenticated. Differentiating between 1) and 2) requires an async call to a server to validate the token; 3) is transparent when the token is missing.

`isMaybeAuthenticated` is `true` when we are in case 1) or 2); `false` when we are in case 3.
`asyncCheckAuthentication` is a function which differentiates between case 1) and 2). That promise should return `true` when we are in case 1) and `false` in case 2).

## Sample Usage

Let's say you have a localStorage token under `LS_TOKEN`, and when this is present you make an API call to `/api/isAuthenticated` to check protected status. Then, you might use this component as follows:

```react
const lsToken = localStorage.get(LS_TOKEN);

return (
  <Router>
    <Switch>
      <Protected
        redirectPath="/signin"
        isMaybeAuthenticated={Boolean(lsToken)}
        asyncCheckAuthentication={() =>
          fetch('/api/isAuthenticated', { headers: { Authorization: lsToken } })
            .then(res => Boolean(res?.isAuthenticated))
            .catch(err => false)
        }
      >
        <Route path="/account" component={Account} />
        {/* etc */}
      </Protected>
    </Switch>
  </Router>
);
```

Now, the `/account` page (and any others within the `<Protected></Protected>` block) will not be visible until the `asyncCheckAuthentication` callback succeeds.
