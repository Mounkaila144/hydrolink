"use client";

import { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
}

function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(message.id);
    }, message.duration || 5000);

    return () => clearTimeout(timer);
  }, [message.id, message.duration, onClose]);

  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (message.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={cn(
      "max-w-sm w-full border rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden animate-fade-in",
      getBackgroundColor()
    )}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">
              {message.title}
            </p>
            {message.message && (
              <p className="mt-1 text-sm text-gray-500">
                {message.message}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              onClick={() => onClose(message.id)}
            >
              <span className="sr-only">Fermer</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  messages: ToastMessage[];
  onClose: (id: string) => void;
}

export function ToastContainer({ messages, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {messages.map((message) => (
        <Toast key={message.id} message={message} onClose={onClose} />
      ))}
    </div>
  );
}

// Hook pour gérer les toasts
export function useToast() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setMessages(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  const success = (title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  };

  const error = (title: string, message?: string) => {
    addToast({ type: 'error', title, message });
  };

  const warning = (title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  };

  const info = (title: string, message?: string) => {
    addToast({ type: 'info', title, message });
  };

  return {
    messages,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
}
