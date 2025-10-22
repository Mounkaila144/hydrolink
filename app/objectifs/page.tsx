import { useTranslations } from "next-intl";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle } from "lucide-react";
import siteData from "@/content/site.fr.json";

export default function ObjectifsPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">
                <Target className="h-3 w-3 mr-1" />
                Nos objectifs
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Engagement vers l'excellence
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Cinq piliers fondamentaux guident notre développement et notre contribution au Niger.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {siteData.objectifs.map((objectif: { title: string; details: string[] }, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {objectif.title}
                      </h3>
                      <ul className="space-y-2">
                        {objectif.details.map((detail: string, detailIndex: number) => (
                          <li key={detailIndex} className="flex items-start text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-accent-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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