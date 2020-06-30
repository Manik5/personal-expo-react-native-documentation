import axios from 'axios';

export default axios.create({
  baseURL: "http://b443726c9516.ngrok.io" // change this every 8 hour, by running npm run tunnel inside the jsonserver folder
});
