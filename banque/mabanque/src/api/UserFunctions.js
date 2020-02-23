import axios from 'axios';

export const login = user => {
	return axios({
		method: 'post',
		url: process.env.REACT_APP_API+'/api/user_login',
		data: {
		mailadress: user.mailadress,
		passworduser: user.passworduser
		},
		auth: {
		username: process.env.REACT_APP_USERNAME,  //This could be your email
		password: process.env.REACT_APP_PASSWORD
		},
	})
	.then(response => {
		localStorage.setItem('usertokenp', response.data);	
		return response.data;
	})
	.catch(err => {
		if(typeof err.response.status != undefined){
			if(err.response.status === 429){
				user.ok = 429;
			}
			if(err.response.status === 400){
					user.ok = 400;
			}
			if(err.response.status === 401){
					user.ok = 401;
			}
		}
	})
}
export const register = user => {	
	return axios({
		method: 'post',
		url: process.env.REACT_APP_API+'/api/user_register',
		data: {
		firstname: user.firstname,
		lastname: user.lastname,
		mailadress: user.mailadress,
		passworduser: user.passworduser,
		adress: user.adress,
		phonenumber: user.phonenumber
		},
		auth: {
		username: process.env.REACT_APP_USERNAME,  //This could be your email
		password: process.env.REACT_APP_PASSWORD
		},
	})
	.then(response => {	
		return response.data;
	})
	.catch(err => {
	})
}

export const login_banker = banker => {
	return axios({
        method: 'post',
    	url: process.env.REACT_APP_API+'/api/banker_login',
        data: {
        	mailadress: banker.mailadress,
	      	passwordbanker: banker.passwordbanker
        },
        auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
        },
    })
	.then(response => {
		localStorage.setItem('usertokenb', response.data);
		return response.data;
	})
	.catch(err => {	
		if(typeof err.response.status != undefined){
			if(err.response.status === 429){
				banker.ok = 429;
			}
			if(err.response.status === 400){
					banker.ok = 400;
			}
			if(err.response.status === 401){
					banker.ok = 401;
			}
		}	
	})
}

export const register_banker = banker => {	
	return axios({
		method: 'post',
		url: process.env.REACT_APP_API+'/api/banker_register',
		data: {
		userid: banker.userid,
		firstname: banker.firstname,
		lastname: banker.lastname,
		mailadress: banker.mailadress,
		passwordbanker: banker.passwordbanker
		},
		auth: {
		username: process.env.REACT_APP_USERNAME,  //This could be your email
		password: process.env.REACT_APP_PASSWORD
		},
    })
	.then(response => {  
		return response.data;
	})
	.catch(err => {	
	})
}

export const create_account = account => {	
	return axios({
        method: 'post',
        url: process.env.REACT_APP_API+'/api/create_account',
        data: {
          	iduser: account.iduser,
            amount: account.amount,
	      	accountlimit: account.accountlimit
        },
    	auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
        }
    })
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}

export const alerte = (alerte) => {	
	return axios({
		method: 'post',
		url: process.env.REACT_APP_API+'/api/alerte',
		data: {
          	iduser: alerte.iduser,
	      	description: alerte.description
		},
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
			password: process.env.REACT_APP_PASSWORD
		}
	})
	.then(response => {	
		return response.data;
	})
	.catch(err => {	
	})
}

export const depot = (depot) => {	
	return axios({
		method: 'post',
		url: process.env.REACT_APP_API+'/api/depot',
		data: {
          	description: depot.description,
	      	destination: depot.destination,
	      	amount:depot.amount
		},
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {
	})
}

export const transfer = (transfer) => {	
	return axios({
		method: 'post',
		url: process.env.REACT_APP_API+'/api/transfer',
		data: {
          	description: transfer.description,
	      	senderid: transfer.senderid,
	      	receiverid:transfer.receiverid,
	      	amount:transfer.amount
		},
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}
	})
	.then(response => {	
		return response.data;
	})
	.catch(err => {
	})
}


export const profile_banker = () => {
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/banker_profile',
		headers:{
			Authorization : localStorage.getItem('usertokenb')
		} 
	})
    .then(response => {
		return response.data;
	})
	.catch(err => {		
	})
}

export const profile_user = () => {	
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/user_profile',
		headers:{
			Authorization : localStorage.getItem('usertokenp')
		 } 
	})
    .then(response => {      
		return response.data;
	})
	.catch(err => {		
	})
}

export const get_accounts = (account) => {	
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/get_accounts/'+account.id,
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}


export const get_bankers = () => {
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/get_bankers',
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {	
		return response.data;
	})
	.catch(err => {    	
	})
}

export const get_banker = data => {
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/get_banker/'+data,
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}

export const get_alerte = data => {
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/get_alerte/'+data,
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		} 
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {
	})
}

export const get_depot = data => {
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/get_depot/'+data,
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}

export const get_transfer = data => {
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/get_transfer/'+data,
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {	
		return response.data;
	})
	.catch(err => {
	})
}

export const update_account = (account) => {
	return axios({
		method: 'put',
		url: process.env.REACT_APP_API+'/api/update_account/'+account.idaccount,
		data: {
            amount: account.amount,
	      	accountlimit: account.accountlimit
		},
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {	
		return response.data;
	})
	.catch(err => {    	
	})
}

export const update_user = (user) => {
	return axios({
		method: 'put',
		url: process.env.REACT_APP_API+'/api/update_user/'+user.iduser,
		data: {
	      	firstname:user.firstname,
            lastname:user.lastname,
            mailadress:user.mailadress,
            phonenumber:user.phonenumber,
            adress:user.adress,
            passworduser:user.passworduser
		},
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {	
		return response.data;
	})
	.catch(err => {  	
	})
}

export const update_user2 = (user) => {
	return axios({
		method: 'put',
		url: process.env.REACT_APP_API+'/api/update_user/'+user.iduser,
		data: {
	      	firstname:user.firstname,
            lastname:user.lastname,
            mailadress:user.mailadress,
            phonenumber:user.phonenumber,
            adress:user.adress
		},
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}

export const update_banker = (banker) => {
	return axios({
		method: 'put',
		url: process.env.REACT_APP_API+'/api/update_banker/'+banker.bankerid,
		data: {
			userid:banker.userid,
			firstname:banker.firstname,
			lastname:banker.lastname,
			mailadress:banker.mailadress,
			passwordbanker:banker.passwordbanker
		},
		auth: {
			username: process.env.REACT_APP_USERNAME,  //This could be your email
			password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}

export const get_account = (data) => {
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/get_account/'+data,
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}

export const delete_account = (data) => {
	return axios({
		method: 'delete',
		url: process.env.REACT_APP_API+'/api/delete_account',
		data: {
			idaccount: data.idaccount
		},
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}

export const delete_banker = (data) => {
	return axios({
		method: 'delete',
		url: process.env.REACT_APP_API+'/api/delete_banker',
		data: {
            bankerid: data.bankerid
		},
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
	    	password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {  
		return response.data;
	})
	.catch(err => {
	})
}

export const get_user = (data) => {
	return axios({
		method: 'get',
		url: process.env.REACT_APP_API+'/api/get_user/'+data.id,
		auth: {
            username: process.env.REACT_APP_USERNAME,  //This could be your email
			password: process.env.REACT_APP_PASSWORD
		}  
	})
	.then(response => {
		return response.data;
	})
	.catch(err => {	
	})
}