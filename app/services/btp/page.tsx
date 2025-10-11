import { useTranslations } from "next-intl";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Phone, Mail, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import siteData from "@/content/site.fr.json";

export default function BTPPage() {
  const t = useTranslations();

  const serviceData = siteData.services.btp;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">
                Génie civil & BTP
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {serviceData.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {serviceData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-primary">
                  <Link href="/contact">
                    Demander un devis
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="btn-secondary">
                  <Link href="tel:+22791270951">
                    <Phone className="h-4 w-4 mr-2" />
                    +227 91 27 09 51
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nos domaines d'intervention
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Une expertise complète pour tous vos projets de construction et d'infrastructure
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {serviceData.services.map((service: string, index: number) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-primary-600" />
                      </div>
                      <CardTitle className="text-xl">{service}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Projets réalisés avec expertise et professionnalisme, respectant les normes de qualité les plus strictes.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Sur mesure</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Niamey & environs</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Notre processus
                </h2>
                <p className="text-lg text-muted-foreground">
                  Une méthodologie rigoureuse pour garantir la réussite de vos projets
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Consultation
                  </h3>
                  <p className="text-muted-foreground">
                    Analyse de vos besoins et étude de faisabilité
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Conception
                  </h3>
                  <p className="text-muted-foreground">
                    Élaboration des plans et spécifications techniques
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Réalisation
                  </h3>
                  <p className="text-muted-foreground">
                    Exécution des travaux avec suivi qualité
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Livraison
                  </h3>
                  <p className="text-muted-foreground">
                    Remise du projet et suivi post-réalisation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Votre projet mérite l'excellence
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Confiez-nous vos projets de construction. Nous mettons notre expertise à votre service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-900 hover:bg-neutral-100">
                <Link href="/contact">
                  Demander un devis gratuit
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-900">
                <Link href="/a-propos">
                  En savoir plus sur nous
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}