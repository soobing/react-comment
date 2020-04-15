import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

import TextArea from '../components/textarea';
import '../assets/comment.css'
import more from '../assets/images/more.png'

export default function orange({ replyCallback, item }) {
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
      <div className='more-wrapper'>
        <img src={more} />
        <div className='more-modal'>
          <div>수정하기...</div>
          <div onClick={(e) => {
            dispatch({
              type: types.COMMENT_DELETE,
              data: {
                id: item.id
              }
            })
          }}>삭제하기...</div>
        </div>
      </div>
    </div>
  </div>
}