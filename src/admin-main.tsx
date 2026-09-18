import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminPanel from './AdminPanel.tsx';
import './index.css';

const rootEl = document.getElementById('admin-root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <AdminPanel />
    </StrictMode>
  );
}
