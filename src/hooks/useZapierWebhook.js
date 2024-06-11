import axios from "axios";


export function useZapierWebhook() {
  const webhook = axios.create({
    baseURL: 'https://hooks.zapier.com',
  });

  const getQueyParams = (obj) => {
    let params = '';
    for(let key in obj) {
      params += `${key}=${obj[key]}&`;
    }

    return params;
  }

  const sendTicketData = (data) => {
    const params = getQueyParams(data);
    console.log(params);
    return webhook.post(`/hooks/catch/19109434/2ohsbei/?${params}`);
  }

  const getGoogleSheet = (email) => {
    return webhook.post(`/hooks/catch/19109434/2odb0qp/?email=${email}`);
  }
  
  return {
    sendTicketData,
    getGoogleSheet
  }
}