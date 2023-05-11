import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Livepeer Rooms"
        titleTemplate="%s"
        defaultTitle="Livepeer Rooms"
        description="Livepeer Rooms."
        twitter={{
          handle: '@livekitted',
          site: '@livekitted',
          cardType: 'summary_large_image',
        }}
        openGraph={{
          url: 'https://meet.livekit.io',
          images: [
            {
              url: 'https://meet.livekit.io/images/livekit-meet-open-graph.png',
              width: 2000,
              height: 1000,
              type: 'image/png',
            },
          ],
          site_name: 'Livepeer Rooms',
        }}
        additionalMetaTags={[
          {
            property: 'theme-color',
            content: '#070707',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.png',
          },
          {
            rel: 'apple-touch-icon',
            href: '/images/livekit-apple-touch.png',
            sizes: '180x180',
          },
          {
            rel: 'mask-icon',
            href: '/images/livekit-safari-pinned-tab.svg',
            color: '#070707',
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
