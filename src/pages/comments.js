import React from 'react';
import Comment from '../components/comment';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';
export default function commentsPage() {
  const { comments } = useSelector(state => state);
  const { data } = comments;
  const dispatch = useDispatch();

  const onResize = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }
  return <div>
    <h1>Comments Page</h1>

    <textarea className='default-comment'
      placeholder='댓글을 입력하세요..'
      onKeyDown={onResize} onKeyUp={onResize} />
    {
      data.map((item) => {
        return <Comment key={item.id} item={item} onChangeValue={(e) =>
          dispatch({
            type: types.COMMENT_SET_VALUE, data: {
              id: item.id,
              key: 'value',
              value: e.target.value
            }
          })} />
      })
    }
  </div>
}