import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

import TextArea from '../components/textarea';

import '../assets/comment.css'

export default function comment({ item, reply, onChangeValue, onClickDelete }) {
  const [showReplyTextarea, setShowReplyTextarea] = useState(false);

  const dispatch = useDispatch();

  return <div className='comment'>
    <TextArea
      item={item}
      onChange={onChangeValue} value={item.value} />
    <div>
      <div>좋아요</div>
      <div onClick={() => setShowReplyTextarea(true)}>답글달기</div>
      <div onClick={onClickDelete}>삭제</div>
    </div>
    <div>
      {
        reply.length > 0 ? `답글 ${reply.length}개` : ''
      }
    </div>
    <div>
      {
        reply.map((item, index) => <TextArea key={index}
          item={item}
          onChange={(e) =>
            dispatch({
              type: types.COMMENT_SET_VALUE,
              data: {
                id: item.id,
                key: 'value',
                value: e.target.value
              }
            })}
          value={item.value} />)
      }
      {
        showReplyTextarea ?
          <TextArea item={null}
            autoFocus={true}
            onKeyDown={(e) => {
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
                e.target.scrollIntoView();
                e.preventDefault();
                e.stopPropagation();
              }
            }} />
          : null
      }

    </div>

  </div>
}