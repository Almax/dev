import md5 from 'md5';
import Storage from 'react-native-storage';
import { currentUser, cleanUser } from './session';
const session = new Storage({
    size: 5000,    
    defaultExpires: 1000 * 3600 * 24 * 365,
    enableCache: true,
    sync: {
    }
});

const baseUrl = 'http://apiv2.marrynovo.com/api/v1';
//const baseUrl = 'http://192.168.199.152:3000/api/v1';
//const baseUrl = 'http://192.168.1.152:3000/api/v1';


export function getRoom(me_id, object_id) {
	if(me_id > object_id) {
		return md5(`${me_id}:${object_id}`);
	} else {
		return md5(`${object_id}:${me_id}`);
	}
}

export async function request(url, options) {
  const me = await currentUser();
  if (!me) {
    return;
  }
	const { uid, authentication_token } = me;
	const { method, body } = options;
	if(method === 'post' || method === 'put') {
		let response = await fetch(`${baseUrl}${url}`, {
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		    'X-User-Id': uid,
		    'X-User-Token': authentication_token,
		  },
		  method: method,
		  body: JSON.stringify(body)
		});
		return response.json();
	} else {
		let response = await fetch(`${baseUrl}${url}`, {
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		    'X-User-Id': uid,
		    'X-User-Token': authentication_token,
		  },
		  method: method
		});
		return response.json();
	}

}

export async function load(room_id) {
	return await request(`/chats/${room_id}`, { method: 'get' });
}

export async function append(room_id, user_id, messageText, date) {
	return await request('/chats', {
		method: 'post', 
		body: {
			chat: {
	  		room_id,
	  		uid: user_id,
	  		messageText,
	  		date
			}
		} 
	});
}

export async function listFriends() {
	return await request('/friendships', { method: 'get' });
}

export async function inviteFriend(friend_uid) {
	return request('/friendships', {
		method: 'post',
		body: {
	  	friendship: {
	  		uid: friend_uid
	  	}
		}
	})
}

export async function getInvitedMessages() {
	return await request('/friendships/invited', {
		method: 'get'
	})
}

export async function passInviteRequest(friend_uid) {
	return await request('/friendships/approve', {
		method: 'post',
		body: {
			'friendship': {
				uid: friend_uid
			}
		}
	})
}

export async function newSession(friend) {
	try {
		let existed = false;
		let chats = await session.load({ key: 'chats' });
		Object.keys(chats).map((key) => {
			if(chats[key].uid === friend.uid) {
				existed = true;
			}
		});
		if(existed === false) {
			chats.unshift(friend);
			await session.save({ key: 'chats', rawData: chats });
		}
		return friend;
	} catch(e) {
		const list = [friend];
		await session.save({ key: 'chats', rawData: list });
		return friend;
	}
}

export async function loadSession() {
	try {
		return await session.load({ key: 'chats' });
	} catch(e) {
		await session.save({ key: 'chats', rawData: [] });
		return [];
	}
}

export async function cleanSession() {
	try {
		await session.remove({ key: 'chats' });
		return [];
	} catch(e) {
		console.warn('error:', e);
	}
}