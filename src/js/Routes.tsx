import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import CurrenciesContainer from './containers/CurrenciesContainer';

export const Routes = (): React.ReactElement => (
  <Switch>
    <Route path="/currencies/:currencyId" component={CurrenciesContainer} />
    <Route component={CurrenciesContainer} />
  </Switch>
);

export default Routes;
