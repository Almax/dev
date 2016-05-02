import { Alert } from 'react-native';
import Storage from 'react-native-storage';
session = new Storage({
    size: 1000,    
    defaultExpires: 1000 * 3600 * 24 * 365,
    enableCache: true,
    sync : {
    	
    }
});
//const base_request = 'http://apiv2.marrynovo.com/api/v1/users';
//const base_request = 'http://192.168.199.152:3000/api/v1/users';
const base_request = 'http://192.168.1.152:3000/api/v1/users';

export async function currentUser() {
	try {
		var result = await session.load({ key: 'loginState' });
		return result;
	}catch(err) {}
}

export async function cleanUser() {
	await session.remove({ key: 'loginState' })
}

export async function storeUserSession(user) {
	if(typeof user === 'object') {
		await session.save({
		  key: 'loginState', 
		  rawData: user,
		});
		return user;
	}else {
		await currentUser();
	}
}

export async function userLogin(username, password) {
	try {
		var response = await fetch(base_request+'/', {
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify({username, password})
		});

		const user = await response.json();

		if(user.error) {
			Alert.alert('登陆失败', user.error);
			return null;
		}else {
			await session.save({
			    key: 'loginState', 
			    rawData: user,
			});
		}
		return user;
	}catch(e) {
		console.log('error', e);
	}
}

export async function updateBasicProfile(profile) {
	var session = await currentUser()
	var response = await fetch(base_request+'/', {
		headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	    'X-User-Id': session.uid,
	    'X-User-Token': session.authentication_token
		},
		method: 'put',
		body: JSON.stringify({ user: profile })
	});
	var resp = await response.json();
	return resp;
}

export async function updateName(my_name, partner_name, session) {
	var response = await fetch(base_request+'/update_our_name', {
		headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	    'X-User-Id': session.uid,
	    'X-User-Token': session.authentication_token
		},
		method: 'post',
		body: JSON.stringify({my_name, partner_name})
	});
	var user = await response.json()
	await session.save({
	  key: 'loginState', 
	  rawData: user,
	})
	return user;
}

export async function sendActivation(username) {
	var response = await fetch(base_request+'/bind', {
		headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
		},
		method: 'post',
		body: JSON.stringify({user: { username }})
	});

	var resp = await response.json();
	return resp;
}

export async function doActivation(data) {
	var response = await fetch(base_request+'/bind', {
		headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
		},
		method: 'put',
		body: JSON.stringify({user: data})
	});

	var resp = await response.json();
	return resp;
}

export async function findPassword(data) {
	var response = await fetch(base_request+'/find_password', {
		headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
		},
		method: 'post',
		body: JSON.stringify({user: data})
	});

	var resp = await response.json();
	console.log('resp:', resp);
	return resp;
}

export async function findPasswordConfirm(data) {
	var response = await fetch(base_request+'/find_password', {
		headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
		},
		method: 'put',
		body: JSON.stringify({user: data})
	});

	var resp = await response.json();
	return resp;
}

export async function findUser(username) {
	try {
		var response = await fetch(base_request+'/search', {
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify({username})
		});

		var resp = await response.json();
		return resp;
	}catch(e) {
		console.warn('throw', e);
	}
}