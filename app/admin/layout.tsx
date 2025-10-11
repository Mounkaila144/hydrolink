"use client";

import { ReactNode, createContext, useContext } from 'react';
import { ToastContainer, useToast } from '@/components/admin/toast';

// Contexte pour les toasts
const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
}

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({ children }: AdminLayoutProps) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <div className="min-h-screen bg-neutral-100">
        {children}
        <ToastContainer messages={toast.messages} onClose={toast.removeToast} />
      </div>
    </ToastContext.Provider>
  );
}
