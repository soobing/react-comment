import React, { useState, useEffect } from 'react';
import Comment from '../components/comment';
import TextArea from '../components/textarea';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';
import postImg from '../assets/images/post.png'
import curveArrow from '../assets/images/curve-arrow.png'
import '../assets/style.css'

export default function commentsPage() {
  const { comments } = useSelector(state => state);
  const { data } = comments;
  const dispatch = useDispatch();

  const map = new Map();
  map.set('root', [])
  data.forEach((item, index) => {
    if (item.parentId === null) {
      map.get('root').push(item)
    } else {
      if (map.get(item.parentId) === undefined) {
        map.set(item.parentId, [item]);
      } else {
        map.get(item.parentId).push(item)
      }
    }
  })

  const replyCallback = (id) => {
    dispatch({
      type: types.COMMENT_SET_VALUE,
      data: {
        id: id,
        key: 'showReplyTextarea',
        value: true
      }
    })
    const replyEl = document.getElementById('reply-' + id);
    replyEl && replyEl.focus();
  }
  return <div className='wrapper'>
    <img className='post' src={postImg} />
    <TextArea item={null}
      onKeyDown={(e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
          dispatch({
            type: types.COMMENT_CREATE,
            data: {
              id: new Date().valueOf(),
              value: e.target.value,
              like: false,
              likeCount: 0,
              parentId: null,
              height: e.target.style.height,
              isEdit: false,
              showMore: false,
              showReplyTextarea: false
            }
          })
          e.target.value = '';
          window.scrollTo(0, document.body.scrollHeight);
          e.preventDefault();
          e.stopPropagation();
        }
      }} />
    {
      map.get('root').map((item, index) => {
        return <div key={index}>
          <Comment item={item}
            replyCallback={() => replyCallback(item.id)} />
          <div className='child-comment'>
            {
              map.get(item.id) && <div className='count'><img src={curveArrow} alt='답글' />답글 {map.get(item.id).length}개</div>
            }
            {
              map.get(item.id) &&
              map.get(item.id)
                .map((child, childIndex) => <Comment key={'child_' + childIndex}
                  item={child}
                  replyCallback={() => { replyCallback(child.parentId) }} />)
            }
            {
              item.showReplyTextarea ?
                <TextArea
                  id={'reply-' + item.id}
                  item={null}
                  autoFocus={true}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13 && !e.shiftKey) {
                      dispatch({
                        type: types.COMMENT_SET_VALUE,
                        data: {
                          id: item.id,
                          key: 'showReplyTextarea',
                          value: false
                        }
                      })
                      dispatch({
                        type: types.COMMENT_CREATE,
                        data: {
                          id: new Date().valueOf(),
                          value: e.target.value,
                          like: false,
                          likeCount: 0,
                          parentId: item.id,
                          height: e.target.style.height,
                          isEdit: false,
                          showMore: false,
                          showReplyTextarea: false
                        }
                      })
                      e.target.value = '';
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }} />
                : null
            }
          </div>
        </div>
      })
    }
    <div className='footer'>
    </div>
  </div >
}