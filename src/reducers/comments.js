import * as types from '../actions'

const initialState = {
  data: [
    {
      id: new Date().valueOf(),
      value: '',
      like: false,
      likeCount: 0,
      parentId: null,
      height: '31px'
    },
    {
      id: new Date().valueOf() + 1,
      value: '1번 커멘트',
      like: false,
      likeCount: 0,
      parentId: null,
      height: '31px'
    },
    {
      id: new Date().valueOf() + 2,
      value: '2번 커멘트',
      like: false,
      likeCount: 0,
      parentId: null,
      height: '31px'
    }
  ]
}

// 리듀서
const comments = (state = initialState, action) => {
  switch (action.type) {
    case types.COMMENT_SET_VALUE:
      return {
        ...state,
        data: state.data.map(item => {
          if (item.id === action.data.id) {
            return {
              ...item,
              [action.data.key]: action.data.value
            }
          } else {
            return item;
          }
        })
      }
    case types.COMMENT_CREATE:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.data,
          }
        ]
      }
    case types.COMMENT_DELETE:
      return {
        ...state,
        data: [
          ...state.data.slice(0, action.data.index),
          ...state.data.slice(action.data.index + 1, action.data.length)
        ]
      }
    default:
      return state;
  }
}

export default comments;