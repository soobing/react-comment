import React from 'react';
import Comment from '../components/comment';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

export default function commentsPage() {
  const { comments } = useSelector(state => state);
  const dispatch = useDispatch();
  return <div>
    <h1 onClick={() => dispatch({ type: types.APP_ACTION_TEST, data: !comments.isTest })}>Comments Page</h1>
    <p>{String(comments.isTest)}</p>
    <Comment />
    <Comment />
  </div>
}