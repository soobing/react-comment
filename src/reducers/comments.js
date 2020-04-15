import * as types from '../actions'

const initialState = {
  data: [
    // {
    //   id: new Date().valueOf(),
    //   value: '우와 예쁘다',
    //   like: false,
    //   likeCount: 0,
    //   parentId: null,
    //   height: '31px',
    //   isEdit: false,
    //   showMore: false,
    //   showReplyTextarea: false
    // },
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
            id: new Date().valueOf(),
            value: action.data.value,
            like: false,
            likeCount: 0,
            parentId: action.data.parentId,
            height: action.data.height,
            isEdit: false,
            showMore: false,
            showReplyTextarea: false
          }
        ]
      }
    case types.COMMENT_DELETE:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.data.id &&
          item.parentId !== action.data.id)
      }
    case types.COMMENT_SHOWMORE_ITEM:
      return {
        ...state,
        data: state.data.map(item => {
          if (item.id === action.data.id) {
            return {
              ...item,
              showMore: action.data.showMore
            }
          } else {
            return {
              ...item,
              showMore: false
            }
          }
        })
      }
    case types.COMMENT_SHOWMORE_HIDEALL:
      return {
        ...state,
        data: state.data.map(item => {
          return {
            ...item,
            showMore: false
          }
        })
      }
    default:
      return state;
  }
}

export default comments;