"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationMeta } from '@/lib/validations';

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { current_page, last_page, from, to, total } = meta;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (last_page <= 1) {
    return null;
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6 rounded-b-lg">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-foreground bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-foreground bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Affichage de <span className="font-medium">{from || 0}</span> à{' '}
            <span className="font-medium">{to || 0}</span> sur{' '}
            <span className="font-medium">{total}</span> résultats
          </p>
        </div>

        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* Bouton Précédent */}
            <button
              onClick={() => onPageChange(current_page - 1)}
              disabled={current_page === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-muted-foreground hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Précédent</span>
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Première page si nécessaire */}
            {getPageNumbers()[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-foreground hover:bg-neutral-50"
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && (
                  <span className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-foreground">
                    ...
                  </span>
                )}
              </>
            )}

            {/* Pages visibles */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === current_page
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-neutral-300 text-foreground hover:bg-neutral-50'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Dernière page si nécessaire */}
            {getPageNumbers()[getPageNumbers().length - 1] < last_page && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] < last_page - 1 && (
                  <span className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-foreground">
                    ...
                  </span>
                )}
                <button
                  onClick={() => onPageChange(last_page)}
                  className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-foreground hover:bg-neutral-50"
                >
                  {last_page}
                </button>
              </>
            )}

            {/* Bouton Suivant */}
            <button
              onClick={() => onPageChange(current_page + 1)}
              disabled={current_page === last_page}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-muted-foreground hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Suivant</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
