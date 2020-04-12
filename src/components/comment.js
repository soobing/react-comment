import React from 'react';

export default function comment({ value, onChange }) {
  return <div>
    <textarea onChange={onChange} value={value}>
    </textarea>
  </div>
}