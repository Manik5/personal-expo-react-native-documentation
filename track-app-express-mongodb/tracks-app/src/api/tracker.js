import axios from 'axios';

export default axios.create({
  // change it every 8 hour --> by typing ngrok http 3000
	baseURL: "http://37de44964eaf.ngrok.io",
});
