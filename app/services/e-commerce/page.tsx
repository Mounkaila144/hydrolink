import { useTranslations } from "next-intl";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Phone, Mail, ShoppingCart, Globe, Truck } from "lucide-react";
import Link from "next/link";
import siteData from "@/content/site.fr.json";

export default function EcommercePage() {
  const t = useTranslations();

  const serviceData = siteData.services.ecommerce;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">
                <ShoppingCart className="h-3 w-3 mr-1" />
                E-commerce
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
                    Nous contacter
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="btn-secondary">
                  <Link href="mailto:hydrolinkbtp@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    hydrolinkbtp@gmail.com
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
              <div className="grid md:grid-cols-3 gap-8">
                {serviceData.services.map((service: string, index: number) => (
                  <Card key={index} className="card-hover text-center">
                    <CardHeader>
                      <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        {index === 0 ? <ShoppingCart className="h-6 w-6 text-primary-600" /> :
                         index === 1 ? <Globe className="h-6 w-6 text-primary-600" /> :
                         <Truck className="h-6 w-6 text-primary-600" />}
                      </div>
                      <CardTitle className="text-xl">{service}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Service professionnel avec garantie de qualité et livraison nationale.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Commerce innovant au service du Niger
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Découvrez nos solutions e-commerce modernes et efficaces.
            </p>
            <Button size="lg" className="bg-white text-primary-900 hover:bg-neutral-100">
              <Link href="/contact">
                En savoir plus
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}