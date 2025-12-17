import React, { useState } from 'react';
import { PageWrapper } from './PageWrapper';
import { CheckIcon } from './Icons';

const ContactPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) {
            // Basic validation, modern browsers will handle `required`
            return;
        }
        setStatus('SENDING');
        // Simulate API call
        setTimeout(() => {
            setStatus('SUCCESS');
        }, 1500);
    };

    return (
        <PageWrapper title="Contact Us" onNavigateHome={onNavigateHome}>
            <p className="not-prose text-slate-600 mb-8">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            {status === 'SUCCESS' ? (
                <div className="text-center bg-green-50 p-8 rounded-lg border border-green-200 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 mb-6">Thanks for reaching out. We'll review your message and get back to you shortly.</p>
                    <button onClick={onNavigateHome} className="text-blue-600 font-medium hover:underline py-2">
                        Back to Home
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                        <textarea
                            id="message"
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Your message here..."
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={status === 'SENDING'}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {status === 'SENDING' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </div>
                </form>
            )}
        </PageWrapper>
    );
};

export default ContactPage;