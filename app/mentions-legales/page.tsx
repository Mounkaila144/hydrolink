import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">
              Mentions légales
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Informations légales
                </h2>
                <p>
                  <strong>HYDROLINK-BTP</strong><br />
                  Entreprise individuelle<br />
                  Siège social : Niamey, Niger<br />
                  Téléphone : +227 91 27 09 51 / +227 88 59 59 20<br />
                  Email : hydrolinkbtp@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Directeur de la publication
                </h2>
                <p>
                  Le directeur de la publication du site web est le représentant légal de HYDROLINK-BTP.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Hébergement
                </h2>
                <p>
                  Ce site est hébergé par :<br />
                  Vercel Inc.<br />
                  440 N Barranca Ave #4133<br />
                  Covina, CA 91723<br />
                  États-Unis
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Propriété intellectuelle
                </h2>
                <p>
                  L'ensemble du contenu de ce site web (textes, images, graphismes, logos, icônes, sons, logiciels) est la propriété exclusive de HYDROLINK-BTP ou de ses partenaires, sauf mention contraire explicite.
                </p>
                <p>
                  Toute reproduction, distribution, modification ou utilisation de ces éléments, même partielle, sans autorisation préalable écrite de HYDROLINK-BTP est strictement interdite.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Données personnelles
                </h2>
                <p>
                  Les informations collectées via les formulaires de contact sont destinées exclusivement à HYDROLINK-BTP pour le traitement de vos demandes. Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.
                </p>
                <p>
                  Pour exercer ces droits, contactez-nous à : hydrolinkbtp@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Cookies
                </h2>
                <p>
                  Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie de suivi ou publicitaire n'est utilisé sans votre consentement explicite.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Limitation de responsabilité
                </h2>
                <p>
                  HYDROLINK-BTP s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, nous ne pouvons garantir l'absence totale d'erreurs ou d'omissions.
                </p>
                <p>
                  HYDROLINK-BTP décline toute responsabilité quant à l'utilisation qui pourrait être faite de ces informations et des conséquences qui pourraient en découler.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Droit applicable
                </h2>
                <p>
                  Les présentes mentions légales sont régies par le droit nigérien. En cas de litige, les tribunaux de Niamey seront seuls compétents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact
                </h2>
                <p>
                  Pour toute question concernant ces mentions légales, contactez-nous :
                </p>
                <p>
                  HYDROLINK-BTP<br />
                  Niamey, Niger<br />
                  Téléphone : +227 91 27 09 51<br />
                  Email : hydrolinkbtp@gmail.com
                </p>
              </section>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}