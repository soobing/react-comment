import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

export default function textarea(props) {
  const dispatch = useDispatch();

  const { item, onKeyDown } = props;
  const onResize = (e) => {
    if (item) {
      dispatch({
        type: types.COMMENT_SET_VALUE,
        data: {
          id: item.id,
          key: 'height',
          value: e.target.scrollHeight + "px"
        }
      })
    } else {
      e.target.style.height = "1px";
      e.target.style.height = (e.target.scrollHeight) + "px";
    }
  }
  return <textarea className='default-comment textarea'
    {...props}
    style={item ? { height: item.height } : {}}
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