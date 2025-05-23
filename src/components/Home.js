// src/components/Home.js
import React from 'react';
import { auth } from '../firebase'; // authインスタンスをインポート
import { signOut } from 'firebase/auth'; // ログアウト関数

const Home = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // ログアウト成功時はAuthContext (後述) でリダイレクトされる
      console.log('ログアウトしました');
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ゲームライブラリー</h1>
      {user && (
        <p>ようこそ、{user.email || user.displayName}さん！</p>
      )}
      <p>ここにあなたのゲームライブラリーのコンテンツが表示されます。</p>
      <button onClick={handleLogout} style={{
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        ログアウト
      </button>

      <h2 style={{marginTop: '40px'}}>主要機能へのリンク (ダミー)</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}><a href="#" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.1em' }}>ゲームソフト販売画面</a></li>
        <li style={{ marginBottom: '10px' }}><a href="#" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.1em' }}>セッティング画面</a></li>
        <li style={{ marginBottom: '10px' }}><a href="#" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.1em' }}>イベント一覧</a></li>
        <li style={{ marginBottom: '10px' }}><a href="#" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.1em' }}>統計情報</a></li>
        <li style={{ marginBottom: '10px' }}><a href="#" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.1em' }}>お知らせ (未リリース)</a></li>
      </ul>
    </div>
  );
};

export default Home;