import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { ArrowUpRight, Phone, MapPin, Mail, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0e1013] text-white border-t border-white/10 pt-16 lg:pt-24 pb-24 md:pb-16">
      <div className="idc-shell">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand & Editorial Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-display text-2xl font-bold tracking-tight uppercase">
                  {siteConfig.brandName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white/90 font-normal tracking-tight mb-4 max-w-sm">
                Spaces with presence. Designed for life.
              </h2>
              <p className="font-body text-white/70 text-sm leading-relaxed max-w-md">
                Bespoke residential architecture, tranquil interior environments, and material clarity shaped by Bengaluru’s tropical microclimate and the rituals of living.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-white/60 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>STUDIO TIME · BENGALURU (IST, UTC+5:30)</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono font-semibold block mb-4">
              Explore
            </span>
            <ul className="flex flex-col gap-3 text-sm font-body">
              <li>
                <Link href="/" className="text-white/80 hover:text-[#c5a059] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/80 hover:text-[#c5a059] transition-colors">
                  Portfolio Archive
                </Link>
              </li>
              <li>
                <Link href="/studio" className="text-white/80 hover:text-[#c5a059] transition-colors">
                  Studio Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[#c5a059] transition-colors">
                  Project Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Confirmed Studio Location */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/40 font-mono font-semibold block mb-4">
                Confirmed Studio Office
              </span>
              <div className="space-y-4 text-sm text-white/80 font-body">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c5a059] mt-1 shrink-0" />
                  <p className="leading-relaxed">
                    {siteConfig.address.fullAddress}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="hover:text-[#c5a059] transition-colors font-medium text-white"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="hover:text-[#c5a059] transition-colors text-white/80 text-xs"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Rounded Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="btn-primary text-xs py-2.5 px-5 w-full sm:w-auto text-center justify-center"
              >
                <span>Initiate Enquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsAppDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark text-xs py-2.5 px-5 flex items-center justify-center gap-2 hover:border-emerald-400 hover:text-emerald-300 w-full sm:w-auto text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Assurance */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/50 font-body">
          <p>
            © {currentYear} {siteConfig.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED STUDIO · T DASARAHALLI, BENGALURU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
