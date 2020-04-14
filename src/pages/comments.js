import React, { useState } from 'react';
import Comment from '../components/comment';
import TextArea from '../components/textarea';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';
import postImg from '../assets/images/post.png'
import '../assets/style.css'
import Orange from '../components/orange';

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

  const [showReplyTextarea, setShowReplyTextarea] = useState([...Array(map.get('root').length).fill(false)]);
  console.log('map', map)
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
              height: e.target.style.height
            }
          })
          e.target.value = '';
          window.scrollTo(0, document.body.scrollHeight);
          e.preventDefault();
          e.stopPropagation();
        }
      }} />
      ------------------------
      {
      map.get('root').map((item, index) => {
        return <div key={index}>
          <Orange item={item} replyCallback={() => {
            setShowReplyTextarea(showReplyTextarea.map((flag, idx) => {
              if (idx === index) return !flag;
              else return flag
            }))
          }} />
          {
            map.get(item.id) && <div>답글 {map.get(item.id).length}개</div>
          }
          <div className='child-comment'>
            {
              map.get(item.id) &&
              map.get(item.id)
                .map((child, index) => <Orange key={'child_' + index}
                  item={child}
                  replyCallback={null} />)
            }
            {
              showReplyTextarea[index] ?
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
      -------------------------
    {
      map.get('root').map((item, index) => {
        return <Comment key={index}
          item={item}
          reply={map.get(item.id) === undefined ? [] : map.get(item.id)}
          onChangeValue={(e) =>
            dispatch({
              type: types.COMMENT_SET_VALUE,
              data: {
                id: item.id,
                key: 'value',
                value: e.target.value
              }
            })}
          onClickDelete={(e) => {
            dispatch({
              type: types.COMMENT_DELETE,
              data: {
                id: item.id
              }
            })
          }} />
      })
    }
    <div className='footer'>
    </div>
  </div>
}