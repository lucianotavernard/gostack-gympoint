import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import StudentsForm from '~/pages/StudentsForm';
import Plans from '~/pages/Plans';
import PlansForm from '~/pages/PlansForm';
import Registrations from '~/pages/Registrations';
import RegistrationsForm from '~/pages/RegistrationsForm';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Students} isPrivate />
      <Route path="/students/new" component={StudentsForm} isPrivate />
      <Route path="/students/:id/edit" component={StudentsForm} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/new" component={PlansForm} isPrivate />
      <Route path="/plans/:id/edit" component={PlansForm} isPrivate />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/new"
        component={RegistrationsForm}
        isPrivate
      />
      <Route
        path="/registrations/:id/edit"
        component={RegistrationsForm}
        isPrivate
      />

      <Route path="/help_orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
