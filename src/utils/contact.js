import { Alert } from 'react-native';
import Storage from 'react-native-storage';
import Contacts from 'react-native-contacts';
import { findUser, currentUser, cleanUser } from './session';
import configs from './configs'; 
const baseUrl = configs.baseUrl;
const session = new Storage({
    size: 5000,    
    defaultExpires: 1000 * 3600 * 24 * 365,
    enableCache: true,
    sync: {
    	
    }
});


export async function init() {
	await session.save({
		key: 'contacts',
		rawData: []
	})
}

export async function load(call) {
	try {
		let new_contacts = [];
		let cachedContacts = await session.load({ key: 'contacts' });
		if(cachedContacts.length > 0) {
			return call(cachedContacts);
		}
		Contacts.getAll((err, contacts) => {
		  if( err && err.type === 'permissionDenied' ){

		  } else {
				new Promise(async (resolve, reject) => {
			  	let c = contacts.filter(function(contact){
					  return contact.phoneNumbers.length > 0;
					});



					for(key in Object.keys(c)) {
			  		let name = `${c[key].familyName ? c[key].familyName : ''}${c[key].givenName ? c[key].givenName : ''}`;
				  	let phone = c[key].phoneNumbers[0] ? c[key].phoneNumbers[0].number : null;
				  	phone = phone.replace(/-|\+86/g, '');
				  	if(phone.match(/\d{11}$/)) {
				  		phone = phone.match(/\d{11}$/)[0];
				  	} else {
				  		continue;
				  	}
				  	let user = await findUser(phone);
				  	if(!user.error) {
				  		new_contacts.unshift({name,phone,user});
				  	} else {
				  		new_contacts.push({name,phone});
				  	}
					}
			  	await session.save({
			  		key: 'contacts',
			  		rawData: new_contacts
			  	});
			  	return call(new_contacts);
				});
		  }
		});
	} catch(e) {
		console.log('error: ', e);
		await init();
	}
}

export async function reload(call) {
	await init();
	try {
		let new_contacts = [];
		Contacts.getAll(async (err, contacts) => {
		  if( err && err.type === 'permissionDenied' ){

		  } else {
				new Promise(async (resolve, reject) => {
			  	let c = contacts.filter(function(contact){
					  return contact.phoneNumbers.length > 0;
					});
					for(key in Object.keys(c)) {
			  		let name = `${c[key].familyName ? c[key].familyName : ''}${c[key].givenName ? c[key].givenName : ''}`;
				  	let phone = c[key].phoneNumbers[0] ? c[key].phoneNumbers[0].number : null;
				  	if(phone.match(/\d{11}$/)) {
				  		phone = phone.match(/\d{11}$/)[0];
				  	} else {
				  		continue;
				  	}
				  	let user = await findUser(phone);
				  	if(!user.error) {
				  		new_contacts.unshift({name,phone,user});
				  	} else {
				  		new_contacts.push({name,phone});
				  	}
					}
			  	await session.save({
			  		key: 'contacts',
			  		rawData: new_contacts
			  	});
			  	return call(new_contacts);
				});

		  }
		});
	} catch(e) {
		console.log('error: ', e);
	}
}

export async function push(user) {
  const me = await currentUser();
  if (!me) {
    return;
  }
  try {
    const { uid, authentication_token } = me;
		let response = await fetch(`${baseUrl}friendships/push`, {
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		    'X-User-Id': uid,
		    'X-User-Token': authentication_token,
		  },
		  method: 'post',
		  body: JSON.stringify({ user: user })
		});
		let resp = await response.json();
		
		if(resp.success) {
			Alert.alert(resp.success);
		} else if(resp.error) {
			Alert.alert(resp.error);
		}
	} catch(e) {
		console.warn(JSON.stringify(e));
	}
}