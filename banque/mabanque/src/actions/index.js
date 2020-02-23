import { CHANGE_CO, CHANGE_NHEADER, CHANGE_TRANSFERS, CHANGE_DEPOTS, CHANGE_ACCOUNTSP, CHANGE_ALERTES, CHANGE_ACCOUNTP,CHANGE_ACCOUNTSB, CHANGE_USER, CHANGE_USERP, CHANGE_USERB, CHANGE_ADMIN, CHANGE_BANKERB, CHANGE_COB, CHANGE_COA, CHANGE_ACCOUNTS, CHANGE_SUIVI_PAGE, CHANGE_SUIVI_PAGEB, CHANGE_TITLE, CHANGE_STYLED, CHANGE_STYLEC, CHANGE_PROFILE, CHANGE_COMMANDE, CHANGE_DEVIS, CHANGE_AUTH} from "./action-types";
 

export function changeCo(payload) {
  return { type: CHANGE_CO, payload }
};

export function changeAlertes(payload) {
  return { type: CHANGE_ALERTES, payload }
};

export function changeTransfers(payload) {
  return { type: CHANGE_TRANSFERS, payload }
};

export function changeDepots(payload) {
  return { type: CHANGE_DEPOTS, payload }
};

export function changeUser(payload) {
  return { type: CHANGE_USER, payload }
};
export function changeUserP(payload) {
  return { type: CHANGE_USERP, payload }
};

export function changeUserB(payload) {
  return { type: CHANGE_USERB, payload }
};
export function changeNHeader(payload) {
  return { type: CHANGE_NHEADER, payload }
};

export function changeBankerB(payload) {
  return { type: CHANGE_BANKERB, payload }
};


export function changeAdmin(payload) {
  return { type: CHANGE_ADMIN, payload }
};


export function changeAccounts(payload) {
  
  return { type: CHANGE_ACCOUNTS, payload }
};


export function changeAccountsP(payload) {
  return { type: CHANGE_ACCOUNTSP, payload }
};

export function changeAccountP(payload) {
  return { type: CHANGE_ACCOUNTP, payload }
};

export function changeAccountsB(payload) {
  return { type: CHANGE_ACCOUNTSB, payload }
};

export function changeCoB(payload) {
  return { type: CHANGE_COB, payload }
};

export function changeCoA(payload) {
  return { type: CHANGE_COA, payload }


};

export function changeSuiviP(payload) {
  return { type: CHANGE_SUIVI_PAGE, payload }
};

export function changeSuiviPB(payload) {
  return { type: CHANGE_SUIVI_PAGEB, payload }
};

export function changeTitle(payload) {
  return { type: CHANGE_TITLE, payload }
};

export function changeStyleD(payload) {
  return { type: CHANGE_STYLED, payload }
};

export function changeStyleC(payload) {
  return { type: CHANGE_STYLEC, payload }
};

export function changeProfile(payload) {
  return { type: CHANGE_PROFILE, payload }
};

export function changeCommande(payload) {
  return { type: CHANGE_COMMANDE, payload }
};

export function changeDevis(payload) {
  return { type: CHANGE_DEVIS, payload }
};

export function changeAuth(payload) {
  return { type: CHANGE_AUTH, payload }
};
// Fonction pour API
/*export function getData() {
  return { type: DATA_REQUESTED };
}*/