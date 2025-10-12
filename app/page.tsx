import { useTranslations } from "next-intl";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Target, Award, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import siteData from "@/content/site.fr.json";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8 sm:py-12 lg:py-20">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent-200/30 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
              {/* Left Content */}
              <div className="text-center lg:text-left animate-slide-in-left order-2 lg:order-1">
                <Badge className="mb-3 sm:mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200 animate-fade-in text-xs sm:text-sm px-3 py-1">
                  hydrolink-BTP
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight animate-fade-in-up px-2 sm:px-0">
                  {t("homepage.hero.title")}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-in-up animation-delay-200 px-2 sm:px-0 max-w-xl mx-auto lg:mx-0">
                  {t("homepage.hero.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-400 px-4 sm:px-0">
                  <Button size="lg" className="btn-primary shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto">
                    <Link href="/contact" className="w-full">
                      {t("homepage.hero.ctaPrimary")}
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="btn-secondary w-full sm:w-auto">
                    <Link href="/a-propos" className="w-full">
                      {t("homepage.hero.ctaSecondary")}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Image with Animations */}
              <div className="relative animate-slide-in-right order-1 lg:order-2 mt-4 lg:mt-0">
                {/* Animated Border Rings - Hidden on small mobile */}
                <div className="absolute inset-0 -m-2 sm:-m-4 hidden sm:block">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-primary-300/50 animate-pulse-border"></div>
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-accent-300/50 animate-pulse-border-delayed"></div>
                </div>

                {/* Image Container with Gradient Border */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl group mx-4 sm:mx-0">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-accent-400 to-primary-600 p-[2px] sm:p-[3px] rounded-xl sm:rounded-2xl animate-gradient-rotate">
                    <div className="h-full w-full bg-white rounded-xl sm:rounded-2xl"></div>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
                    <Image
                      src="/heroes.png"
                      alt="hydrolink-BTP - Équipe professionnelle"
                      width={600}
                      height={500}
                      priority
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                    />
                    {/* Overlay Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Floating Stats Cards - Repositioned for mobile */}
                <div className="absolute -bottom-4 left-2 sm:-bottom-6 sm:-left-6 bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-3 sm:p-4 animate-float block scale-75 sm:scale-100 origin-bottom-left">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-accent-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-foreground">100+</p>
                      <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Projets réalisés</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 right-2 sm:-top-6 sm:-right-6 bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-3 sm:p-4 animate-float-delayed block scale-75 sm:scale-100 origin-top-right">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-foreground">15+</p>
                      <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Ans d'expérience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">
                  {t("about.title")}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                  {t("about.description")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                <div className="px-2 sm:px-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                    Notre mission
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    {t("about.mission")}
                  </p>
                  <div className="space-y-2 sm:space-y-3">
                    {siteData.values.map((value: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 sm:p-8 rounded-lg">
                  <div className="text-center">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <span className="text-white font-bold text-lg sm:text-xl">HL</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                      hydrolink-BTP
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground px-2 sm:px-0">
                      Entreprise multidisciplinaire basée à Niamey, Niger
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-neutral-50 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary-100/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">
                Nos pôles d'activité
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
                Quatre domaines complémentaires pour répondre à tous vos besoins
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {siteData.homepage.pillars.map((pillar: string, index: number) => (
                <Card key={index} className="card-hover text-center border-2 hover:border-primary-300 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg transform transition-transform duration-300 hover:rotate-6">
                      <span className="text-white font-bold text-lg sm:text-xl">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold px-2">{pillar}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="outline" asChild className="w-full hover:bg-primary-600 hover:text-white transition-all duration-300 text-sm sm:text-base">
                      <Link href={`/services/${index === 0 ? 'btp' : index === 1 ? 'hydraulique' : index === 2 ? 'e-commerce' : 'commerce-general'}`}>
                        En savoir plus →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-accent-50 to-primary-50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-accent-200/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10 sm:mb-16">
                <Badge className="mb-3 sm:mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200 text-xs sm:text-sm px-3 py-1">
                  Notre Impact
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2">
                  {t("impact.title")}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
                  {t("impact.description")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {siteData.impact.points.map((point: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-accent-100"
                  >
                    <div className="h-9 w-9 sm:h-10 sm:w-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <p className="text-sm sm:text-base text-foreground font-medium flex-1">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-white rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent-300 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                Prêt à collaborer avec nous ?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-8 sm:mb-10 max-w-2xl mx-auto px-4 sm:px-0">
                Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous accompagner
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Button size="lg" className="bg-white text-primary-900 hover:bg-neutral-100 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  <Link href="/contact" className="flex items-center justify-center w-full">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Nous contacter
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary-900 shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  <Link href="tel:+22791270951" className="flex items-center justify-center w-full">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    +227 91 27 09 51
                  </Link>
                </Button>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Phone className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-accent-300" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Téléphone</h3>
                  <p className="text-primary-100 text-xs sm:text-sm">+227 91 27 09 51</p>
                  <p className="text-primary-100 text-xs sm:text-sm">+227 88 59 59 20</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Mail className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-accent-300" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Email</h3>
                  <p className="text-primary-100 text-xs sm:text-sm break-all">hydrolinkbtp@gmail.com</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 sm:col-span-2 md:col-span-1">
                  <Target className="h-7 w-7 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-accent-300" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Localisation</h3>
                  <p className="text-primary-100 text-xs sm:text-sm">Niamey, Niger</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
