'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#fbf9f5] min-h-screen">
      <div className="idc-shell">
        {/* Page Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="badge-pill">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Project Inquiry Desk</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#17181a] font-normal leading-tight">
            Tell us about the space you’re imagining.
          </h1>
          <p className="font-body text-base sm:text-lg text-[#5e6268] leading-relaxed">
            Every architectural commission begins with listening. Share your site location, plot size, and timeline. Our studio will review your brief within 24–48 hours to schedule a discovery consultation.
          </p>
        </div>

        {/* Form & Studio Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-black/[0.08]">
          {/* Left Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-10 card-shadow border border-black/[0.06]">
              <h2 className="font-display text-2xl sm:text-3xl text-[#17181a] mb-6">
                Direct Project Brief
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* Confirmed Studio Office Card */}
            <div className="p-8 bg-[#17181a] text-white rounded-2xl card-dark-shadow space-y-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#c5a059] block mb-1">
                  Confirmed Studio Location
                </span>
                <h3 className="font-display text-2xl text-white">IDC ARCHITECTS</h3>
              </div>

              <div className="space-y-4 text-sm text-white/80 font-body border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono text-white/40 block mb-0.5">STUDIO ADDRESS</span>
                    <p className="leading-relaxed">
                      {siteConfig.address.fullAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono text-white/40 block mb-0.5">TELEPHONE</span>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-base text-white font-semibold hover:text-[#c5a059] transition-colors"
                    >
                      {siteConfig.formattedPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono text-white/40 block mb-0.5">ENQUIRY EMAIL</span>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-white/90 hover:text-[#c5a059] transition-colors"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono text-white/40 block mb-0.5">CONSULTATION HOURS</span>
                    <p className="text-white/80">Monday – Saturday: 09:30 – 18:30 IST</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.whatsAppDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-[#1b4d3e] text-white hover:bg-emerald-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-2xl overflow-hidden card-shadow border border-black/[0.06]">
              <div className="p-3.5 bg-[#fbf9f5] text-xs font-mono text-[#17181a]/80 flex items-center justify-between border-b border-black/[0.06]">
                <span>STUDIO MAP · BENGALURU</span>
                <span>T DASARAHALLI</span>
              </div>
              <div className="relative aspect-[16/10] w-full">
                <iframe
                  title="IDC Architects Office Map Bengaluru"
                  src="https://maps.google.com/maps?q=T%20Dasarahalli%2C%20S.M.%20Road%2C%20near%20Jalahalli%20Cross%20Road%2C%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.85) contrast(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Links to Portfolio & Studio */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm font-medium">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-[#17181a] hover:text-[#c5a059] transition-colors"
          >
            <span>Review Selected Architecture Portfolio</span>
            <ArrowRight className="w-4 h-4 text-[#c5a059]" />
          </Link>
          <Link
            href="/studio"
            className="flex items-center gap-2 text-[#17181a] hover:text-[#c5a059] transition-colors"
          >
            <span>Read About Studio Philosophy & FAQ</span>
            <ArrowRight className="w-4 h-4 text-[#c5a059]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
