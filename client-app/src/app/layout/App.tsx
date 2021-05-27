import React, { Fragment, useEffect } from 'react';
import { Container, ModalContent } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetail from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading activities...'/>
  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage}/>
      <Route path={'/(.+)'} 
      render={() => (
        <> 
        <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Switch>
          <Route exact path='/activities' component={ActivityDashboard}/>
          <Route path='/activities/:id' component={ActivityDetail}/>
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
          <Route path='/errors' component={TestErrors} />
          <Route path='/server-error' component={ServerError}/>
          <Route path='/login' component={LoginForm}/>
          <Route component={NotFound}/>
        </Switch>
      </Container>
        </>
      )}
      />
      
        
    </Fragment>
  );
}

export default observer(App);
