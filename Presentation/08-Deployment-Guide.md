# Deployment & Infrastructure Guide
## Bringing the New Website Online

This guide explains how to deploy the rebuilt Next.js website. It is written in plain language for non-technical stakeholders, followed by step-by-step instructions.

---

## 1. Hosting Options at a Glance

### Option A: Vercel (Recommended Option)
* **What it is:** The cloud hosting platform built by the creators of Next.js.
* **Why it is the best:** It offers zero-configuration deployment. It hooks directly to your code repository, automatically builds the site, and deploys it globally on their edge network.
* **Cost:** Free tier for standard usage, $20/month for pro teams.

### Option B: Cloudflare Pages
* **What it is:** A global security and web routing network.
* **Why use it:** Extremely fast static page rendering and top-tier DDoS security. It requires minor adjustments to Next.js configurations to run on Cloudflare's serverless runtime.
* **Cost:** Excellent free tier.

### Option C: AWS (Amazon Web Services)
* **What it is:** The industry standard cloud platform for enterprise databases and computing.
* **Why use it:** Best if the firm requires all data to sit inside an existing enterprise AWS cloud structure. Requires setup using AWS Amplify or Docker containers.
* **Cost:** Pay-as-you-go.

### Option D: DigitalOcean
* **What it is:** A developer-friendly hosting service.
* **Why use it:** Good for running dedicated virtual private servers (Droplets) with custom Docker environments.
* **Cost:** Starts at $5/month.

---

## 2. Recommended Hosting: Vercel Step-by-Step

We recommend deploying to **Vercel** because it requires zero server configuration and delivers the fastest loading speeds for Next.js out-of-the-box.

### Step 1: Connect your Code Repository
1. Push the website code to a private Git repository (e.g. GitHub, GitLab, or Bitbucket).
2. Log into [Vercel](https://vercel.com) using your Git account credentials.

### Step 2: Import the Project
1. Click **Add New** in the Vercel Dashboard, then select **Project**.
2. Locate the repository named `lawgical-group-website` and click **Import**.

### Step 3: Configure Settings
1. Vercel automatically detects Next.js. Leave the **Build and Output Settings** at their default values:
   * **Framework Preset:** Next.js
   * **Build Command:** `next build`
   * **Output Directory:** `.next`
2. Click **Deploy**. Vercel will build the site, compile all static assets, and assign a temporary domain (e.g. `lawgical-redesign.vercel.app`) in under 2 minutes.

---

## 3. Domain & Security Setup (SSL & CDN)

To connect the redesigned website to the official domain (e.g. `lawgicalgroup.com`):

### Step 1: Add Domain in Vercel
1. Go to the project page in Vercel, select **Settings**, then click **Domains**.
2. Type in your domain (e.g., `lawgicalgroup.com`) and click **Add**.

### Step 2: Update DNS Records
1. Log into your domain registrar (e.g., GoDaddy, Namecheap, or Cloudflare DNS manager).
2. Add the following records:
   * **A Record:** Points `@` (root domain) to Vercel's IP: `76.76.21.21`
   * **CNAME Record:** Points `www` to `cname.vercel-dns.com`

### Step 3: SSL Validation
* Once the DNS records update (usually within 15 minutes), Vercel automatically generates a **Let's Encrypt SSL security certificate** and applies it to the domain. This ensures the website displays the secure lock icon (`https://`) in all browsers.

---

## 4. Analytics, Monitoring, and Backups

### Analytics Setup
* We use **Vercel Web Analytics** or **Google Analytics 4 (GA4)**. 
* Add the GA4 tracking ID (e.g. `G-XXXXXXXXXX`) as an environment variable in your project settings, and the site will automatically measure page views, contact form submissions, and video plays.

### Performance Monitoring
* Vercel monitors **Core Web Vitals** (Speed Index, Largest Contentful Paint) in real-time, sending automated notifications if page response times drop.

### Backup Strategy
* The code is version-controlled in Git, serving as an active backup. If a bad update occurs, you can roll back to a previous deploy state in one click inside the Vercel dashboard.

---

## 5. Content Update Workflow

When the firm needs to add a new partner profile or publish a legal brief:
1. Open the file [lib/content.ts](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/lib/content.ts).
2. Add the text details directly into the `TEAM` or `ARTICLES` lists.
3. Commit and push the changes to the Git repository.
4. Vercel detects the update, recompiles the site, and updates the live page in 30 seconds with **zero downtime**.
