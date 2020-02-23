import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Connexion from '../containers/Connexion';
import Connexion_b from '../containers/Connexion_b';
import Connexion_a from '../containers/Connexion_a';
import App from '../containers/App';
import PrivateRoute from './PrivateRoute';
import { connect } from "react-redux";

class Router extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route exact path="/admin" component={Connexion_a} authed={this.props.auth} />
          <PrivateRoute exact path="/users" component={Connexion} authed={this.props.auth} />
          <PrivateRoute exact path="/banker" component={Connexion_b} authed={this.props.auth} />
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(Router);