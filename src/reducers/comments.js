import * as types from '../actions'

const initialState = {
  data: [
    {
      id: Symbol(),
      value: '',
      like: false,
      likeCount: 0,
      parentId: null,
      createdAt: '',
      reply: []
    },
    {
      id: Symbol(),
      value: '1번 커멘트',
      like: false,
      likeCount: 0,
      parentId: null,
      createdAt: '',
      reply: []
    },
    {
      id: Symbol(),
      value: '2번 커멘트',
      like: false,
      likeCount: 0,
      parentId: null,
      createdAt: '',
      reply: []
    }
  ]
}

// 리듀서
const comments = (state = initialState, action) => {
  switch (action.type) {
    case types.COMMENT_SET_VALUE:
      return {
        ...state,
        data: [
          ...state.data.slice(0, action.data.index),
          {
            ...state.data[action.data.index],
            [action.data.key]: action.data.value
          },
          ...state.data.slice(action.data.index + 1, action.data.length)
        ]
      }
    case types.COMMENT_CREATE:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.data,
            id: Symbol(),
            like: false,
            likeCount: 0,
            reply: []
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