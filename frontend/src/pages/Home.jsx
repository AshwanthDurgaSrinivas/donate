import React from 'react';
import HeroStats from '../components/HeroStats';
import VideoSection from '../components/VideoSection';
import PhotoGallery from '../components/PhotoGallery';
import LiveDashboard from '../components/LiveDashboard';
import WebsitePackage from '../components/WebsitePackage';
import StoryAndSMA from '../components/StoryAndSMA';
import GiggleZen from '../components/GiggleZen';
import FAQSection from '../components/FAQSection';

const Home = () => {
    return (
        <div className="page-bg">
            <HeroStats />
            <VideoSection />
            <PhotoGallery />
            <StoryAndSMA />
            <WebsitePackage />
            <LiveDashboard />
            <FAQSection />
            <GiggleZen />
        </div>
    );
};

export default Home;
