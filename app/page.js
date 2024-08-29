import { Suspense } from 'react';

import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

export const metadata = {
  title: 'Latest Posts',
  description: 'Browse our latest posts.',
  // The openGraph property controls the appearance of your page when shared on social media.
  // openGraph: {
  //   title: 'PostFeed',
  //   description: 'Browse our latest posts.',
  //   url: 'https://yourwebsite.com/latest-posts',
  //   siteName: 'PostFeed',
  //   images: [
  //     {
  //       url: 'https://yourwebsite.com/logo.jpg',
  //       width: 1200,
  //       height: 630,
  //       alt: 'Logo',
  //     },
  //   ],
  //   type: 'website',
  //   locale: 'en_US',
  // },
}

async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here's what you might've missed.</p>
      <section id="latest-posts">
      <Suspense fallback={<p>Loading recent posts...</p>}>
        <LatestPosts />
      </Suspense>
      </section>
    </>
  );
}
