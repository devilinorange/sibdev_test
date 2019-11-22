import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageHomeContainer from '../../pages/PageHome/container/index';
import PageLogin from '../../pages/PageLogin/index';
import PageFavorites from '../../pages/PageFavorites/index';
import PrivateRoute from '../PrivateRoute/index';

const ContentRoute = () => (
  <Switch>
    <PrivateRoute exact path="/" component={PageHomeContainer} />
    <PrivateRoute path="/favorites" component={PageFavorites} />
    <Route path="/login" component={PageLogin} />
  </Switch>
);

export default ContentRoute;
