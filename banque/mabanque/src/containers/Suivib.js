import React, { Component } from 'react';
import '../css/Suivib.css';
import { connect } from "react-redux";

import { profile_banker } from '../api/UserFunctions';

const mapStateToProps = state => {
  return { suivi_pageb: state.suivi_pageb };
};

class Suivib extends Component {

	constructor(props){
    super();
  }
  componentDidMount(){
    profile_banker().then(res => { 
      localStorage.setItem('profileb',JSON.stringify(res));  
    })
  }
  render() {
    return (
    	<div id="suivib">
        {this.props.suivi_pageb}
		  </div>
    );
  }
}
export default connect(mapStateToProps)(Suivib);


