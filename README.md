# Hado Afaqu Memories

A private 3D memory library. Street, gate, reception, dated doors, rooms full of photos.

Controls: WASD / arrows (phone: on-screen stick) to walk. Drag to look around 360°, scroll or pinch to zoom, `C` recenters. `E` (phone: tap the button) to open doors, frames and the reception computer.

## How it works

- **Login (server side).** `public/index.html` is the login page. `api/login.js` checks the username (`afaqu` or `hado`) and the password stored in an environment variable, then sets a signed, HttpOnly cookie. The 3D app (`private/app.html`) is only ever sent by `api/app.js` when that cookie is valid. The password is never in the page code.
- **Saved photos.** Photos, captions and dates are saved in your browser (IndexedDB) automatically. Photos are shrunk to max 1600px to save space. No database needed.

## Run on localhost

1. Install Node.js 18 or newer from https://nodejs.org
2. In this folder run: `npm start`
3. Open http://localhost:3000 and sign in.

The `.env` file in this folder holds your local password and a secret. It is ignored by git, so it will not be uploaded.
To test on a phone on the same Wi-Fi, open `http://YOUR-COMPUTER-IP:3000`.

## Put it on GitHub

1. On github.com click **New repository**, name it `hado-afaqu-memories`, choose **Private**, leave it empty.
2. In this folder run:

        git init
        git add .
        git commit -m "Our memory library"
        git branch -M main
        git remote add origin https://github.com/YOUR-USERNAME/hado-afaqu-memories.git
        git push -u origin main

Check that `.env` is not in the repository (it should not be, `.gitignore` excludes it).

## Deploy on Vercel

1. Sign in at https://vercel.com with GitHub. Click **Add New → Project → Import** your repo.
2. Before pressing Deploy open **Environment Variables** and add two:
   - `APP_PASSWORD` = the password you want
   - `SESSION_SECRET` = a long random string. Make one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. Click **Deploy**. If you add the variables later, go to Deployments → Redeploy so they take effect.
4. Open your `.vercel.app` link on your phone and computer and sign in.

To change the password later: edit `APP_PASSWORD` in Vercel, then Redeploy. Everyone is signed out when you change `SESSION_SECRET`.

## Will my photos survive updates?

Yes. Pushing new code to GitHub redeploys the site, but your photos live in your browser, not in the code, so they stay.
Keep in mind:

- They are saved per device and per browser. Hado's phone and Afaqu's phone each keep their own photos.
- Private/incognito windows, "clear site data", or changing the website address (for example a new domain) removes them.
- Use the **Backup** button now and then. It downloads one file with everything. **Restore** loads it back, even on a different phone or after switching address.
