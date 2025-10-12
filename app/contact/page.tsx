"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactFormSchema, quoteFormSchema, type ContactFormData, type QuoteFormData } from "@/lib/validations";
import { Phone, Mail, MapPin, Clock, Send, FileText, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "quote">("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const t = useTranslations();

  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const quoteForm = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      service: undefined,
      budget: "",
      city: "",
      deadline: "",
    },
  });

  const onContactSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("Contact form data:", data);
      setSubmitMessage({
        type: "success",
        text: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
      });

      contactForm.reset();
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onQuoteSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("Quote form data:", data);
      setSubmitMessage({
        type: "success",
        text: "Votre demande de devis a été envoyée avec succès. Nous vous contacterons sous 24h."
      });

      quoteForm.reset();
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Une erreur est survenue lors de l'envoi de la demande. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">
                Contactez-nous
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t("contact.title")}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Nous sommes à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Forms Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Information */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Informations de contact
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Téléphone</h3>
                          <p className="text-muted-foreground mb-2">
                            <a href="tel:+22791270951" className="hover:text-primary-600 transition-colors">
                              +227 91 27 09 51
                            </a>
                          </p>
                          <p className="text-muted-foreground">
                            <a href="tel:+22788595920" className="hover:text-primary-600 transition-colors">
                              +227 88 59 59 20
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="h-6 w-6 text-accent-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Email</h3>
                          <p className="text-muted-foreground">
                            <a href="mailto:hydrolinkbtp@gmail.com" className="hover:text-accent-600 transition-colors">
                              hydrolinkbtp@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Adresse</h3>
                          <p className="text-muted-foreground">
                            Niamey, Niger
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="h-6 w-6 text-accent-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Horaires</h3>
                          <p className="text-muted-foreground">
                            Lundi - Vendredi: 8h00 - 18h00
                          </p>
                          <p className="text-muted-foreground">
                            Samedi: 8h00 - 12h00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forms */}
                <div className="lg:col-span-2">
                  {/* Tab Selection */}
                  <div className="flex space-x-1 mb-8">
                    <button
                      onClick={() => setActiveTab("contact")}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === "contact"
                          ? "bg-primary-600 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      <Send className="h-4 w-4 inline mr-2" />
                      Message
                    </button>
                    <button
                      onClick={() => setActiveTab("quote")}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        activeTab === "quote"
                          ? "bg-primary-600 text-white"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      <FileText className="h-4 w-4 inline mr-2" />
                      Devis
                    </button>
                  </div>

                  {/* Submit Message */}
                  {submitMessage && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                      submitMessage.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}>
                      <CheckCircle className="h-5 w-5" />
                      <span>{submitMessage.text}</span>
                    </div>
                  )}

                  {/* Contact Form */}
                  {activeTab === "contact" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Envoyez-nous un message</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="contact-fullname">Nom complet *</Label>
                              <Input
                                id="contact-fullname"
                                {...contactForm.register("fullname")}
                                className={contactForm.formState.errors.fullname ? "border-red-500" : ""}
                              />
                              {contactForm.formState.errors.fullname && (
                                <p className="text-red-500 text-sm mt-1">
                                  {contactForm.formState.errors.fullname.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="contact-email">Email *</Label>
                              <Input
                                id="contact-email"
                                type="email"
                                {...contactForm.register("email")}
                                className={contactForm.formState.errors.email ? "border-red-500" : ""}
                              />
                              {contactForm.formState.errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                  {contactForm.formState.errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="contact-phone">Téléphone *</Label>
                              <Input
                                id="contact-phone"
                                {...contactForm.register("phone")}
                                placeholder="+227 XX XX XX XX"
                                className={contactForm.formState.errors.phone ? "border-red-500" : ""}
                              />
                              {contactForm.formState.errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                  {contactForm.formState.errors.phone.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="contact-subject">Sujet *</Label>
                              <Input
                                id="contact-subject"
                                {...contactForm.register("subject")}
                                className={contactForm.formState.errors.subject ? "border-red-500" : ""}
                              />
                              {contactForm.formState.errors.subject && (
                                <p className="text-red-500 text-sm mt-1">
                                  {contactForm.formState.errors.subject.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="contact-message">Message *</Label>
                            <Textarea
                              id="contact-message"
                              rows={5}
                              {...contactForm.register("message")}
                              className={contactForm.formState.errors.message ? "border-red-500" : ""}
                            />
                            {contactForm.formState.errors.message && (
                              <p className="text-red-500 text-sm mt-1">
                                {contactForm.formState.errors.message.message}
                              </p>
                            )}
                          </div>

                          <Button
                            type="submit"
                            className="w-full btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}

                  {/* Quote Form */}
                  {activeTab === "quote" && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Demande de devis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={quoteForm.handleSubmit(onQuoteSubmit)} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="quote-fullname">Nom complet *</Label>
                              <Input
                                id="quote-fullname"
                                {...quoteForm.register("fullname")}
                                className={quoteForm.formState.errors.fullname ? "border-red-500" : ""}
                              />
                              {quoteForm.formState.errors.fullname && (
                                <p className="text-red-500 text-sm mt-1">
                                  {quoteForm.formState.errors.fullname.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="quote-email">Email *</Label>
                              <Input
                                id="quote-email"
                                type="email"
                                {...quoteForm.register("email")}
                                className={quoteForm.formState.errors.email ? "border-red-500" : ""}
                              />
                              {quoteForm.formState.errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                  {quoteForm.formState.errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="quote-phone">Téléphone *</Label>
                              <Input
                                id="quote-phone"
                                {...quoteForm.register("phone")}
                                placeholder="+227 XX XX XX XX"
                                className={quoteForm.formState.errors.phone ? "border-red-500" : ""}
                              />
                              {quoteForm.formState.errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                  {quoteForm.formState.errors.phone.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="quote-service">Service *</Label>
                              <Select onValueChange={(value) => quoteForm.setValue("service", value as any)}>
                                <SelectTrigger className={quoteForm.formState.errors.service ? "border-red-500" : ""}>
                                  <SelectValue placeholder="Sélectionnez un service" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="btp">Génie civil & BTP</SelectItem>
                                  <SelectItem value="hydraulique">Hydraulique</SelectItem>
                                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                                  <SelectItem value="commerce_general">Commerce général</SelectItem>
                                </SelectContent>
                              </Select>
                              {quoteForm.formState.errors.service && (
                                <p className="text-red-500 text-sm mt-1">
                                  {quoteForm.formState.errors.service.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="quote-budget">Budget approximatif</Label>
                              <Input
                                id="quote-budget"
                                {...quoteForm.register("budget")}
                                placeholder="Ex: 500 000 FCFA"
                              />
                            </div>
                            <div>
                              <Label htmlFor="quote-city">Localisation</Label>
                              <Input
                                id="quote-city"
                                {...quoteForm.register("city")}
                                placeholder="Ex: Niamey"
                              />
                            </div>
                            <div>
                              <Label htmlFor="quote-deadline">Délai souhaité</Label>
                              <Input
                                id="quote-deadline"
                                {...quoteForm.register("deadline")}
                                placeholder="Ex: 3 mois"
                              />
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="w-full btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Envoi en cours..." : "Demander un devis"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}
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