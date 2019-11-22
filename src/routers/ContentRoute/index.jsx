import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageHomeContainer from '../../pages/PageHome/container/index';
import PageLogin from '../../pages/PageLogin/index';
import PageFavoritesContainer from '../../pages/PageFavorites/container/index';
import PrivateRouteContainer from '../PrivateRoute/container/index';

// ПУТЬ К ГЛАВНОЙ СТРАНИЦЕ И СТРАНИЦЕ ИЗБРАННОЕ ПРИВАТНЫЕ
const ContentRoute = () => (
  <Switch>
    <PrivateRouteContainer exact path="/" component={PageHomeContainer} />
    <PrivateRouteContainer path="/favorites" component={PageFavoritesContainer} />
    <Route path="/login" component={PageLogin} />
  </Switch>
);

export default ContentRoute;
