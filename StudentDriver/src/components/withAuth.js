import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Route} from 'react-router-dom'

const PrivateRoute = ({ component: Component, isloggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (
    isloggedIn === true
      ? <Component {...props} {...rest} />
      : <Redirect to='/login' />
  )} />
)

class ProtectedRoute extends Component {
  constructor () {
    super();
    this.state = {
      loading: true,
      redirect: false,
    };
  }

  componentDidMount () {
    fetch('/checkAuth')
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
  }

  render () {
    const { loading, redirect } = this.state;
    var isloggedIn = false
    console.log(this.props);
    if (!loading && !redirect) {
      isloggedIn = true
    }
    if (loading) {
      return null;
    }
    return (
      <PrivateRoute {...this.props} isloggedIn={isloggedIn} />
    );
  }
}

export default ProtectedRoute
