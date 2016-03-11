'use strict';
import { currentUser } from './session';
const baseUrl = 'http://test.marrynovo.com/api/v1/';
//const baseUrl = 'http://192.168.1.152:3000/api/v1/';

async function request(url, options) {
	var me = await currentUser()
	if(!me)
		return ;
	const { uid, authentication_token } = me;
	const { method, body } = options;
	if(method === 'get') {
		var response = await fetch(url, {
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'X-User-Id': uid,
		    'X-User-Token': authentication_token
			},
			method: "get",
		});
	}else {
		var response = await fetch(url, {
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    'X-User-Id': uid,
		    'X-User-Token': authentication_token
			},
			method: method,
			body: body,
		});
	}
	var resp = await response.json();
	return resp;
}

export async function getMarry() {
	const options = { method: 'get' };
	const url = baseUrl.concat('syncdata/');
	return await request(url, options);
}

export async function setMarry(data) {
	const options = { method: 'put', body: JSON.stringify({ "marry" : data }) };
	var url = "";
	if(data.id) {
		url = baseUrl.concat('syncdata/'+data.id);
	}else {
		url = baseUrl.concat('syncdata/');
	}

	return await request(url, options);
}

export async function loadTask() {
	const options = { method: 'get' };
	const url = baseUrl.concat('tasks');
	return await request(url, options);
}

export async function createTask(data) {
	const options = { method: 'post', body: JSON.stringify({ "task" : data }) };
	const url = baseUrl.concat('tasks');
	return await request(url, options);
}

export async function updateTask(data) {
	const options = { method: 'put', body: JSON.stringify({ "task" : data }) };
	const url = baseUrl.concat('tasks/'+data.id);
	return await request(url, options);
}

export async function loadRemarks(task) {
	const options = { method: 'get' };
	const url = baseUrl.concat('tasks/'+task.id+'/remarks');
	return await request(url, options);
}

export async function createRemark(task, uploadData) {
	const options = { method: 'post', body: JSON.stringify({ uploadData }) };
	const url = baseUrl.concat('tasks/'+task.id+'/remark');
	return await request(url, options);
}

export async function getStories(marry) {
	const options = { method: 'get' };
	const url = baseUrl.concat('syncdata/'+marry.id+'/stories');
	return await request(url, options);
}

export async function createStory(marry, data) {
	const options = { method: 'post', body: JSON.stringify({ marry_story: data }), };
	const url = baseUrl.concat('syncdata/'+marry.id+'/story');
	return await request(url, options);
}

export async function getMoney(marry) {
	const options = { method: 'get', body: JSON.stringify({}), };
	const url = baseUrl.concat('syncdata/'+marry.id+'/money');
	return await request(url, options);
}

export async function heartBeat() {
	const options = { method: 'get'};
	const url = baseUrl.concat('syncdata/heart_beat');
	return await request(url, options);
}

export async function createMoney(marry, data) {
	const options = { method: 'post', body: JSON.stringify({ money: data }), };
	const url = baseUrl.concat('syncdata/'+marry.id+'/money');
	return await request(url, options);
}

export async function findMoney(marry, data) {
	const options = { method: 'get' };
	const url = baseUrl.concat('syncdata/'+marry.id+'/money/'+data.id);
	return await request(url, options);
}

export async function updateMoney(marry, data) {
	const options = { method: 'put', body: JSON.stringify({ money: data }), };
	const url = baseUrl.concat('syncdata/'+marry.id+'/money/'+data.id);
	return await request(url, options);
}

export async function deleteMoney(marry, data) {
	const options = { method: 'delete'};
	const url = baseUrl.concat('syncdata/'+marry.id+'/money/'+data.id);
	return await request(url, options);
}

export async function createInvitation(data) {
	const options = { method: 'post', body: JSON.stringify({ match: data }), };
	const url = baseUrl.concat('syncdata/invitation');
	return await request(url, options);
}

export async function loadInvitation() {
	const options = { method: 'get', };
	const url = baseUrl.concat('syncdata/invitations');
	return await request(url, options);
}

export async function passInvitation(id) {
	const options = { method: 'put', };
	const url = baseUrl.concat('syncdata/invitation/'+id);
	return await request(url, options);
}