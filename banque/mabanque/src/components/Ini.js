import React, { Component } from 'react';
import '../css/Create.css';
import { connect } from "react-redux";
import Banker from './Banker';
import { profile_banker, create_account, get_accounts, get_user } from '../api/UserFunctions';
import { changeUserB, changeAccountsB, changeSuiviP, changeTitle, changeCoA, changeSuiviPB, changeBankerB, changeNHeader} from "../actions/index";

const mapStateToProps = state => {
  return { user:state.user };
};

function mapDispatchToProps(dispatch) {
  return {
    changeTitle: title_header => dispatch(changeTitle(title_header)),
    changeSuiviP: suivi_page => dispatch(changeSuiviP(suivi_page)),
    changeSuiviPB: suivi_pageb => dispatch(changeSuiviPB(suivi_pageb)),
    changeCoA: suivi_pagea=> dispatch(changeCoA(suivi_pagea)),
    changeNHeader:nheader => dispatch(changeNHeader(nheader)),
    changeBankerB:banker2 => dispatch(changeBankerB(banker2)),
    changeUserB:userb => dispatch(changeUserB(userb)),
    changeAccountsB:accountsb => dispatch(changeAccountsB(accountsb))
  }
}

class Ini extends Component {
  constructor(props){
    super(props);

    this.state = {
      amount:'',
      accountlimit:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    profile_banker().then(res => { 
      localStorage.setItem('profileb',JSON.stringify(res));
      this.props.changeBankerB(res);
      this.props.changeNHeader(res.lastname.toUpperCase()+" "+res.firstname);
      const accountg = {
          id:res.userid
      }
      get_user(accountg).then(res2 => {
        if (res2) {
          localStorage.setItem('userb',JSON.stringify(res2));
          this.props.changeUserB(res2);
          this.props.changeTitle('Votre client : '+res2.lastname.toUpperCase()+" "+res2.firstname);
        }   
      });
      get_accounts(accountg).then(res3 => {
        if (res3) {
          localStorage.setItem('resb',JSON.stringify(res3));
          this.props.changeAccountsB(res3);
        } 
      });
    });
  }

  onSubmit(e) {
      this.setState({essai:true});
      e.preventDefault();
      const account = {
        iduser:this.state.iduser,
        amount:this.state.amount,
        accountlimit:this.state.accountlimit
      }
      create_account(account).then(res => {  
      })
  }
  handleLogout(event){
    //this.props.history.push("/");
    localStorage.setItem('user',false);
    window.location.href="http://localhost:3000/"
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  test(){
    profile_banker().then(res => { 
      localStorage.setItem('profileb',JSON.stringify(res));
      this.props.changeBankerB(res);
      this.props.changeNHeader(res.lastname.toUpperCase()+" "+res.firstname);
      const accountg = {
        id:res.userid
      }
      get_user(accountg).then(res2 => {
        if (res2) {
          localStorage.setItem('userb',JSON.stringify(res2));
          this.props.changeUserB(res2);
          this.props.changeTitle('Votre client : '+res2.lastname.toUpperCase()+" "+res2.firstname);
        }
      });
      get_accounts(accountg).then(res3 => {
        if (res3) {
          localStorage.setItem('resb',JSON.stringify(res3));
          this.props.changeAccountsB(res3);
        } 
        this.props.changeSuiviPB(<Banker accountsb={res3}/>);
      });
    });
    setTimeout(function() { //Start the timer  
      this.props.changeSuiviPB(<Banker/>);
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
export default connect(mapStateToProps, mapDispatchToProps)(Ini);