import React from 'react'

const onResize = (e) => {
  e.target.style.height = "1px";
  e.target.style.height = (e.target.scrollHeight) + "px";
}
export default function textarea({ createComment }) {
  return <textarea className='default-comment'
    placeholder='댓글을 입력하세요..'
    onKeyDown={(e) => {
      if (e.keyCode == 13) {
        if (!e.shiftKey) {
          createComment(e.target.value);
          e.target.value = ''
          e.stopPropagation();
        }
      } else {
        onResize(e);
      }
    }} onKeyUp={onResize} />

}