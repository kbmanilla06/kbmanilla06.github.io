# Hunter's Guild Portfolio

A cinematic, Monster-Hunter-inspired portfolio for Khristopher Ben Manilla,
built with Next.js, React Three Fiber, GSAP, Framer Motion, and Tailwind CSS.

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The contact form validates locally without credentials. To send messages, add
either a Resend API key or the SMTP settings documented in
`.env.local.example`.

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deployment

Vercel is the recommended host because the contact form uses a Next.js server
action. Import this repository into Vercel, add the contact-provider variables,
and set `NEXT_PUBLIC_SITE_URL` to the production origin.

The previous static GitHub Pages site is preserved in `legacy-static/` for
reference. It is not part of the Next.js build.
