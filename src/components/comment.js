import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

import TextArea from '../components/textarea';
import more from '../assets/images/more.png';
import like from '../assets/images/like.png';

export default function comment({ replyCallback, item }) {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const onWindowClick = (event) => {
    if (!event.target.classList.contains('more')) {
      setShowMore(false)
    }
  }
  const setValue = (key, value) => {
    dispatch({
      type: types.COMMENT_SET_VALUE,
      data: {
        id: item.id,
        key: key,
        value: value
      }
    })
  }
  useEffect(() => {
    window.addEventListener('click', onWindowClick, false);
    return () => {
      window.removeEventListener('click', onWindowClick, false);
    }
  }, [])
  console.log(item)
  return <div className='comment'>
    <TextArea
      className={item.isEdit ? 'default-comment isEdit' : 'default-comment'}
      id={item.id}
      item={item}
      value={item.value}
      onChange={(e) =>
        dispatch({
          type: types.COMMENT_SET_VALUE,
          data: {
            id: item.id,
            key: 'value',
            value: e.target.value
          }
        })}
      readOnly={!item.isEdit}
      onBlur={() => {
        if (item.isEdit) {
          setValue('isEdit', false);
        }
      }}
      onKeyDown={(e) => {
        if (e.keyCode == 13 && !e.shiftKey && item.isEdit) {
          document.getElementById(item.id).blur();
          setValue('isEdit', false);
          e.preventDefault();
          e.stopPropagation();
        }
      }} />
    {
      item.likeCount > 0 ?
        <div className='comment-like'>
          <img src={like} />
          <span>{item.likeCount}</span>
        </div>
        : null
    }
    <div className='comment-function'>
      <div onClick={() => {
        setValue('like', !item.like);
        setValue('likeCount', !item.like ? item.likeCount + 1 : item.likeCount - 1);
      }}>좋아요</div>
      {replyCallback && <div onClick={replyCallback}>답글달기</div>}
      <div className='more-wrapper'>
        <img src={more} alt='more' className='more' onClick={(e) => setShowMore(!showMore)} />
        {
          showMore ?
            <div className='more-modal'>
              <div onClick={() => {
                document.getElementById(item.id).focus();
                setValue('isEdit', true);
              }}>수정하기...</div>
              <div onClick={(e) => {
                dispatch({
                  type: types.COMMENT_DELETE,
                  data: {
                    id: item.id
                  }
                })
              }}>삭제하기...</div>
            </div>
            : null
        }
      </div>
    </div>
  </div>
}