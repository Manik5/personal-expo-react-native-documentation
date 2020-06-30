import axios from 'axios';

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      'Bearer 0KGIYtP8jvxaDdKAwh9Pk7R22n_qaATh5w0iBxJjlAOngdSMn1jl0KNJ5DndXiFISx70buT1yaBn-rreGzXC5fN0RPboX_UDpbaIGu2y3E9hvveeS0TfPc4fDx7yXnYx'
  }
});

