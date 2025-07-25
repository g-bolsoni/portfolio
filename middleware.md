The middleware can be created via createMiddleware.

It receives a routing configuration and takes care of:

Locale negotiation
Applying relevant redirects & rewrites
Providing alternate links for search engines
Example:

middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
// Match all pathnames except for
// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
// - … the ones containing a dot (e.g. `favicon.ico`)
matcher: '/((?!api|trpc|\_next|\_vercel|._\\.._).\*)'
};

Locale detection
The locale is negotiated based on your routing configuration, taking into account your settings for localePrefix, domains, localeDetection, and localeCookie.

Prefix-based routing (default)
By default, prefix-based routing is used to determine the locale of a request.

In this case, the locale is detected based on these priorities:

A locale prefix is present in the pathname (e.g. /en/about)
A cookie is present that contains a previously detected locale
A locale can be matched based on the accept-language header
As a last resort, the defaultLocale is used
To change the locale, users can visit a prefixed route. This will take precedence over a previously matched locale that is saved in a cookie or the accept-language header and will update a previous cookie value.

Example workflow:

A user requests / and based on the accept-language header, the en locale is matched.
The user is redirected to /en.
The app renders <Link locale="de" href="/">Switch to German</Link> to allow the user to change the locale to de.
When the user clicks on the link, a request to /de is initiated.
The middleware will add a cookie to remember the preference for the de locale.
The user later requests / again and the middleware will redirect to /de based on the cookie.
Domain-based routing
If you’re using domain-based routing, the middleware will match the request against the available domains to determine the best-matching locale. To retrieve the domain, the host is read from the x-forwarded-host header, with a fallback to host (hosting platforms typically provide these headers out-of-the-box).

The locale is detected based on these priorities:

A locale prefix is present in the pathname (e.g. ca.example.com/fr)
A locale is stored in a cookie and is supported on the domain
A locale that the domain supports is matched based on the accept-language header
As a fallback, the defaultLocale of the domain is used
Since the middleware is aware of all your domains, if a domain receives a request for a locale that is not supported (e.g. en.example.com/fr), it will redirect to an alternative domain that does support the locale.

Example workflow:

The user requests us.example.com and based on the defaultLocale of this domain, the en locale is matched.
The app renders <Link locale="fr" href="/">Switch to French</Link> to allow the user to change the locale to fr.
When the link is clicked, a request to us.example.com/fr is initiated.
The middleware recognizes that the user wants to switch to another domain and responds with a redirect to ca.example.com/fr.
Matcher config
The middleware is intended to only run on pages, not on arbitrary files that you serve independently of the user locale (e.g. /favicon.ico).

A popular strategy is to match all routes that don’t start with certain segments (e.g. /\_next) and also none that include a dot (.) since these typically indicate static files. However, if you have some routes where a dot is expected (e.g. /users/jane.doe), you should explicitly provide a matcher for these.

middleware.ts
export const config = {
// Matcher entries are linked with a logical "or", therefore
// if one of them matches, the middleware will be invoked.
matcher: [
// Match all pathnames except for
// - … if they start with `/api`, `/_next` or `/_vercel`
// - … the ones containing a dot (e.g. `favicon.ico`)
'/((?!api|\_next|\_vercel|._\\.._).\*)',

    // However, match all pathnames within `/users`, optionally with a locale prefix
    '/([\\w-]+)?/users/(.+)'

]
};

Note that some third-party providers like Vercel Analytics typically use internal endpoints that are then rewritten to an external URL (e.g. /\_vercel/insights/view). Make sure to exclude such requests from your middleware matcher so they aren’t rewritten by accident.

Composing other middlewares
By calling createMiddleware, you’ll receive a function of the following type:

function middleware(request: NextRequest): NextResponse;

If you need to incorporate additional behavior, you can either modify the request before the next-intl middleware receives it, modify the response or even create the middleware based on dynamic configuration.

middleware.ts
import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

export default async function middleware(request: NextRequest) {
// Step 1: Use the incoming request (example)
const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';

// Step 2: Create and call the next-intl middleware (example)
const handleI18nRouting = createMiddleware({
locales: ['en', 'de'],
defaultLocale
});
const response = handleI18nRouting(request);

// Step 3: Alter the response (example)
response.headers.set('x-your-custom-locale', defaultLocale);

return response;
}

export const config = {
// Match only internationalized pathnames
matcher: ['/', '/(de|en)/:path*']
};

Example: Additional rewrites
If you need to handle rewrites apart from the ones provided by next-intl, you can adjust the pathname of the request before invoking the next-intl middleware (based on “A/B Testing with Cookies” by Vercel).

This example rewrites requests for /[locale]/profile to /[locale]/profile/new if a special cookie is set.

middleware.ts
import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

export default async function middleware(request: NextRequest) {
const [, locale, ...segments] = request.nextUrl.pathname.split('/');

if (locale != null && segments.join('/') === 'profile') {
const usesNewProfile =
(request.cookies.get('NEW_PROFILE')?.value || 'false') === 'true';

    if (usesNewProfile) {
      request.nextUrl.pathname = `/${locale}/profile/new`;
    }

}

const handleI18nRouting = createMiddleware({
locales: ['en', 'de'],
defaultLocale: 'en'
});
const response = handleI18nRouting(request);
return response;
}

export const config = {
matcher: ['/', '/(de|en)/:path*']
};

Note that if you use a localePrefix other than always, you need to adapt the handling appropriately to handle unprefixed pathnames too. Also, make sure to only rewrite pathnames that will not lead to a redirect, as otherwise rewritten pathnames will be redirected to.

Example: Integrating with Clerk
@clerk/nextjs provides a middleware that can be combined with other middlewares like the one provided by next-intl. By combining them, the middleware from @clerk/next will first ensure protected routes are handled appropriately. Subsequently, the middleware from next-intl will run, potentially redirecting or rewriting incoming requests.

middleware.ts
import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher(['/:locale/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
if (isProtectedRoute(req)) await auth.protect();

return handleI18nRouting(req);
});

export const config = {
// Match only internationalized pathnames
matcher: ['/', '/(de|en)/:path*']
};

(based on @clerk/nextjs@^6.0.0)

Example: Integrating with Supabase Authentication
In order to use Supabase Authentication with next-intl, you need to combine the Supabase middleware with the one from next-intl.

You can do so by following the setup guide from Supabase and adapting the middleware utils to accept a response object that’s been created by the next-intl middleware instead of creating a new one:

utils/supabase/middleware.ts
import {createServerClient} from '@supabase/ssr';
import {NextResponse, type NextRequest} from 'next/server';

export async function updateSession(
request: NextRequest,
response: NextResponse
) {
const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
getAll() {
return request.cookies.getAll();
},
setAll(cookiesToSet) {
cookiesToSet.forEach(({name, value}) =>
request.cookies.set(name, value)
);
cookiesToSet.forEach(({name, value, options}) =>
response.cookies.set(name, value, options)
);
}
}
}
);

const {
data: {user}
} = await supabase.auth.getUser();

return response;
}

Now, we can integrate the Supabase middleware with the one from next-intl:

middleware.ts
import createMiddleware from 'next-intl/middleware';
import {type NextRequest} from 'next/server';
import {routing} from './i18n/routing';
import {updateSession} from './utils/supabase/middleware';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
const response = handleI18nRouting(request);

// A `response` can now be passed here
return await updateSession(request, response);
}

export const config = {
matcher: ['/', '/(de|en)/:path*']
};

(based on @supabase/ssr@^0.5.0)

Example: Integrating with Auth.js (aka NextAuth.js)
The Next.js middleware of Auth.js requires an integration with their control flow to be compatible with other middlewares. The success callback can be used to run the next-intl middleware on authorized pages. However, public pages need to be treated separately.

For pathnames specified in the pages object (e.g. signIn), Auth.js will skip the entire middleware and not run the success callback. Therefore, we have to detect these pages before running the Auth.js middleware and only run the next-intl middleware in this case.

middleware.ts
import {withAuth} from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
import {routing} from './i18n/routing';

const publicPages = ['/', '/login'];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
// Note that this callback is only invoked if
// the `authorized` callback has returned `true`
// and not for pages listed in `pages`.
function onSuccess(req) {
return handleI18nRouting(req);
},
{
callbacks: {
authorized: ({token}) => token != null
},
pages: {
signIn: '/login'
}
}
);

export default function middleware(req: NextRequest) {
const publicPathnameRegex = RegExp(
`^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
'i'
);
const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

if (isPublicPage) {
return handleI18nRouting(req);
} else {
return (authMiddleware as any)(req);
}
}

export const config = {
matcher: ['/((?!api|_next|.*\\..*).*)']
};

(based on next-auth@^4.0.0)

Have a look at the next-intl with NextAuth.js example to explore a working setup.

Usage without middleware (static export)
If you’re using the static export feature from Next.js (output: 'export'), the middleware will not run. You can use prefix-based routing nontheless to internationalize your app, but a few tradeoffs apply.

Static export limitations:

Using a locale prefix is required (same as localePrefix: 'always')
The locale can’t be negotiated on the server (same as localeDetection: false)
You can’t use pathname localization, as these require server-side rewrites
Static rendering is required
Additionally, other limitations as documented by Next.js will apply too.

If you choose this approach, you might want to enable a redirect at the root of your app:

app/page.tsx
import {redirect} from 'next/navigation';

// Redirect the user to the default locale when `/` is requested
export default function RootPage() {
redirect('/en');
}

Additionally, Next.js will ask for a root layout for app/page.tsx, even if it’s just passing children through:

app/layout.tsx
export default function RootLayout({children}) {
return children;
}

Troubleshooting
”The middleware doesn’t run for a particular page.”
To resolve this, make sure that:

The middleware is set up in the correct file (e.g. src/middleware.ts).
Your middleware matcher correctly matches all routes of your application, including dynamic segments with potentially unexpected characters like dots (e.g. /users/jane.doe).
In case you’re composing other middlewares, ensure that the middleware is called correctly.
In case you require static rendering, make sure to follow the static rendering guide instead of relying on hacks like force-static.
”My page content isn’t localized despite the pathname containing a locale prefix.”
This is very likely the result of your middleware not running on the request. As a result, a potential fallback from i18n/request.ts might be applied.

”Unable to find next-intl locale because the middleware didn’t run on this request and no locale was returned in getRequestConfig.”
If the middleware is not expected to run on this request (e.g. because you’re using a setup without i18n routing), you should explicitly return a locale from getRequestConfig to recover from this error.

If the middleware is expected to run, verify that your middleware is set up correctly.

Note that next-intl will invoke the notFound() function to abort the render if no locale is available after getRequestConfig has run. You should consider adding a not-found page due to this.
