import React from 'react';
import Comment from '../components/comment';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

export default function commentsPage() {
  const { comments } = useSelector(state => state);
  const { data } = comments;
  const dispatch = useDispatch();
  return <div>
    <h1 onClick={() => dispatch({ type: types.APP_ACTION_TEST, data: !comments.isTest })}>Comments Page</h1>
    <p>{String(comments.isTest)}</p>
    {
      data.map((item) => {
        return <Comment value={item.value} onChange={(e) =>
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