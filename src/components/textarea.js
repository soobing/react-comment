import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function textarea(props) {
  const dispatch = useDispatch();
  const onResize = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }
  const { onKeyDown } = props;
  return <textarea className='default-comment'
    {...props}
    placeholder='댓글을 입력하세요..'
    onKeyDown={(e) => {
      if (onKeyDown) {
        onKeyDown(e);
      }
      onResize(e);
    }}
    onKeyUp={e => {
      onResize(e);
    }} />

}