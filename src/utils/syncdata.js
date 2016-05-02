import { Alert } from 'react-native';
import { currentUser, cleanUser } from './session';
//const baseUrl = 'http://apiv2.marrynovo.com/api/v1/';
//const baseUrl = 'http://192.168.199.152:3000/api/v1/';
const baseUrl = 'http://192.168.1.152:3000/api/v1/';

async function request(url, options) {
  const me = await currentUser();
  if (!me) {
    return;
  }

  try {
    const { uid, authentication_token } = me;
    const { method, body } = options;
    let response = {};
    if (method === 'get') {
      response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-User-Id': uid,
          'X-User-Token': authentication_token,
        },
        method: 'get',
      });
    } else {
      response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-User-Id': uid,
          'X-User-Token': authentication_token,
        },
        method,
        body,
      });
    }

    const resp = await response.json();
    if ( resp === null ) {
      //空数据返回
      return null;
    } else if (resp.error) {
      //服务器异常 清空数据
      Alert.alert(resp.error)
      //Alert.alert('请求错误','网络请求异常，请关闭重试');
      await cleanUser();
      return false;
    } else {
      //返回正常
      return resp;
    }

  } catch (e) {
    console.log('throw: ', e);
  }
}

export async function postFeedback(data) {
  const options = { method: 'post', body: JSON.stringify({ feedback: data }) };
  const url = baseUrl.concat('syncdata/feedback');
  return await request(url, options);
}

export async function getMarry() {
  const options = { method: 'get' };
  const url = baseUrl.concat('syncdata/');
  return await request(url, options);
}

export async function setMarry(data) {
  let options = {};
  let url = '';
  if (data.id) {
    options = { method: 'put', body: JSON.stringify({ marry: data }) };
    url = `${baseUrl}syncdata/${data.id}`;
  } else {
    options = { method: 'post', body: JSON.stringify({ marry: data }) };
    url = `${baseUrl}syncdata/`;
  }
  return await request(url, options);
}

export async function loadTask() {
  const options = { method: 'get' };
  const url = `${baseUrl}tasks`;
  return await request(url, options);
}

export async function createTask(data) {
  const options = { method: 'post', body: JSON.stringify({ task: data }) };
  const url = `${baseUrl}tasks`;
  return await request(url, options);
}

export async function updateTask(data) {
  const options = { method: 'put', body: JSON.stringify({ task: data }) };
  const url = `${baseUrl}tasks/${data.id}`;
  return await request(url, options);
}

export async function loadRemarks(task) {
  const options = { method: 'get' };
  const url = `${baseUrl}tasks/${task.id}/remarks`;
  return await request(url, options);
}

export async function createRemark(task, uploadData) {
  const options = { method: 'post', body: JSON.stringify({ uploadData }) };
  const url = `${baseUrl}tasks/${task.id}/remark`;
  return await request(url, options);
}

export async function getStories(marry) {
  const options = { method: 'get' };
  const url = `${baseUrl}syncdata/${marry.id}/stories`;
  return await request(url, options);
}

export async function updateStory(marry, story) {
  const options = { method: 'put', body: JSON.stringify({ marry_story: story }) }
  const url =  `${baseUrl}syncdata/${marry.id}/story/${story.id}`;
  return await request(url, options);
}

export async function deleteStory(marry, story) {
  const options = { method: 'delete', body: JSON.stringify({ marry_story: story }) }
  const url =  `${baseUrl}syncdata/${marry.id}/story/${story.id}`;
  return await request(url, options);
}

export async function createStory(marry, data) {
  const options = { method: 'post', body: JSON.stringify({ marry_story: data }) };
  const url = `${baseUrl}syncdata/${marry.id}/story`;
  return await request(url, options);
}

export async function getMoney(marry) {
  const options = { method: 'get' };
  const url = `${baseUrl}syncdata/${marry.id}/money`;
  return await request(url, options);
}

export async function heartBeat() {
  const options = { method: 'get' };
  const url = `${baseUrl}syncdata/heart_beat`;
  return await request(url, options);
}

export async function createMoney(marry, data) {
  const options = { method: 'post', body: JSON.stringify({ money: data }) };
  const url = `${baseUrl}syncdata/${marry.id}/money`;
  return await request(url, options);
}

export async function findMoney(marry, data) {
  const options = { method: 'get' };
  const url = `${baseUrl}syncdata/${marry.id}/money/${data.id}`;
  return await request(url, options);
}

export async function updateMoney(marry, data) {
  const options = { method: 'put', body: JSON.stringify({ money: data }) };
  const url = `${baseUrl}syncdata/${marry.id}/money/${data.id}`;
  return await request(url, options);
}

export async function deleteMoney(marry, data) {
  const options = { method: 'delete' };
  const url = `${baseUrl}syncdata/${marry.id}/money/${data.id}`;
  return await request(url, options);
}

export async function createInvitation(data) {
  const options = { method: 'post', body: JSON.stringify({ match: data }) };
  const url = `${baseUrl}syncdata/invitation`;
  return await request(url, options);
}

export async function loadInvitation() {
  const options = { method: 'get' };
  const url = `${baseUrl}syncdata/invitations`;
  return await request(url, options);
}

export async function passInvitation(id) {
  const options = { method: 'put' };
  const url = `${baseUrl}syncdata/invitation/${id}`;
  return await request(url, options);
}
