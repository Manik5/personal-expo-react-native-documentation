import createDataContext from './createDataContext';


const blogReducer = (state, action) => {
  switch (action.type) {
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
    case 'ADD_BLOG_POST':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content
        }
      ];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({
      type: 'ADD_BLOG_POST',
      payload: { title, content}
    })
    callback();
  }
};

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({ type: 'DELETE_BLOG_POST', payload: id})
  }
};

const editBlogPost = dispatch => {
  return (id, title, content) => {
    dispatch({
      type: 'EDIT_BLOG_POST',
      payload: { id, title, content }
    })
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  // Sample post that will appear on the initial screen"
  [{ title: 'TEST POST', content: 'TEST CONTENT', id: 1}]
);
