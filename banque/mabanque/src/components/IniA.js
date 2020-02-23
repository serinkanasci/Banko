import React, { Component } from 'react';
import '../css/Create.css';
import { connect } from "react-redux";
import Admin from './Admin';
import { get_bankers } from '../api/UserFunctions';
import { changeAdmin, changeUser, changeAccounts, changeSuiviP, changeTitle, changeCoA, changeSuiviPB, changeNHeader} from "../actions/index";

const mapStateToProps = state => {
  return { banker: state.banker };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviP: suivi_page => dispatch(changeSuiviP(suivi_page)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb)),
    changeAccounts: accounts => dispatch(changeAccounts(accounts)),
    changeCoA: suivi_pagea=> dispatch(changeCoA(suivi_pagea)),
    changeNHeader:nheader => dispatch(changeNHeader(nheader)),
    changeUser:user => dispatch(changeUser(user)),
    changeAdmin: admin => dispatch(changeAdmin(admin))
  }
}

class IniA extends Component {

  constructor(props){
    super(props);

    this.state = {
      amount:'',
      accountlimit:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

onSubmit(e) {
    this.setState({essai:true});
    e.preventDefault();
  }

  handleLogout(event){
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  test(){
    get_bankers().then(res => {
      if (res) {
        localStorage.setItem('admin',JSON.stringify(res));
        this.props.changeAdmin(res);
      } 
    });
    setTimeout(function() { //Start the timer
          this.props.changeCoA(<Admin/>);
    }.bind(this), 1000);
  }

  render() {
    return (
      <div className="create-css">
        <p id="chargement">Chargement...</p>
        {this.test()}

      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(IniA);