import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { title_header: state.title_header, cont_connexionb: state.cont_connexionb };
};

class Connexion_b extends Component {
  render() {
    return (
      <div id="consoleb">
      	<Header/>
        {this.props.cont_connexionb}
      </div>
    );
  }
}
export default connect(mapStateToProps)(Connexion_b);