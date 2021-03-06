import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BLOG_POSTS':
      return action.payload;
    case 'EDIT_BLOG_POST':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id
          ? action.payload
          : blogPost;
        // if (blogPost.id === action.payload.id) {
        //   action.payload;
        // } else {
        //   return blogPost;
        // }
      })
    case 'DELETE_BLOG_POST':
      return state.filter((blogPost) => blogPost.id !== action.payload );
    // case 'ADD_BLOG_POST':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 9999),
    //       title: action.payload.title,
    //       content: action.payload.content
    //     }
    //   ];
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    dispatch({ type: 'GET_BLOG_POSTS', payload: response.data})
  };
};

const addBlogPost = () => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });
    // dispatch({
    //   type: 'ADD_BLOG_POST',
    //   payload: { title, content}
    // });
    if (callback) {
      callback();
    }
  }
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'DELETE_BLOG_POST', payload: id})
  }
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content })
    dispatch({
      type: 'EDIT_BLOG_POST',
      payload: { id, title, content }
    });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);

