"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth-context';
import { registerFormSchema, RegisterFormData } from '@/lib/validations';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal = ({
  isOpen,
  onClose,
  onSwitchToLogin
}: RegisterModalProps) => {
  const { register: registerUser, error, isLoading, clearError } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      onClose();

      // Reset form
      reset();

      // Optionally redirect to home or a welcome page
      router.push('/');
    } catch (error) {
      // Error is handled by auth context
      console.error('Registration error:', error);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    clearError();
  };

  const handleSwitchToLogin = () => {
    handleClose();
    onSwitchToLogin();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-accent-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t('auth.register.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('auth.register.subtitle')}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <Label htmlFor="name">{t('auth.register.name')}</Label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                {...register('name')}
                className="pl-10"
                placeholder={t('auth.register.namePlaceholder')}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email">{t('auth.register.email')}</Label>
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
                placeholder={t('auth.register.emailPlaceholder')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password">{t('auth.register.password')}</Label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                {...register('password')}
                className="pl-10 pr-12"
                placeholder={t('auth.register.passwordPlaceholder')}
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

          {/* Password Confirmation Field */}
          <div>
            <Label htmlFor="password_confirmation">{t('auth.register.confirmPassword')}</Label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="password_confirmation"
                type={showPasswordConfirmation ? 'text' : 'password'}
                autoComplete="new-password"
                {...register('password_confirmation')}
                className="pl-10 pr-12"
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              >
                {showPasswordConfirmation ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                )}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-600">{errors.password_confirmation.message}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-foreground">
              {t('auth.register.acceptTerms')}{' '}
              <a href="/mentions-legales" className="text-primary-600 hover:text-primary-500 font-medium">
                {t('auth.register.terms')}
              </a>{' '}
              {t('auth.register.and')}{' '}
              <a href="/politique-de-confidentialite" className="text-primary-600 hover:text-primary-500 font-medium">
                {t('auth.register.privacy')}
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full btn-accent"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('auth.register.creating')}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {t('auth.register.createAccount')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            {t('auth.register.haveAccount')}{' '}
            <button
              onClick={handleSwitchToLogin}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              {t('auth.register.signIn')}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};
