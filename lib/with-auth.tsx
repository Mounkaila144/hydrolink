"use client";

import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-context';

export interface WithAuthOptions {
  redirectTo?: string;
  allowedRoles?: Array<'admin' | 'client'>;
}

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  return function WithAuthComponent(props: P) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const router = useRouter();
    const { redirectTo = '/', allowedRoles } = options;

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          // User not authenticated, redirect to home
          router.push(redirectTo);
        } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
          // User authenticated but doesn't have required role
          router.push(redirectTo);
        }
      }
    }, [isAuthenticated, user, isLoading, router, redirectTo]);

    // Show loading state while checking authentication
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    // Don't render component if not authenticated or no required role
    if (!isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
      return null;
    }

    return <Component {...props} />;
  };
}
