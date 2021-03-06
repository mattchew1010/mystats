import Head from 'next/head';

export default function Metatags({
  title = 'mattchew1010.com',
  description = "mattchew1010's site",
  image = '/icons/google.png',
}) {
  return (
    <Head>

      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@mattchew1010" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta charSet="utf-8"/>
      <meta name="description" content={description} />
      
    </Head>
  );
}