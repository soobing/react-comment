import React from 'react';
import Comment from '../components/comment';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

export default function commentsPage() {
  const { comments } = useSelector(state => state);
  const { data } = comments;
  const dispatch = useDispatch();


  const createComment = (parentId, value) => {
    dispatch({
      type: types.COMMENT_CREATE, data: {
        value: value,
        createdAt: new Date()
      }
    })
  }
  const onResize = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight) + "px";
  }

  return <div>
    <h1>Comments Page</h1>

    <textarea className='default-comment'
      placeholder='댓글을 입력하세요..'
      onKeyDown={(e) => {
        if (e.keyCode == 13) {
          if (!e.shiftKey) {
            createComment(null, e.target.value);
            e.target.value = ' '
            e.stopPropagation();
          }
        } else {
          onResize(e);
        }
      }} onKeyUp={onResize} />
    {
      data.map((item, index) => {
        return <Comment key={index} item={item}
          onChangeValue={(e) =>
            dispatch({
              type: types.COMMENT_SET_VALUE,
              data: {
                index: index,
                key: 'value',
                value: e.target.value
              }
            })}
          onClickDelete={(e) => {
            console.log(item.id)
            dispatch({
              type: types.COMMENT_DELETE,
              data: {
                index: index
              }
            })
          }} />
      })
    }
  </div>
}