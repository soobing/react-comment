import * as types from '../actions'

const initialState = {
  data: [
    {
      id: 0,
      value: '',
      like: false,
      likeCount: 0,
      parentId: null,
      reply: []
    },
    {
      id: 1,
      value: '1번 커멘트',
      like: false,
      likeCount: 0,
      parentId: null,
      reply: []
    },
    {
      id: 2,
      value: '2번 커멘트',
      like: false,
      likeCount: 0,
      parentId: null,
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
          ...state.data.slice(0, action.data.id),
          {
            ...state.data[action.data.id],
            [action.data.key]: action.data.value
          },
          ...state.data.slice(action.data.id + 1, action.data.length)
        ]
      }
    default:
      return state;
  }
}

export default comments;