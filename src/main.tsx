import { StrictMode, Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("MasterTech App Mount Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#090b0e', color: '#fff', fontFamily: 'monospace', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ color: '#f59e0b', fontSize: '1.5rem', marginBottom: '1rem' }}>SISTEMA DE RECUPERACIÓN // MASTERTECH</h1>
          <p style={{ color: '#94a3b8', maxWidth: '500px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Hubo un problema temporal al inicializar la interfaz técnica. Pulsa el botón inferior para recargar la memoria del navegador.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{ backgroundColor: '#f59e0b', color: '#000', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', border: 'none' }}
          >
            RECARGAR PÁGINA
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </StrictMode>,
);

