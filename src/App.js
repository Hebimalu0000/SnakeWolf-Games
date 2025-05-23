// src/App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // 認証状態の変更を監視
import { auth } from './firebase'; // firebase.jsからauthインスタンスをインポート

import Loading from './components/Loading';
import Auth from './components/Auth';
import Home from './components/Home';

// 認証状態を共有するためのContextを作成
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // 現在のユーザー
  const [loading, setLoading] = useState(true); // 認証状態の読み込み中か

  useEffect(() => {
    // Firebaseの認証状態の変更を購読
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // 読み込み完了
    });

    // クリーンアップ関数: コンポーネントがアンマウントされたときに購読を解除
    return unsubscribe;
  }, []);

  if (loading) {
    // 認証状態の読み込み中はローディング画面を表示 (n2)
    return <Loading />;
  }

  // ログイン済みか (n3)
  // currentUserが存在すればログイン済み、そうでなければ未ログイン
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContextを利用するためのカスタムフック
export const useAuth = () => {
  return useContext(AuthContext);
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent = () => {
  const { currentUser } = useAuth(); // AuthContextから現在のユーザーを取得

  return (
    <div className="App">
      {currentUser ? <Home user={currentUser} /> : <Auth />}
    </div>
  );
};

export default App;
