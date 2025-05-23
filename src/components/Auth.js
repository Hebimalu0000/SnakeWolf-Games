// src/components/Auth.js
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  // OAuthProvider // Microsoft認証を使わないのでコメントアウト
} from 'firebase/auth';
import { auth } from '../firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('登録が完了しました。ログインしてください。');
      setIsRegistering(false);
    } catch (error) {
      console.error("新規登録エラー:", error);
      setMessage(`新規登録に失敗しました: ${error.message}`);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("ログインエラー:", error);
      setMessage(`ログインに失敗しました: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Googleログインエラー:", error);
      setMessage(`Googleログインに失敗しました: ${error.message}`);
    }
  };

  // Microsoftでのログイン (コメントアウト)
  /*
  const handleMicrosoftLogin = async () => {
    setMessage('');
    try {
      const provider = new OAuthProvider('microsoft.com');
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Microsoftログインエラー:", error);
      setMessage(`Microsoftログインに失敗しました: ${error.message}`);
    }
  };
  */

  const handlePasswordReset = async () => {
    setMessage('');
    if (!email) {
      setMessage('パスワードをリセットするメールアドレスを入力してください。');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('パスワードリセットメールを送信しました。メールボックスを確認してください。');
    } catch (error) {
      console.error("パスワードリセットエラー:", error);
      setMessage(`パスワードリセットメールの送信に失敗しました: ${error.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <div style={{
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        width: '350px'
      }}>
        <h2>{isRegistering ? '新規登録' : 'ログイン'}</h2>
        {message && <p style={{ color: 'red', fontSize: '0.9em' }}>{message}</p>}

        <form onSubmit={isRegistering ? handleEmailRegister : handleEmailLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>メールアドレス:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>パスワード:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            {isRegistering ? '登録する' : 'ログイン'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegistering ? 'すでにアカウントをお持ちですか？ログイン' : 'アカウントをお持ちではありませんか？新規登録'}
          </span>
        </p>

        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          <span
            onClick={handlePasswordReset}
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            パスワードをお忘れですか？
          </span>
        </p>

        <hr style={{ margin: '30px 0', borderColor: '#eee' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleGoogleLogin}
            style={{
              padding: '10px',
              backgroundColor: '#db4437',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Googleでログイン
          </button>
          {/* Microsoftログインボタン (コメントアウト) */}
          {/*
          <button
            onClick={handleMicrosoftLogin}
            style={{
              padding: '10px',
              backgroundColor: '#0078d4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Microsoftでログイン
          </button>
          */}
        </div>
      </div>
    </div>
  );
};

export default Auth;