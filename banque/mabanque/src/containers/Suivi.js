import React, { Component } from 'react';
import '../css/Suivi.css';
import Left from '../components/Left';
import { connect } from "react-redux";
import { changeCo, changeAdmin, changeUser, changeAccounts, changeSuiviP, changeTitle, changeCoA, changeSuiviPB, changeNHeader} from "../actions/index";

const mapStateToProps = state => {
  return { suivi_page: state.suivi_page, accountp: state.accountp };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviP: suivi_page => dispatch(changeSuiviP(suivi_page)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb)),
    changeAccounts: accounts => dispatch(changeAccounts(accounts)),
    changeCoA: suivi_pagea=> dispatch(changeCoA(suivi_pagea)),
    changeCo: suivi_page=> dispatch(changeCo(suivi_page)),
    changeNHeader:nheader => dispatch(changeNHeader(nheader)),
    changeUser:user => dispatch(changeUser(user)),
    changeAdmin: admin => dispatch(changeAdmin(admin))
  }
}
class Suivi extends Component {
	constructor(props){
    super();
  }
  componentDidMount(){
    if(this.props.test === 'ok'){
    }
  }
  render() {
    return (
    	<div id="suivi">
		  	<Left/>
        {this.props.suivi_page}
		  </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Suivi);


