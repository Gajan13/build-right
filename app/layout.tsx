import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { InlineScript } from "@/components/ui/inline-script";
import { ScrollMotion } from "@/components/ui/scroll-motion";
import { footerLinks, navigation, site } from "@/content/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const heading = Bricolage_Grotesque({ variable: "--font-heading", subsets: ["latin"] });
const body = Plus_Jakarta_Sans({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${heading.variable} ${body.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <InlineScript html={themeScript} />
        {/* Shared here, because Next.js keeps visited pages in the DOM and a copy on each would repeat their ids. */}
        <ScrollMotion />
        <SiteHeader name={site.name} links={navigation} />
        <main id="main">{children}</main>
        <SiteFooter site={site} links={footerLinks} />
      </body>
    </html>
  );
}
