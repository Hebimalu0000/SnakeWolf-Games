// src/components/Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '24px'
    }}>
      <p>読み込み中...</p>
    </div>
  );
};

export default Loading;