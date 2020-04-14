import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

import TextArea from '../components/textarea';

import '../assets/comment.css'

export default function orange({ replyCallback, item }) {
  const [showReplyTextarea, setShowReplyTextarea] = useState(false);

  const dispatch = useDispatch();

  return <div className='comment'>
    <TextArea
      item={item}
      value={item.value}
      onChange={(e) =>
        dispatch({
          type: types.COMMENT_SET_VALUE,
          data: {
            id: item.id,
            key: 'value',
            value: e.target.value
          }
        })} />
    <div>
      <div>좋아요</div>
      {replyCallback && <div onClick={replyCallback}>답글달기</div>}
      <div onClick={(e) => {
        dispatch({
          type: types.COMMENT_DELETE,
          data: {
            id: item.id
          }
        })
      }}>삭제</div>
    </div>
  </div>
}