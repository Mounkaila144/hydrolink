"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth-context';
import { authService } from '@/lib/auth-service';
import { loginFormSchema, LoginFormData } from '@/lib/validations';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginModal = ({
  isOpen,
  onClose,
  onSwitchToRegister
}: LoginModalProps) => {
  const { login, error, isLoading, clearError } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      onClose();

      // Si l'utilisateur est admin après connexion, rediriger vers /admin
      const user = authService.getUser();
      if (user?.role === 'admin') {
        router.push('/admin');
      }

      // Reset form
      reset();
    } catch (error) {
      // Error is handled by auth context
      console.error('Login error:', error);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    clearError();
  };

  const handleSwitchToRegister = () => {
    handleClose();
    onSwitchToRegister();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t('auth.login.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('auth.login.subtitle')}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="email">{t('auth.login.email')}</Label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className="pl-10"
                placeholder={t('auth.login.emailPlaceholder')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password">{t('auth.login.password')}</Label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                {...register('password')}
                className="pl-10 pr-12"
                placeholder={t('auth.login.passwordPlaceholder')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-foreground">
                {t('auth.login.rememberMe')}
              </label>
            </div>

            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500 font-medium"
            >
              {t('auth.login.forgotPassword')}
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('auth.login.signingIn')}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {t('auth.login.signIn')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            {t('auth.login.noAccount')}{' '}
            <button
              onClick={handleSwitchToRegister}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              {t('auth.login.createAccount')}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};
