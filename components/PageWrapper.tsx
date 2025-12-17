import React from 'react';

export const PageWrapper: React.FC<{ title: string, children: React.ReactNode, onNavigateHome: () => void }> = ({ title, children, onNavigateHome }) => (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20 animate-in fade-in duration-500">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-slate-200">
            <button onClick={onNavigateHome} className="text-sm font-medium text-blue-600 hover:text-blue-800 mb-6 flex items-center gap-1 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6"/></svg>
                Back to Home
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">{title}</h1>
            <div className="prose prose-slate max-w-none prose-h2:font-bold prose-h2:text-slate-800 prose-h2:mt-8 prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:underline">
                {children}
            </div>
        </div>
    </div>
);