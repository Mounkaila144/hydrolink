import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">
              Politique de confidentialité
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Introduction
                </h2>
                <p>
                  HYDROLINK-BTP respecte votre vie privée et s'engage à protéger vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Données collectées
                </h2>
                <p>
                  Nous collectons uniquement les informations que vous nous fournissez volontairement via nos formulaires de contact et de demande de devis :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Informations relatives à votre projet (pour les devis)</li>
                  <li>Toute autre information que vous choisissez de nous communiquer</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Utilisation des données
                </h2>
                <p>
                  Vos données personnelles sont utilisées exclusivement pour :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Répondre à vos demandes de contact</li>
                  <li>Traiter vos demandes de devis</li>
                  <li>Vous fournir les informations demandées</li>
                  <li>Améliorer nos services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Partage des données
                </h2>
                <p>
                  HYDROLINK-BTP s'engage à ne pas vendre, louer ou partager vos données personnelles avec des tiers, sauf :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Avec votre consentement explicite</li>
                  <li>Pour se conformer à une obligation légale</li>
                  <li>Pour protéger nos droits et notre sécurité</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Sécurité des données
                </h2>
                <p>
                  Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Conservation des données
                </h2>
                <p>
                  Vos données personnelles sont conservées pendant la durée nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, et jusqu'à 3 ans maximum après notre dernier contact.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Vos droits
                </h2>
                <p>
                  Conformément à la réglementation applicable, vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Droit d'accès :</strong> Obtenir confirmation que vos données sont traitées et accéder à ces données</li>
                  <li><strong>Droit de rectification :</strong> Demander la correction de données inexactes</li>
                  <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données personnelles</li>
                  <li><strong>Droit à la limitation :</strong> Demander la limitation du traitement de vos données</li>
                  <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Cookies
                </h2>
                <p>
                  Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Ces cookies ne collectent pas d'informations personnelles à des fins de suivi ou de publicité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact
                </h2>
                <p>
                  Pour exercer vos droits ou pour toute question concernant cette politique de confidentialité, contactez-nous :
                </p>
                <p className="mt-4">
                  HYDROLINK-BTP<br />
                  Niamey, Niger<br />
                  Téléphone : +227 91 27 09 51<br />
                  Email : hydrolinkbtp@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Modifications
                </h2>
                <p>
                  Cette politique de confidentialité peut être mise à jour. Nous vous invitons à la consulter régulièrement. La dernière modification date du {new Date().toLocaleDateString('fr-FR')}.
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