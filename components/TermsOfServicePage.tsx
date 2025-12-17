import React from 'react';
import { PageWrapper } from './PageWrapper';

const TermsOfServicePage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
    return (
        <PageWrapper title="Terms of Service" onNavigateHome={onNavigateHome}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
                Please read these Terms of Service ("Terms") carefully before using the S★A ° VIDEO DOWNLOAD application (the "Service") operated by S★A ° VIDEO DOWNLOAD ("us", "we", or "our").
            </p>
            <p>
                Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.
            </p>
            
            <h2>Use of Service</h2>
            <p>
                Our service allows you to download videos from YouTube for personal, non-commercial use only. You are solely responsible for ensuring that your use of the service complies with all applicable laws, including copyright laws and YouTube's Terms of Service.
            </p>

            <h2>Prohibited Uses</h2>
            <p>
                You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You may not:
            </p>
            <ul>
                <li>Download copyrighted material without permission from the copyright holder.</li>
                <li>Distribute downloaded content commercially.</li>
                <li>Attempt to reverse-engineer, decompile, or disassemble the service.</li>
                <li>Use the service in any manner that could damage, disable, overburden, or impair it.</li>
            </ul>

            <h2>Disclaimer of Warranties</h2>
            <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the operation or availability of the Service. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
                In no event shall S★A ° VIDEO DOWNLOAD be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2>Changes to Terms</h2>
            <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about these Terms, please contact us via the form on our "Contact" page.
            </p>
        </PageWrapper>
    );
};

export default TermsOfServicePage;