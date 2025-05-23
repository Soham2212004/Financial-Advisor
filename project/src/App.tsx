import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ApiProvider } from './contexts/ApiContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  const [userId, setUserId] = useState<number>(1); // Default user ID

  return (
    <BrowserRouter>
      <ApiProvider>
        <ThemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard userId={userId} />} />
              <Route path="/transactions" element={<Transactions userId={userId} />} />
              <Route path="/goals" element={<Goals userId={userId} />} />
              <Route path="/chat" element={<Chat userId={userId} />} />
              <Route path="/analytics" element={<Analytics userId={userId} />} />
              <Route path="/profile" element={<Profile userId={userId} setUserId={setUserId} />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;