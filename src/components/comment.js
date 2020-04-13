import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

import TextArea from '../components/textarea';

import '../assets/comment.css'

export default function comment({ item, onChangeValue, onClickDelete }) {
  const [showReplyTextarea, setShowReplyTextarea] = useState(false);

  const dispatch = useDispatch();
  const createComment = (value) => {

    dispatch({
      type: types.COMMENT_CREATE,
      data: {
        id: Symbol(),
        value: value,
        like: false,
        likeCount: 0,
        parentId: item.id,
        createdAt: new Date(),
        reply: []
      }
    })
  }

  return <div className='comment'>
    <textarea onChange={onChangeValue} value={item.value}>
    </textarea>
    <div>
      <div>좋아요</div>
      <div onClick={() => setShowReplyTextarea(true)}>답글달기</div>
      <div onClick={onClickDelete}>삭제</div>
    </div>
    {
      item.reply.length > 0 ? <div>답글 {item.reply.length}개</div> : null
    }
    <div>
      {
        showReplyTextarea ?
          <TextArea createComment={createComment} />
          : null
      }

    </div>

  </div>
}