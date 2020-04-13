import React from 'react';
import Comment from '../components/comment';
import TextArea from '../components/textarea';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

export default function commentsPage() {
  const { comments } = useSelector(state => state);
  const { data } = comments;
  const dispatch = useDispatch();


  const createComment = (value) => {
    dispatch({
      type: types.COMMENT_CREATE, data: {
        id: Symbol(),
        value: value,
        like: false,
        likeCount: 0,
        parentId: null,
        createdAt: new Date(),
        reply: []
      }
    })
  }


  return <div>
    <h1>Comments Page</h1>

    <TextArea createComment={createComment} />
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