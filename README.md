# Digital Heroes Backend

Beginner-friendly Node.js, Express and MongoDB API.

## Run

1. Install MongoDB locally or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
3. Run:

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this project to GitHub, GitLab, or Bitbucket.
2. Import the repository into Vercel. Vercel automatically deploys `api/index.js` as the serverless API entrypoint.
3. In the Vercel project settings, add these environment variables for the Production, Preview, and Development environments:
   - `MONGO_URI`: your MongoDB Atlas connection string for the `digital_heroes` database.
   - `JWT_SECRET`: a long, random secret.
   - `CLIENT_URL`: the deployed frontend origin, for example `https://your-frontend.vercel.app`.
4. In MongoDB Atlas, add `0.0.0.0/0` to Network Access (or allow the Vercel egress IPs if your plan supports a restricted allowlist), and ensure the database user has access to `digital_heroes`.
5. Deploy and verify `https://your-project.vercel.app/api/health`.

If the deployment returns `Database connection failed`, check the Vercel Function
logs for the underlying error. The most common causes are a missing `MONGO_URI`,
an unencoded username/password (URL-encode special characters), or MongoDB Atlas
Network Access blocking Vercel.

Do not commit `.env`; production secrets must be configured in Vercel project settings.

## Main endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/dashboard` (Bearer token)
- `GET|POST /api/scores` (Bearer token)
- `PUT|DELETE /api/scores/:id` (Bearer token)
- `GET /api/charities`
- `GET /api/draws` (Bearer token)
- `POST /api/draws` (admin)
- `PATCH /api/draws/:id/publish` (admin)

The score controller enforces Stableford scores from 1–45, one score per date, and retains only the newest five scores.