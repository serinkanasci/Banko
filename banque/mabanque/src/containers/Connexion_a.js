import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { title_header: state.title_header, cont_connexiona: state.cont_connexiona };
};

class Connexion_a extends Component {
  render() {
    return (
      <div id="consolea">
      	<Header/>
        {this.props.cont_connexiona}
      </div>
    );
  }
}
export default connect(mapStateToProps)(Connexion_a);