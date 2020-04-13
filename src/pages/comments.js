import React from 'react';
import Comment from '../components/comment';
import TextArea from '../components/textarea';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';
import postImg from '../assets/images/post.png'
import '../assets/style.css'
export default function commentsPage() {
  const { comments } = useSelector(state => state);
  const { data } = comments;
  const dispatch = useDispatch();


  const createComment = (value) => {
    dispatch({
      type: types.COMMENT_CREATE,
      data: {
        id: new Date().valueOf(),
        value: value,
        like: false,
        likeCount: 0,
        parentId: null
      }
    })
  }

  const map = new Map();
  map.set('root', [])
  data.forEach((item, index) => {
    if (item.parentId === null) {
      map.get('root').push(item)
    } else {
      if (map.get(item.parentId) === undefined) {
        map.set(item.parentId, [item]);
      } else {
        map.get(item.parentId).push(item)
      }
    }
  })
  console.log('map', map)
  return <div className='wrapper'>
    {/* <img className='post' src={postImg} /> */}
    <TextArea createComment={createComment} />
    {
      map.get('root').map((item, index) => {
        return <Comment key={index}
          item={item}
          reply={map.get(item.id) === undefined ? [] : map.get(item.id)}
          onChangeValue={(e) =>
            dispatch({
              type: types.COMMENT_SET_VALUE,
              data: {
                index: index,
                key: 'value',
                value: e.target.value
              }
            })}
          onClickDelete={(e) => {
            console.log(item.id)
            dispatch({
              type: types.COMMENT_DELETE,
              data: {
                index: index
              }
            })
          }} />
      })
    }
  </div>
}