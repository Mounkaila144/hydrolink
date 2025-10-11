import { useTranslations } from "next-intl";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Heart, TrendingUp } from "lucide-react";
import siteData from "@/content/site.fr.json";

export default function ImpactPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-accent-50 to-primary-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-accent-100 text-accent-800 hover:bg-accent-200">
                <Heart className="h-3 w-3 mr-1" />
                Impact social & économique
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t("impact.title")}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("impact.description")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteData.impact.points.map((point: string, index: number) => (
                  <div key={index} className="text-center p-6 bg-neutral-50 rounded-lg">
                    <div className="h-16 w-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-accent-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {point}
                    </h3>
                    <p className="text-muted-foreground">
                      Contribution significative au développement économique et social du Niger.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}