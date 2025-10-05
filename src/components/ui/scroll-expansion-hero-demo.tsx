'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop',
    poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
    background: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop',
    title: 'AI Workforce Revolution',
    date: 'Future of Work',
    scrollToExpand: 'Scroll to Explore AI Employees',
    about: {
      overview:
        'Welcome to the future of work with our revolutionary AI workforce platform. Experience how artificial intelligence employees can transform your business operations through intelligent automation, data analysis, and creative problem-solving.',
      conclusion:
        'Our AI employees are designed to work alongside human teams, providing 24/7 support, instant insights, and scalable solutions. Scroll to discover how each AI employee can enhance your productivity and drive innovation.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1280&auto=format&fit=crop',
    background: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1920&auto=format&fit=crop',
    title: 'Intelligent Automation',
    date: 'AI-Powered Solutions',
    scrollToExpand: 'Scroll to See AI Capabilities',
    about: {
      overview:
        'Discover the power of intelligent automation with our specialized AI employees. Each AI worker is trained in specific domains like software development, data science, content creation, and customer support to deliver exceptional results.',
      conclusion:
        'Our AI workforce adapts to your business needs, learning from interactions and continuously improving. Experience seamless integration with your existing workflows and watch productivity soar.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
        About Our AI Workforce
      </h2>
      <p className='text-lg mb-8 text-black dark:text-white'>
        {currentMedia.about.overview}
      </p>

      <div className='grid md:grid-cols-2 gap-8 mb-8'>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold mb-4 text-white'>24/7 Availability</h3>
          <p className='text-white/90'>
            Our AI employees work around the clock, ensuring your business never stops. 
            They handle tasks instantly and are always ready to assist.
          </p>
        </div>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
          <h3 className='text-xl font-semibold mb-4 text-white'>Scalable Intelligence</h3>
          <p className='text-white/90'>
            Scale your workforce instantly by hiring multiple AI employees. 
            Each one brings specialized skills to your team.
          </p>
        </div>
      </div>

      <p className='text-lg mb-8 text-black dark:text-white'>
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export const VideoExpansionTextBlend = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const Demo = () => {
  const [mediaType, setMediaType] = useState('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className='min-h-screen'>
      <div className='fixed top-4 right-4 z-50 flex gap-2'>
        <button
          onClick={() => setMediaType('video')}
          className={`px-4 py-2 rounded-lg ${
            mediaType === 'video'
              ? 'bg-white text-black'
              : 'bg-black/50 text-white border border-white/30'
          }`}
        >
          Video
        </button>

        <button
          onClick={() => setMediaType('image')}
          className={`px-4 py-2 rounded-lg ${
            mediaType === 'image'
              ? 'bg-white text-black'
              : 'bg-black/50 text-white border border-white/30'
          }`}
        >
          Image
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType as 'video' | 'image'}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType as 'video' | 'image'} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;
