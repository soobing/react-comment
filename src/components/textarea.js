import React from 'react'

const onResize = (e) => {
  e.target.style.height = "1px";
  e.target.style.height = (e.target.scrollHeight) + "px";
}
export default function textarea({ createComment }) {
  return <textarea className='default-comment'
    placeholder='댓글을 입력하세요..'
    onKeyDown={(e) => {
      if (e.keyCode == 13 && !e.shiftKey) {
        console.log('높이이이', e.target.style.height)
        createComment(e.target.value, e.target.style.height);
        e.target.value = '';
        e.preventDefault();
        e.stopPropagation();
      }
      onResize(e)
    }}
    onKeyUp={e => {
      onResize(e);
    }} />

}