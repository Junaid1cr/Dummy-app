import express, { Request, Response } from 'express';

const app = express();


const VERSION = process.env.APP_VERSION ?? 'dev';


const DEPLOYED_AT = new Date().toISOString();

app.get('/health', (_req: Request, res: Response) => {
  res.json({ version: VERSION, status: 'ok', deployedAt: DEPLOYED_AT });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from dummy-app, deployed by Helmsman', version: VERSION });
});

export { app };

const PORT = Number(process.env.PORT ?? 3000);


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`dummy-app v${VERSION} listening on :${PORT}`);
  });
}
// Sun Oct  4 05:46:35 PM IST 2026
// new feature Sun Oct  4 06:10:15 PM IST 2026
