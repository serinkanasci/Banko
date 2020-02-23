import { CHANGE_CO, CHANGE_ACCOUNTP, CHANGE_TRANSFERS, CHANGE_DEPOTS, CHANGE_ALERTES, CHANGE_USERB, CHANGE_USERP, CHANGE_NHEADER, CHANGE_USER, CHANGE_ADMIN, CHANGE_BANKERB, CHANGE_COB, CHANGE_COA, CHANGE_ACCOUNTSB, CHANGE_SUIVI_PAGE,  CHANGE_SUIVI_PAGEB, CHANGE_TITLE, CHANGE_STYLED, CHANGE_STYLEC, CHANGE_PROFILE, CHANGE_COMMANDE, CHANGE_DEVIS, CHANGE_AUTH } from "../actions/action-types";
import React from 'react';
import Solde from '../components/Solde';
import Suivib from '../containers/Suivib';
import Ini from '../components/Ini'; 
import IniA from '../components/IniA';
import IniU from '../components/IniU';

//const parser = JSON.parse(localStorage.getItem('profile'));
const parser = JSON.parse(localStorage.getItem('profileb'));
const parser_b = JSON.parse(localStorage.getItem('account'));
const parser_c = JSON.parse(localStorage.getItem('resb'));
const parser_e = JSON.parse(localStorage.getItem('userb'));
const parser_f = JSON.parse(localStorage.getItem('admin'));
const parser_g = JSON.parse(localStorage.getItem('admin_banker'));
const parser_h = JSON.parse(localStorage.getItem('userp'));
const parser_i = JSON.parse(localStorage.getItem('userb'));
const parser_j = JSON.parse(localStorage.getItem('resp'));
const parser_k = JSON.parse(localStorage.getItem('accountp'));
const parser_l = JSON.parse(localStorage.getItem('alertes'));
const parser_m = JSON.parse(localStorage.getItem('transfers'));
const parser_n = JSON.parse(localStorage.getItem('depots'));


const initialState = {
  title_header:'',
  nheader:'',
  suivi_page:<Solde/>,
  suivi_pageb:<Ini/>,
  cont_connexion:<IniU/>,
  cont_connexionb:<Suivib/>,
  cont_connexiona:<IniA/>,
  banker2:parser,
  account:parser_b,
  accountp:parser_k,
  accountsb:parser_c,
  accountsp:parser_j,
  user:parser_e,
  userp:parser_h,
  userb:parser_i,
  admin:parser_f,
  alertes:parser_l,
  transfers:parser_m,
  depots:parser_n,
  admin_banker:parser_g,
  style_d:{backgroundColor:"#f5f6f8"},
  style_c:{backgroundColor:"#f5f6f8"},
  auth:localStorage.getItem('user')

};

function rootReducer(state = initialState, action) {
  if (action.type === CHANGE_CO) {
    return Object.assign({}, state, {
      cont_connexion: action.payload
    });
  }

  if (action.type === CHANGE_BANKERB) {
    return Object.assign({}, state, {
      banker2: action.payload
    });
  }

  if (action.type === CHANGE_ALERTES) {
    return Object.assign({}, state, {
      alertes: action.payload
    });
  }

  if (action.type === CHANGE_DEPOTS) {
    return Object.assign({}, state, {
      depots: action.payload
    });
  }

  if (action.type === CHANGE_TRANSFERS) {
    return Object.assign({}, state, {
      transfers: action.payload
    });
  }

  if (action.type === CHANGE_USERP) {
    return Object.assign({}, state, {
      userp: action.payload
    });
  }

  if (action.type === CHANGE_USERB) {
    return Object.assign({}, state, {
      userb: action.payload
    });
  }

  if (action.type === CHANGE_USER) {
    return Object.assign({}, state, {
      user: action.payload
    });
  }

  if (action.type === CHANGE_ADMIN) {
    return Object.assign({}, state, {
      admin: action.payload
    });
  }

  if (action.type === CHANGE_NHEADER) {
    return Object.assign({}, state, {
      nheader: action.payload
    });
  }

  if (action.type === CHANGE_ACCOUNTSB) {
    return Object.assign({}, state, {
      accountsb: action.payload
    });
  }

  if (action.type === CHANGE_ACCOUNTP) {
    return Object.assign({}, state, {
      accountp: action.payload
    });
  }

  if (action.type === CHANGE_COA) {
    return Object.assign({}, state, {
      cont_connexiona: action.payload
    });
  }

  if (action.type === CHANGE_COB) {
    return Object.assign({}, state, {
      cont_connexionb: action.payload
    });
  }

  if (action.type === CHANGE_SUIVI_PAGE) {
    return Object.assign({}, state, {
      suivi_page: action.payload
    });
  }

  if (action.type === CHANGE_SUIVI_PAGEB) {
    return Object.assign({}, state, {
      suivi_pageb: action.payload
    });
  }

  if (action.type === CHANGE_TITLE) {
    return Object.assign({}, state, {
      title_header: action.payload
    });
  }

  if (action.type === CHANGE_STYLED) {
    return Object.assign({}, state, {
      style_d: action.payload
    });
  }

  if (action.type === CHANGE_STYLEC) {
    return Object.assign({}, state, {
      style_c: action.payload
    });
  }

  if (action.type === CHANGE_PROFILE) {
    return Object.assign({}, state, {
      profile_user: action.payload
    });
  }

  if (action.type === CHANGE_COMMANDE) {
    return Object.assign({}, state, {
      commande_user: action.payload
    });
  }

  if (action.type === CHANGE_DEVIS) {
    return Object.assign({}, state, {
      devis_user: action.payload
    });
  }

  if (action.type === CHANGE_AUTH) {
    return Object.assign({}, state, {
      auth: action.payload
    });
  }

  return state;
}
export default rootReducer;