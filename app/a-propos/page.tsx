import { useTranslations } from "next-intl";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Users, Award, Phone, Mail } from "lucide-react";
import Link from "next/link";
import siteData from "@/content/site.fr.json";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">
                À propos de nous
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t("about.title")}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("about.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Notre mission
                  </h2>
                  <div className="space-y-4 mb-8">
                    {siteData.about.mission.map((point: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-accent-600 flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 pt-4 border-t border-neutral-200">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Nos valeurs</h3>
                    {siteData.values.map((value: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent-600" />
                        <span className="text-foreground font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-lg">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Vision & Mission
                    </h3>
                    <p className="text-muted-foreground">
                      Contribuer au développement durable du Niger à travers nos différents pôles d'activité
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nos objectifs
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Cinq piliers fondamentaux guident notre action quotidienne
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {siteData.objectifs.map((objectif: { title: string; details: string[] }, index: number) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-primary-600 font-bold text-lg">
                          {(index + 1).toString()}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{objectif.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {objectif.details.map((detail: string, detailIndex: number) => (
                          <li key={detailIndex} className="flex items-start text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Notre équipe
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Une équipe de professionnels expérimentés et passionnés, unis par la volonté de contribuer au développement du Niger.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Expertise locale
                  </h3>
                  <p className="text-muted-foreground">
                    Parfaite connaissance du contexte nigérien et de ses spécificités
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-20 w-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-10 w-10 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Qualité garantie
                  </h3>
                  <p className="text-muted-foreground">
                    Respect des normes internationales et engagement qualité
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-10 w-10 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Innovation
                  </h3>
                  <p className="text-muted-foreground">
                    Recherche constante de solutions modernes et efficaces
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
              Prêt à travailler avec nous ?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Découvrez comment nous pouvons vous accompagner dans vos projets
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-900 hover:bg-neutral-100">
                <Link href="/contact">
                  Nous contacter
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-900">
                <Link href="/services/btp">
                  Nos services
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