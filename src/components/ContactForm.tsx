'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { CheckCircle2, AlertCircle, Send, MessageCircle, ArrowUpRight } from 'lucide-react';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  budgetRange: string;
  brief: string;
  honeypot: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Bespoke Residential Villa',
    location: '',
    budgetRange: '₹2.5 Cr – ₹5 Cr',
    brief: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please provide your full name.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'A valid contact phone number is required.';
    } else if (!/^\+?[0-9\s-]{8,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number (e.g. +91 99163 57444).';
    }

    if (!formData.email.trim()) {
      errs.email = 'An email address is required for project documentation.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.location.trim()) {
      errs.location = 'Please state your plot / property site location.';
    }

    if (!formData.brief.trim()) {
      errs.brief = 'Please share a brief description of your site or design aspirations.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      console.warn('Spam detected via honeypot.');
      setIsSubmitted(true);
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      setSubmissionError('Unable to transmit enquiry right now. Please call or WhatsApp our studio directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const msg = `*Project Brief for IDC Architects*\n\nName: ${formData.fullName || '[Name]'}\nPhone: ${formData.phone || '[Phone]'}\nEmail: ${formData.email || '[Email]'}\nType: ${formData.projectType}\nLocation: ${formData.location || 'Bengaluru'}\nBudget: ${formData.budgetRange}\n\nBrief: ${formData.brief || 'I would like to schedule an initial architectural review with IDC Architects.'}`;
    return encodeURIComponent(msg);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-12 bg-white rounded-2xl card-shadow border border-[#c5a059]/30 space-y-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <div className="badge-pill mx-auto">
            <span>Enquiry Received</span>
          </div>
          <h3 className="font-display text-3xl text-[#17181a]">Thank you, {formData.fullName}.</h3>
          <p className="font-body text-sm text-[#5e6268] max-w-md mx-auto leading-relaxed">
            {siteConfig.enquiryResponseTimeline} Our principal architects will review your brief for the site at <strong>{formData.location}</strong>.
          </p>
        </div>

        <div className="pt-6 border-t border-black/[0.06] flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: '',
                phone: '',
                email: '',
                projectType: 'Bespoke Residential Villa',
                location: '',
                budgetRange: '₹2.5 Cr – ₹5 Cr',
                brief: '',
                honeypot: '',
              });
            }}
            className="btn-outline text-xs py-2.5 px-6"
          >
            Submit Another Brief
          </button>
          <a
            href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2.5 px-6"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            <span>Forward to Studio WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Leave empty</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submissionError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{submissionError}</p>
        </div>
      )}

      {/* Grid: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#17181a]/80 font-semibold mb-2">
            Full Name <span className="text-[#c5a059]">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Vikram Murthy"
            className={`w-full px-4 py-3 bg-[#fbf9f5] rounded-xl border transition-all text-sm font-body ${
              errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-black/10 focus:border-[#c5a059] focus:bg-white'
            }`}
          />
          {errors.fullName && <p className="text-xs text-red-600 mt-1 font-medium">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#17181a]/80 font-semibold mb-2">
            Phone Number <span className="text-[#c5a059]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 99000 00000"
            className={`w-full px-4 py-3 bg-[#fbf9f5] rounded-xl border transition-all text-sm font-body ${
              errors.phone ? 'border-red-500 bg-red-50/20' : 'border-black/10 focus:border-[#c5a059] focus:bg-white'
            }`}
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1 font-medium">{errors.phone}</p>}
        </div>
      </div>

      {/* Grid: Email & Project Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#17181a]/80 font-semibold mb-2">
            Email Address <span className="text-[#c5a059]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@domain.com"
            className={`w-full px-4 py-3 bg-[#fbf9f5] rounded-xl border transition-all text-sm font-body ${
              errors.email ? 'border-red-500 bg-red-50/20' : 'border-black/10 focus:border-[#c5a059] focus:bg-white'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="projectType" className="block text-xs uppercase tracking-wider text-[#17181a]/80 font-semibold mb-2">
            Project Typology
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#fbf9f5] rounded-xl border border-black/10 focus:border-[#c5a059] focus:bg-white text-sm font-body cursor-pointer"
          >
            <option value="Bespoke Residential Villa">Bespoke Residential Villa</option>
            <option value="Luxury Penthouse / Apartment Interiors">Luxury Penthouse / Apartment Interiors</option>
            <option value="Courtyard Home & Biophilic Architecture">Courtyard Home & Biophilic Architecture</option>
            <option value="Boutique Commercial / Atelier Workspace">Boutique Commercial / Atelier Workspace</option>
            <option value="Greenfield Land Feasibility Advisory">Greenfield Land Feasibility Advisory</option>
          </select>
        </div>
      </div>

      {/* Grid: Location & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="location" className="block text-xs uppercase tracking-wider text-[#17181a]/80 font-semibold mb-2">
            Site / Property Location <span className="text-[#c5a059]">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Sadashivanagar, Jalahalli, Bengaluru"
            className={`w-full px-4 py-3 bg-[#fbf9f5] rounded-xl border transition-all text-sm font-body ${
              errors.location ? 'border-red-500 bg-red-50/20' : 'border-black/10 focus:border-[#c5a059] focus:bg-white'
            }`}
          />
          {errors.location && <p className="text-xs text-red-600 mt-1 font-medium">{errors.location}</p>}
        </div>

        <div>
          <label htmlFor="budgetRange" className="block text-xs uppercase tracking-wider text-[#17181a]/80 font-semibold mb-2">
            Target Construction Budget
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#fbf9f5] rounded-xl border border-black/10 focus:border-[#c5a059] focus:bg-white text-sm font-body cursor-pointer"
          >
            <option value="₹1 Cr – ₹2.5 Cr">₹1 Cr – ₹2.5 Cr</option>
            <option value="₹2.5 Cr – ₹5 Cr">₹2.5 Cr – ₹5 Cr</option>
            <option value="₹5 Cr – ₹10 Cr">₹5 Cr – ₹10 Cr</option>
            <option value="Above ₹10 Cr (High-Ticket Estate)">Above ₹10 Cr (High-Ticket Estate)</option>
            <option value="Advisory / Scope Dependent">Advisory / Scope Dependent</option>
          </select>
        </div>
      </div>

      {/* Project Brief */}
      <div>
        <label htmlFor="brief" className="block text-xs uppercase tracking-wider text-[#17181a]/80 font-semibold mb-2">
          Project Brief & Aspirations <span className="text-[#c5a059]">*</span>
        </label>
        <textarea
          id="brief"
          name="brief"
          rows={4}
          value={formData.brief}
          onChange={handleChange}
          placeholder="Describe your site dimensions, microclimate context, family living requirements, or target timeline..."
          className={`w-full px-4 py-3 bg-[#fbf9f5] rounded-xl border transition-all text-sm font-body resize-y ${
            errors.brief ? 'border-red-500 bg-red-50/20' : 'border-black/10 focus:border-[#c5a059] focus:bg-white'
          }`}
        />
        {errors.brief && <p className="text-xs text-red-600 mt-1 font-medium">{errors.brief}</p>}
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-[#5e6268] leading-relaxed font-body">
        Discretion Assured: Site coordinates and architectural briefs are treated with complete professional confidentiality.
      </p>

      {/* Submit Buttons with Rounded Styling */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary text-xs py-3 px-7 flex-1 sm:flex-initial"
        >
          {isSubmitting ? (
            <span>Transmitting Brief...</span>
          ) : (
            <>
              <span>Transmit Project Brief</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <a
          href={`https://wa.me/${siteConfig.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs py-3 px-6 flex items-center justify-center gap-2 hover:bg-[#1b4d3e] hover:border-[#1b4d3e] hover:text-white transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Discuss Directly on WhatsApp</span>
        </a>
      </div>
    </form>
  );
}
