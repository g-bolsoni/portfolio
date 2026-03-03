export const GET = () => {
  const body = `User-agent: *\nAllow: /\nSitemap: https://devbolsoni.com.br/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
