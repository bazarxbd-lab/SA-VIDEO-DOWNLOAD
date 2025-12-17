import React, { useState } from 'react';
import { ChevronDown } from './Icons';
import { generateFaqAnswers } from '../services/geminiService';

const FAQItem = ({ question, defaultAnswer }: { question: string, defaultAnswer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState(defaultAnswer);
  const [loading, setLoading] = useState(false);
  const [hasLoadedAI, setHasLoadedAI] = useState(false);

  const handleToggle = async () => {
    if (!isOpen && !hasLoadedAI && process.env.API_KEY) {
        // Enhance answer with AI on first open if API key exists
        setLoading(true);
        setIsOpen(true);
        const aiAnswer = await generateFaqAnswers(question);
        setAnswer(aiAnswer);
        setHasLoadedAI(true);
        setLoading(false);
    } else {
        setIsOpen(!isOpen);
    }
  };

  return (
    <div className="border-b border-slate-200">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={handleToggle}
      >
        <span className="text-lg font-medium text-slate-800">{question}</span>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <ChevronDown className="w-5 h-5 text-slate-400" />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="pb-6 text-slate-600 leading-relaxed">
            {loading ? (
                <span className="inline-flex items-center gap-2 text-blue-600 animate-pulse">
                    Generating smart answer...
                </span>
            ) : answer}
        </div>
      </div>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Key Questions on Downloading YouTube Videos</h2>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8">
            <FAQItem 
                question="Is it legal to download YouTube videos?" 
                defaultAnswer="It generally depends on the Terms of Service. Downloading videos for personal offline use where a download button is provided by YouTube (like Premium) is allowed. For third-party tools, ensure you own the content or have permission."
            />
            <FAQItem 
                question="What is the difference between MP4 and MP3?" 
                defaultAnswer="MP4 is a digital multimedia container format most commonly used to store video and audio, but can also store other data such as subtitles and still images. MP3 is an audio coding format for digital audio."
            />
            <FAQItem 
                question="Does downloading reduce video quality?" 
                defaultAnswer="Not necessarily. If you select 'High Quality' or '1080p' during the download process, you receive the same visual fidelity as streaming that resolution, but stored locally."
            />
             <FAQItem 
                question="How much space does a 10-minute video take?" 
                defaultAnswer="A 10-minute video at 1080p resolution typically takes up about 150MB to 200MB, whereas a 720p version might only take 60MB to 80MB."
            />
        </div>
      </div>
    </section>
  );
};