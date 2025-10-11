import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">HL</span>
              </div>
              <span className="font-bold text-xl">HYDROLINK-BTP</span>
            </div>
            <p className="text-neutral-300 text-sm">
              {t("footer.address")}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+227 91 27 09 51</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+227 88 59 59 20</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>hydrolinkbtp@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/btp" className="text-neutral-300 hover:text-white transition-colors">
                  Génie civil & BTP
                </Link>
              </li>
              <li>
                <Link href="/services/hydraulique" className="text-neutral-300 hover:text-white transition-colors">
                  Hydraulique
                </Link>
              </li>
              <li>
                <Link href="/services/e-commerce" className="text-neutral-300 hover:text-white transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/services/commerce-general" className="text-neutral-300 hover:text-white transition-colors">
                  Commerce général
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/a-propos" className="text-neutral-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-neutral-300 hover:text-white transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/objectifs" className="text-neutral-300 hover:text-white transition-colors">
                  Objectifs
                </Link>
              </li>
              <li>
                <Link href="/pourquoi-nous-choisir" className="text-neutral-300 hover:text-white transition-colors">
                  Pourquoi nous choisir
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2 text-sm text-neutral-300">
              <p>Pour toute demande d'information ou devis, n'hésitez pas à nous contacter.</p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="btn-primary bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded text-sm"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-400">
              © 2024 HYDROLINK-BTP. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/mentions-legales" className="text-neutral-400 hover:text-white transition-colors">
                {t("footer.legal.mentions")}
              </Link>
              <Link href="/politique-de-confidentialite" className="text-neutral-400 hover:text-white transition-colors">
                {t("footer.legal.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}