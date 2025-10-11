"use client";

import React, { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-hidden transform transition-all animate-fade-in",
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>

        {/* Close button if no title */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );

  // Use portal to ensure modal displays above everything
  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};
