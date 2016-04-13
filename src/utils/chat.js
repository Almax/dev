import md5 from 'md5';
import Storage from 'react-native-storage';
import { currentUser, cleanUser } from './session';
// const session = new Storage({
//     size: 5000,    
//     defaultExpires: 1000 * 3600 * 24 * 365,
//     enableCache: true,
//     sync: {
//     }
// });

//const baseUrl = 'http://test.marrynovo.com/api/v1';
const baseUrl = 'http://192.168.199.152:3000/api/v1';

export function getRoom(me_id, object_id) {
	if(me_id > object_id) {
		return md5(`${me_id}:${object_id}`);
	} else {
		return md5(`${object_id}:${me_id}`);
	}
}

export async function load(room_id) {
  const me = await currentUser();
  if (!me) {
    return;
  }
	const { uid, authentication_token } = me;
	let response = await fetch(`${baseUrl}/chats/${room_id}`, {
	  headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json',
	    'X-User-Id': uid,
	    'X-User-Token': authentication_token,
	  },
	  method: 'get'
	});
	return response.json();
}

export async function append(room_id, user_id, messageText, date) {
  const me = await currentUser();
  if (!me) {
    return;
  }
	const { uid, authentication_token } = me;
	let response = await fetch(`${baseUrl}/chats`, {
	  headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json',
	    'X-User-Id': uid,
	    'X-User-Token': authentication_token,
	  },
	  method: 'post',
	  body: JSON.stringify({
	  	chat: {
	  		room_id,
	  		uid: user_id,
	  		messageText,
	  		date
	  	}
	  })
	});
	return await response.json();
}

export async function inviteFriend(friend_uid) {
  const me = await currentUser();
  if (!me) {
    return;
  }
	const { uid, authentication_token } = me;
	let response = await fetch(`${baseUrl}/friendships`, {
	  headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json',
	    'X-User-Id': uid,
	    'X-User-Token': authentication_token,
	  },
	  method: 'post',
	  body: JSON.stringify({
	  	friendship: {
	  		uid: friend_uid
	  	}
	  })
	});
	return await response.json();
}

export async function getInvitedMessages() {
  const me = await currentUser();
  if (!me) {
    return;
  }
	const { uid, authentication_token } = me;
	let response = await fetch(`${baseUrl}/friendships/invited`, {
	  headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json',
	    'X-User-Id': uid,
	    'X-User-Token': authentication_token,
	  },
	  method: 'get'
	});
	return await response.json();
}