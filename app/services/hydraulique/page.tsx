import { useTranslations } from "next-intl";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Phone, Mail, Droplets, MapPin, Users } from "lucide-react";
import Link from "next/link";
import siteData from "@/content/site.fr.json";

export default function HydrauliquePage() {
  const t = useTranslations();

  const serviceData = siteData.services.hydraulique;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-accent-50 to-primary-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200">
                <Droplets className="h-3 w-3 mr-1" />
                Hydraulique
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {serviceData.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {serviceData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-accent">
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

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <Droplets className="h-8 w-8 text-accent-600 mr-3" />
                    <h2 className="text-3xl font-bold text-foreground">
                      Notre engagement pour l'eau
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-8">
                    L'accès à l'eau potable est un droit fondamental. Nous œuvrons quotidiennement pour améliorer les conditions de vie des populations rurales en développant des solutions hydrauliques durables et adaptées au contexte local.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-accent-50 rounded-lg">
                      <div className="text-2xl font-bold text-accent-600 mb-2">100+</div>
                      <div className="text-sm text-muted-foreground">Projets réalisés</div>
                    </div>
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600 mb-2">50k+</div>
                      <div className="text-sm text-muted-foreground">Personnes desservies</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-accent-50 to-primary-50 p-8 rounded-lg">
                  <div className="text-center">
                    <Droplets className="h-16 w-16 text-accent-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Impact social
                    </h3>
                    <p className="text-muted-foreground">
                      Chaque projet hydraulique contribue à améliorer la santé, l'éducation et le développement économique des communautés rurales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nos solutions hydrauliques
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Des technologies adaptées aux défis du Niger pour un accès durable à l'eau potable
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {serviceData.services.map((service: string, index: number) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                        <Droplets className="h-6 w-6 text-accent-600" />
                      </div>
                      <CardTitle className="text-xl">{service}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Solutions techniques avancées adaptées aux conditions géologiques et climatiques du Niger.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>Communautés rurales</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Tout le territoire</span>
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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Notre approche
                </h2>
                <p className="text-lg text-muted-foreground">
                  Une méthodologie participative et durable pour des solutions hydrauliques pérennes
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="h-16 w-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Diagnostic
                  </h3>
                  <p className="text-muted-foreground">
                    Étude hydrogéologique et évaluation des besoins communautaires
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Conception
                  </h3>
                  <p className="text-muted-foreground">
                    Dimensionnement technique et choix des technologies appropriées
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Réalisation
                  </h3>
                  <p className="text-muted-foreground">
                    Forage, installation et mise en service avec formation des utilisateurs
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Suivi
                  </h3>
                  <p className="text-muted-foreground">
                    Maintenance préventive et accompagnement technique durable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              L'eau, source de vie et de développement
            </h2>
            <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
              Ensemble, construisons un avenir où chaque communauté a accès à l'eau potable. Votre projet hydraulique commence ici.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-accent-900 hover:bg-neutral-100">
                <Link href="/contact">
                  Lancer votre projet
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent-900">
                <Link href="/impact">
                  Notre impact
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