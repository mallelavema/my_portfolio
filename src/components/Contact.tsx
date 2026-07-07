import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, Copy, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';
import { FORM_ENDPOINT } from '../config';

interface SubmissionLog {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [validationError, setValidationError] = useState('');
  const [sendingState, setSendingState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionLog[]>([]);

  // Load any prior message logs from localStorage to simulate persistent analytics
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vema_portfolio_messages');
      if (stored) {
        setSubmissionHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not parse submission history", e);
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Field Validations
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setValidationError('Please complete all required fields (*).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setValidationError('Please specify a valid email address.');
      return;
    }

    // If a FORM_ENDPOINT is configured, POST to it (Formspree or similar). Otherwise fallback to localStorage.
    if (FORM_ENDPOINT && FORM_ENDPOINT.trim().length > 0) {
      setSendingState('sending');
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message
        })
      })
        .then(async (res) => {
          if (res.ok) {
            // success
            const newSubmission: SubmissionLog = {
              ...formState,
              timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            const updatedHistory = [newSubmission, ...submissionHistory].slice(0, 5);
            setSubmissionHistory(updatedHistory);
            try { localStorage.setItem('vema_portfolio_messages', JSON.stringify(updatedHistory)); } catch (err) { console.error(err); }
            setSendingState('success');
            setFormState({ name: '', email: '', subject: '', message: '' });
          } else {
            const data = await res.json().catch(() => ({}));
            setValidationError(data.error || 'Submission failed. Please try again later.');
            setSendingState('idle');
          }
        })
        .catch((err) => {
          console.error(err);
          setValidationError('Network error while sending message. Please try again later.');
          setSendingState('idle');
        });
    } else {
      // fallback: localStorage demo
      setSendingState('sending');
      setTimeout(() => {
        const newSubmission: SubmissionLog = {
          ...formState,
          timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updatedHistory = [newSubmission, ...submissionHistory].slice(0, 5); // keep last 5
        setSubmissionHistory(updatedHistory);
        try { localStorage.setItem('vema_portfolio_messages', JSON.stringify(updatedHistory)); } catch (err) { console.error(err); }
        setSendingState('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      }, 1500);
    }
  };

  const clearFormSuccess = () => {
    setSendingState('idle');
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/[0.04]">
      {/* Structural bottom bloom */}
      <div className="absolute bottom-0 right-[20%] w-[40vw] h-[40vw] rounded-full bg-pink-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-pink-400"></span>
            <span className="font-mono text-xs text-pink-400 uppercase tracking-widest">Inquire</span>
          </div>
          <h2 className="font-sans font-black tracking-tight text-white text-3xl sm:text-4xl">
            Initiate Connection
          </h2>
          <p className="font-sans text-[#9A9AA5] text-sm md:text-base mt-2 max-w-xl">
            Let's discuss advanced data pipeline designs, machine learning opportunities, or business intelligence dashboard creations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Quick Contact Credentials Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md hover:border-white/[0.12] transition-colors duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.01] to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h3 className="font-sans font-black text-2xl text-white tracking-tight mb-4">
                Let's make something incredible.
              </h3>
              <p className="font-sans text-sm text-[#9A9AA5] leading-relaxed mb-8">
                Whether you need a dedicated machine learning developer, optimized SQL data warehouses, or state-of-the-art interactive analytical charts, my pipelines are designed for speed and reliability.
              </p>

              {/* Actionable items */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="font-mono text-[9px] text-[#9A9AA5] uppercase tracking-wider block">Direct Email</span>
                    <span className="font-sans text-white text-sm sm:text-base block truncate font-medium">
                      {personalInfo.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.15] text-[#9A9AA5] hover:text-white transition-all duration-200 shrink-0"
                    title="Copy Email Address"
                    id="btn-copy-email"
                  >
                    {copiedEmail ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-[#9A9AA5] uppercase tracking-wider block">Telephone Connection</span>
                    <span className="font-sans text-white text-sm sm:text-base block font-medium">
                      {personalInfo.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-[#9A9AA5] uppercase tracking-wider block">Geographic Base</span>
                    <span className="font-sans text-white text-sm sm:text-base block font-medium">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles and copyright */}
            <div className="mt-12 pt-8 border-t border-white/[0.05] relative z-10">
              <span className="font-mono text-[10px] text-[#9A9AA5] uppercase tracking-wider block mb-4">
                Interactive Repositories
              </span>
              <div className="flex gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-[#0077B5]/40 hover:text-[#0077B5] text-[#9A9AA5] font-sans text-xs font-semibold transition-all duration-300"
                  id="social-linkedin"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Link</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/20 hover:text-white text-[#9A9AA5] font-sans text-xs font-semibold transition-all duration-300"
                  id="social-github"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Input Form Panel */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.05] backdrop-blur-md hover:border-white/[0.08] transition-colors duration-300 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {sendingState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8"
                  id="form-success-container"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-sans font-black text-2xl text-white tracking-tight mb-2">
                    Transmission Successful
                  </h3>
                  <p className="font-sans text-[#9A9AA5] text-sm max-w-sm mb-8 leading-relaxed">
                    Thank you! Your message packet has been transmitted and logged locally. I will review and reply within 24 standard business hours.
                  </p>
                  <button
                    onClick={clearFormSuccess}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.05] text-[#9A9AA5] hover:text-white font-medium text-xs transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Packet</span>
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  id="contact-form"
                  noValidate
                >
                  {/* Grid fields for Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="text-left">
                      <label htmlFor="form-name" className="font-mono text-[10px] text-[#9A9AA5] uppercase tracking-wider block mb-2 font-bold">
                        Sender Identity *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 text-sm focus:bg-white/[0.04] focus:border-pink-500/50 outline-none transition-all"
                        disabled={sendingState === 'sending'}
                      />
                    </div>

                    <div className="text-left">
                      <label htmlFor="form-email" className="font-mono text-[10px] text-[#9A9AA5] uppercase tracking-wider block mb-2 font-bold">
                        Email Coordinates *
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="you@domain.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 text-sm focus:bg-white/[0.04] focus:border-pink-500/50 outline-none transition-all"
                        disabled={sendingState === 'sending'}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="text-left">
                    <label htmlFor="form-subject" className="font-mono text-[10px] text-[#9A9AA5] uppercase tracking-wider block mb-2 font-bold">
                      Connection Subject
                    </label>
                    <input
                      type="text"
                      id="form-subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Collaboration Opportunity / Dashboard Project"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 text-sm focus:bg-white/[0.04] focus:border-pink-500/50 outline-none transition-all"
                      disabled={sendingState === 'sending'}
                    />
                  </div>

                  {/* Message Body */}
                  <div className="text-left">
                    <label htmlFor="form-message" className="font-mono text-[10px] text-[#9A9AA5] uppercase tracking-wider block mb-2 font-bold">
                      Message Packet *
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Please details your project inquiry, database scope, or career offer details..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white placeholder-white/20 text-sm focus:bg-white/[0.04] focus:border-pink-500/50 outline-none resize-none transition-all"
                      disabled={sendingState === 'sending'}
                    />
                  </div>

                  {/* Validations and Submit */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.05]">
                    {validationError ? (
                      <div className="flex items-center gap-2 text-rose-400 text-xs font-mono">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    ) : (
                      <span className="font-mono text-[9px] text-[#9A9AA5] tracking-wide hidden sm:inline">
                        * Required validation fields
                      </span>
                    )}

                    <button
                      type="submit"
                      disabled={sendingState === 'sending'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-medium text-sm disabled:opacity-50 hover:scale-[1.01] hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-200 cursor-pointer"
                      id="btn-submit-contact"
                    >
                      {sendingState === 'sending' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Routing Packet...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Interactive Local Storage sent-log analyzer */}
            {submissionHistory.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/[0.05] text-left">
                <span className="font-mono text-[9px] text-pink-400 uppercase tracking-widest block mb-3 font-semibold">
                  Local Message Logs (Recent Transmissions)
                </span>
                <div className="space-y-2 max-h-24 overflow-y-auto pr-1">
                  {submissionHistory.map((log, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-[#0A0A0B] border border-white/[0.03] flex justify-between items-center text-[10px] font-mono text-[#9A9AA5]"
                    >
                      <div className="truncate pr-4 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-white font-bold truncate max-w-[80px] sm:max-w-none">{log.name}</span>
                        <span className="opacity-50">({log.email})</span>
                      </div>
                      <span className="opacity-75 shrink-0 text-[9px]">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
