import React from 'react';

import '../assets/comment.css'

export default function comment({ item, onChangeValue }) {
  return <div className='comment'>
    <textarea onChange={onChangeValue} value={item.value}>
    </textarea>
    <div>
      <div>좋아요</div>
      <div>답글달기</div>
    </div>
    {
      item.reply.length > 0 ? <div>답글 {item.reply.length}개</div> : null
    }

  </div>
}