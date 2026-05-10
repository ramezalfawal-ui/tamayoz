# Tamayoz — تميّز
### AI-Powered Talent Assessment Platform for UAE

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set your API key
```bash
cp .env.example .env.local
```
Then open `.env.local` and add your Claude API key:
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```
Get your key at: https://console.anthropic.com

### 3. Run the app
```bash
npm run dev
```
Open http://localhost:3000

---

## 📁 Project Structure

```
tamayoz/
├── src/
│   ├── App.tsx                    ← Main app + routing
│   ├── main.tsx                   ← React entry point
│   ├── index.css                  ← Global styles (Tailwind)
│   ├── constants.ts               ← All data (specs, companies, etc.)
│   ├── types/
│   │   └── index.ts               ← TypeScript types
│   ├── lib/
│   │   └── ai.ts                  ← Claude API integration
│   └── components/
│       ├── ui/
│       │   ├── Logo.tsx           ← Tamayoz logo component
│       │   └── CircularProgress.tsx ← Score ring
│       ├── WizardLayout.tsx       ← Header + stepper + footer
│       ├── wizard/
│       │   ├── Registration.tsx   ← Step 0: Account creation
│       │   ├── Specialization.tsx ← Step 1: Pick your field
│       │   ├── ProfileBasics.tsx  ← Step 2: CV + basic info
│       │   ├── ProfileDetails.tsx ← Step 3: Education, work, skills
│       │   ├── CoverLetter.tsx    ← Step 4: Cover letter + AI tips
│       │   ├── VideoUpload.tsx    ← Step 5: Video intro upload
│       │   └── AIEvaluation.tsx   ← Step 6: Claude AI scoring
│       ├── Dashboard.tsx          ← Candidate dashboard
│       ├── Training.tsx           ← Training recommendations
│       └── Companies.tsx          ← Company search & discovery
```

---

## 🤖 How the AI Works

The AI evaluation (`src/lib/ai.ts`) calls Claude Sonnet via the Anthropic API.

**What it evaluates:**
1. Profile completeness
2. CV quality
3. Cover letter strength
4. Interview readiness
5. UAE market fit
6. Communication clarity

**Output:** A JSON score report with overall score (0–100), per-dimension scores, strengths, critical actions, and readiness level (Top Talent / Job Ready / Growing / Needs Development).

The Vite dev server proxies `/api/claude/` → `https://api.anthropic.com` to handle CORS in development.

---

## 🔧 Adding Real Auth + Database

When you're ready to make it fully production-ready, add Supabase:

```bash
npm install @supabase/supabase-js
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Then replace the local `profile` state with Supabase database calls.
See the [Supabase docs](https://supabase.com/docs) for setup.

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool + dev server |
| Tailwind CSS 3 | Styling |
| Lucide React | Icons |
| Claude API | AI evaluation |

---

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add your `VITE_ANTHROPIC_API_KEY` in the Vercel environment variables dashboard.

For production API calls, move the Claude API call to a Vercel Edge Function so the API key stays server-side.

---

## 📋 Specializations Supported

- 💻 IT & Development
- 📊 Digital Marketing
- 🧾 Accounting & Finance
- 🎨 Graphic Design
- ✍️ Content Creation
- 📈 Sales & Business Dev

Each specialization has its own field-specific interview questions and practical test description.

---

## 📄 License

MIT — Free to use, modify, and deploy.

Built with ❤️ for the UAE & GCC talent market.
