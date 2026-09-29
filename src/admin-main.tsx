import React, { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminPanel from './AdminPanel.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class AdminErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // @ts-ignore
  state: ErrorBoundaryState = { hasError: false };
  // @ts-ignore
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("MasterTech Admin Mount Error:", error, errorInfo);
  }

  handleClearCacheAndReload = () => {
    try {
      localStorage.removeItem('mastertech_settings_store');
      localStorage.removeItem('mastertech_admin_cache');
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0b0f', color: '#fff', fontFamily: 'monospace', padding: '2rem', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#ef4444', fontSize: '1.5rem' }}>
            !
          </div>
          <h1 style={{ color: '#ef4444', fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>
            PANEL DE ADMINISTRACIÓN // RECUPERACIÓN TÉCNICA
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '520px', marginBottom: '1rem', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Se detectó una discrepancia al inicializar los datos del panel administrativo:
          </p>
          <div style={{ backgroundColor: '#12141a', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '8px', maxWidth: '600px', width: '100%', marginBottom: '1.5rem', textAlign: 'left', overflowX: 'auto', fontSize: '0.75rem', color: '#f87171' }}>
            {this.state.error?.message || 'Error desconocido al montar la interfaz administrativa.'}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={() => window.location.reload()}
              style={{ backgroundColor: '#ffffff', color: '#000', fontWeight: 'bold', padding: '0.65rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', border: 'none', fontSize: '0.8rem' }}
            >
              RECARGAR PANEL
            </button>
            <button 
              onClick={this.handleClearCacheAndReload}
              style={{ backgroundColor: '#dc2626', color: '#fff', fontWeight: 'bold', padding: '0.65rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', border: 'none', fontSize: '0.8rem' }}
            >
              LIMPIAR CACHÉ Y RECARGAR
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('admin-root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <AdminErrorBoundary>
        <AdminPanel />
      </AdminErrorBoundary>
    </StrictMode>
  );
}

