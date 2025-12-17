import React from 'react';
import { PageWrapper } from './PageWrapper';

const PrivacyPolicyPage: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
    return (
        <PageWrapper title="Privacy Policy" onNavigateHome={onNavigateHome}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
                S★A ° VIDEO DOWNLOAD ("us", "we", or "our") operates the S★A ° VIDEO DOWNLOAD application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>

            <h2>Information Collection and Use</h2>
            <p>
                We do not collect any personally identifiable information from our users. Our service is designed to be anonymous. The YouTube video URL you provide is used solely to process your download request and is not stored or associated with you.
            </p>
            
            <h2>Log Data</h2>
            <p>
                We do not collect information that your browser sends whenever you visit our Service ("Log Data"). Since we do not have a server backend for user interactions, no logs of your activity are kept.
            </p>

            <h2>Cookies</h2>
            <p>
                Cookies are files with a small amount of data, which may include an anonymous unique identifier. We do not use cookies to collect information. Our service is stateless and does not require cookies to function.
            </p>

            <h2>Security</h2>
            <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. Our service operates entirely within your browser, which means the video data is processed on your device, providing an inherent layer of security as your data does not travel to our servers.
            </p>

            <h2>Links to Other Sites</h2>
            <p>
                Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please use the contact form available on our "Contact" page.
            </p>
        </PageWrapper>
    );
};

export default PrivacyPolicyPage;