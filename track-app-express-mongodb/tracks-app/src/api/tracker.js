import axios from 'axios';

export default axios.create({
  // change it every 8 hour --> by typing ngrok http 3000
  baseURL: "http://7c060aede6e4.ngrok.io",
});
