import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../actions';

import TextArea from '../components/textarea';
import more from '../assets/images/more.png';
import like from '../assets/images/like.png';

export default function comment({ replyCallback, item }) {
  const dispatch = useDispatch();
  // 삭제하기, 수정하기 모달을 없애기 위한 click 이벤트 핸들러
  const onWindowClick = (event) => {
    if (!event.target.classList.contains('more')) {
      dispatch({
        type: types.COMMENT_SHOWMORE_HIDEALL,
        data: {}
      })
    }
  }
  useEffect(() => {
    window.addEventListener('click', onWindowClick, false);
    return () => {
      window.removeEventListener('click', onWindowClick, false);
    }
  }, [])

  // COMMENT_SET_VALUE 액션을 위한 wrapper
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
  return <div className='comment'>
    <TextArea
      className={item.isEdit ? 'default-comment isEdit' : 'default-comment'}
      id={item.id}
      item={item}
      value={item.value}
      onChange={(e) => setValue('value', e.target.value)}
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
        <img src={more} alt='more' className='more'
          onClick={(e) => dispatch({
            type: types.COMMENT_SHOWMORE_ITEM,
            data: {
              id: item.id,
              showMore: !item.showMore
            }
          })} />
        {
          item.showMore ?
            <div className='more-modal'>
              <div onClick={() => {
                document.getElementById(item.id).focus();
                setValue('isEdit', true);
              }}>수정하기...</div>
              <div onClick={(e) => {
                if (confirm("댓글을 삭제하시겠습니까?")) {
                  dispatch({
                    type: types.COMMENT_DELETE,
                    data: {
                      id: item.id
                    }
                  })
                }
              }}>삭제하기...</div>
            </div>
            : null
        }
      </div>
    </div>
  </div>
}