import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { title_header: state.title_header, cont_connexion: state.cont_connexion };
};

class Connexion extends Component {
  render() {
    return (
      <div id="console">
      	<Header/>
        {this.props.cont_connexion}
      </div>
    );
  }
}
export default connect(mapStateToProps)(Connexion);