// Stub for required Toaster component in App.tsx
import { Toaster as DefaultToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <DefaultToaster 
      position="bottom-center"
      toastOptions={{
        style: {
          background: 'rgba(20, 20, 25, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
          borderRadius: '16px',
        }
      }}
    />
  );
}
