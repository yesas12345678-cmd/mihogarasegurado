import type { Metadata } from "next";
import ContactoPageClient from "./ContactoPageClient";

export const metadata: Metadata = {
  title: "Contacto | Mi Hogar Asegurado",
  description: "¿Tienes dudas sobre coberturas de hogar o deseas colaborar con nuestro equipo editorial? Escríbenos directamente.",
};

export default function ContactoPage() {
  return <ContactoPageClient />;
}
