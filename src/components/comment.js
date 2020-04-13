import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

import TextArea from '../components/textarea';

import '../assets/comment.css'

export default function comment({ item, reply, onChangeValue, onClickDelete }) {
  const [showReplyTextarea, setShowReplyTextarea] = useState(false);

  const dispatch = useDispatch();

  return <div className='comment'>
    <textarea className='default-comment'
      style={item.height ? { height: item.height } : {}}
      onChange={onChangeValue} value={item.value} />
    <div>
      <div>좋아요</div>
      <div onClick={() => setShowReplyTextarea(true)}>답글달기</div>
      <div onClick={onClickDelete}>삭제</div>
    </div>
    {
      reply.length > 0 ? <div>답글 {reply.length}개</div> : null
    }
    {
      reply.map((item, index) => <p key={index}>{item.value}</p>)
    }
    <div>
      {
        showReplyTextarea ?
          <TextArea onKeyDown={(e) => {
            if (e.keyCode == 13 && !e.shiftKey) {
              dispatch({
                type: types.COMMENT_CREATE,
                data: {
                  id: new Date().valueOf(),
                  value: e.target.value,
                  like: false,
                  likeCount: 0,
                  parentId: item.id,
                  height: e.target.style.height
                }
              })
              e.target.value = '';
              e.preventDefault();
              e.stopPropagation();
            }
          }} />
          : null
      }

    </div>

  </div>
}