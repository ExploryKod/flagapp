
# FLAG APP

I created this project using [Next.js16](https://nextjs.org) 

This is a simple project made fastly in few hours that call a public API and render countries and their information. There is a list of countries (home page) and country page for each country. 
So for now, only a few set of business rules and two use-case inside one "countries" module exist.
It could evolve to add new modules and business rules.

I wanted to learn good design pattern and software architecture with a simple project. It is over-engeneering for a real project but ideal to train and learn on this type of architecture. 

I deployed this project on vercel very fastly and easily. The main technical interest isn't about server architecture but application architecture.

## Local Installation

You need nodejs, npm or pnpm and other sofware we normally use for web development. 
There no database for now (only a call to a public API). 
So I have not designed a docker configuration as it is very easy for now to setup.

Install dependencies : 

```bash
npm install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
