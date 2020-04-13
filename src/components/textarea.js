import React from 'react'

const onResize = (e) => {
  e.target.style.height = "1px";
  e.target.style.height = (e.target.scrollHeight) + "px";
}
export default function textarea({ onKeyDown }) {
  return <textarea className='default-comment'
    placeholder='댓글을 입력하세요..'
    onKeyDown={(e) => {
      onKeyDown(e);
      onResize(e);
    }}
    onKeyUp={e => {
      onResize(e);
    }} />

}