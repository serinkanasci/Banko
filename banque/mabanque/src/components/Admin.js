import React, { Component } from 'react';
import '../css/Banker.css';
import { connect } from "react-redux";
import { changeCoA, changeTitle, changeAdmin} from "../actions/index";
import DetailA from './DetailA';
import CreateA from './CreateA';
import { get_bankers, get_banker} from '../api/UserFunctions';

const mapStateToProps = state => {
  return { title_header: state.title_header, admin:state.admin };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeCoA: suivi_pagea => dispatch(changeCoA(suivi_pagea)),
    changeAdmin: admin => dispatch(changeAdmin(admin))
  };
}

class Admin extends Component {
  constructor(props){
    super(props);
    this.handleDetail = this.handleDetail.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.props.changeTitle('Admin');
    get_bankers().then(res => {
      if (res) {
        localStorage.setItem('admin',JSON.stringify(res));
        this.props.changeAdmin(res);
      }    
    });
  }
  handleDetail(event, id){
    get_banker(id).then(res => {
      if (res) {
        this.props.changeCoA(<DetailA acc={res}/>);
        localStorage.setItem('admin_banker',JSON.stringify(res));
      }  
    })
  }
  handleCreate(event){
    //this.props.history.push("/");
    this.props.changeCoA(<CreateA/>);
  }

  renderTable(){
    return this.props.admin.map((banker,index) => {
      const{bankerid, firstname, lastname} = banker
      return(
        <div id="cli_list" onClick={(event) => this.handleDetail(event,bankerid)} key={bankerid}><p key={bankerid} id="txt_list">{lastname.toUpperCase()+" "+firstname}</p> </div>
      )
    });
  }

  render() {
    return (
      <div className="banker">
        <div id="cli_acc"><p id="txt_acc">Liste de tout les banquiers créés</p> </div>
        {this.renderTable()}
        <div id="cli_acc_cre" onClick={(event) => this.handleCreate(event)}>Ajouter un compte</div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);