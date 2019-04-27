import axios from 'axios';
import {Storage} from 'aws-amplify';
const XAPI = 'https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev';

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const getForms = async () => {
  try {
    const res = await axios({method: 'GET', url: `${XAPI}/xforms`});
    return res.data.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch(err) {
    console.log(err);
    return [];
  }
};

export const getForm = async (formName) => {
  try {
    const url = await Storage.get(`${formName}.json`);
    const data = await axios.get(url);
    const {form, model} = data.data;
    return {form, model};
  } catch (err) {
    console.log(err);
  }
};

export const deleteForm = async (formId) => {
  try {
    await axios({method: 'DELETE', url:`${XAPI}/xforms/${formId}`});
  } catch(err) {
    console.log(err);
  }
};

export const getSubmission = async(id) => {
  const response = await axios.get(`${XAPI}/xsubmissions/${id}`);
  const formName = response.data.form;
  let content = {};
  if(response.data.content) {
    content = JSON.parse(response.data.content);
  }

  const url = await Storage.get(`${formName}.json`);
  const data = await axios.get(url);
  const {form, model} = data.data;
  return {formName, form, model, content};
};

export const getSubmissions = async (form) => {
  try {
    const res = await axios({method: 'GET', url: `${XAPI}/xsubmissions`});
    const data = res.data.sort((a, b) => b.updatedAt - a.updatedAt);
    return form ? data.filter(i => i.form === form) : data;
  } catch(err) {
    console.log(err);
    return [];
  }
};

export const deleteSubmission = async (id) => {
  try {
    await axios({method: 'DELETE', url: `${XAPI}/xsubmissions/${id}`});
  } catch(err) {
    console.log(err);
  }
};

export const addSubmission = (data) => {
  try {
    return axios({
      method: 'POST',
      headers: DEFAULT_HEADERS,
      url: `${XAPI}/xsubmissions`,
      data: JSON.stringify(data),
      json: true
    });
  } catch(err) {
    console.log(err);
    return null;
  }
};

export const updateSubmission = async (submissionId, data) => {
  try {
    const response = axios({
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      url:`${XAPI}/xsubmissions/${submissionId}`,
      data: JSON.stringify(data),
      json: true
    });
    return response;
  } catch(err) {
    console.log(err);
    return null;
  }
};

// https://s3.amazonaws.com/forms-app-xslx-dev/public/access.json
