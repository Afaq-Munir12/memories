# Hado Afaqu Memories

A private 3D memory library. Street, gate, reception, dated doors, rooms full of photos.

Controls: WASD / arrows (phone: on-screen stick) to walk. Drag to look around 360°, scroll or pinch to zoom, `C` recenters. `E` (phone: tap the button) to open doors, frames and the reception computer.

## How it works

- **Login (server side).** `public/index.html` is the login page. `api/login.js` checks the username (`afaqu` or `hado`) and the password stored in an environment variable, then sets a signed, HttpOnly cookie. The 3D app (`private/app.html`) is only ever sent by `api/app.js` when that cookie is valid. The password is never in the page code.
- **Saved photos.** Photos, captions and dates are saved in your browser (IndexedDB) automatically. Photos are shrunk to max 1600px to save space. No database needed.

## Play on a phone like a game

Websites cannot force fullscreen or landscape the moment a link opens (phones block that). These steps give you the next best thing:

- **Android (Chrome):** open your link, tap the menu (three dots), choose **Install app** or **Add to Home screen**. Open it from the new "Our Memories" icon: it starts fullscreen and landscape, with no browser bars.
- **iPhone (Safari):** open your link, tap Share, then **Add to Home Screen**. Open it from the icon for a full-screen view. iPhones cannot lock the screen sideways, so turn off Portrait Orientation Lock and rotate the phone.
- **Without installing:** tapping **Step inside** goes fullscreen and locks landscape on Android. If the phone is upright you will see a "turn your phone sideways" screen. The **Fullscreen** button in the top bar toggles it anytime.

## Playing together from two devices

Open the site on two devices at the same time. One person signs in as `afaqu` (male character), the other as `hado` (female character). Each of you controls your own character and you see each other walking around, going into rooms (you only see each other when you are in the same place) and using the playground together. A small badge in the top bar shows "Hado is online" or "Waiting for ...".

- If only one of you is signed in, that person controls both characters (use **Switch partner**), and the partner character joins in on the playground by itself.
- The two devices talk directly to each other using PeerJS (free, no account, no database). Only people who are signed in get the secret pairing code, which is generated from `SESSION_SECRET`.
- It needs both devices online at the same time. On rare strict networks (some mobile carriers or office Wi-Fi) the direct link can fail; try Wi-Fi on both devices.
- To test on one computer, sign in as `afaqu` in one browser and as `hado` in a different browser or a private window. Two tabs in the same browser share one login, so they will not work for this test.
- Photos and dates are still stored per device, so each of you sees your own saved photos. Use Backup and Restore to share them.

## Chat, emotes, garden and hugs

- **Chat:** click **Chat** (or press `Enter`), type and send. Your partner sees it in a small log and in a bubble above your head. Chat is never saved anywhere: it only exists while the page is open, and **Clear** wipes the log.
- **Emotes:** click **Emotes** or press `1` Dance, `2` Wave, `3` Heart, `4` Hug. Dance and Hug make your partner join in. For a hug, walk close to each other first, then both walk together and hug. Moving cancels an emote.
- **Love Garden (right side of the street, opposite the park):** six flower beds (red roses, pink tulips, sunflowers, lavender, daisies, lilies). Press `E` at a bed to pick a flower; it appears in your hand. Walk up to your partner and press `E` again to give it to them. Anyone can pick and give flowers.

## Modern home, automatic gate and livelier characters

- **Modern house:** flat roofs, a cantilevered dark upper floor with a ribbon of glass, floor-to-ceiling glass bays, a wood-slat feature wall, a pivot front door, LED strips, black planters and slim trees. The garage matches. Inside: wood floors, white walls, linear LED ceiling lights, slim black columns, cream and charcoal sofas, black-framed glass and stone-tile pool and bathroom.
- **Automatic gate (sliding, on wheels):** the Our Home gate opens by itself when you or the car get close, from either side, and closes again about a second and a half after everyone has moved away. The status light on the posts is red when closed, amber while moving and green when open. The gate is solid while it is closed.
- **Characters:** jointed knees and elbows, a forward lean and hip sway when walking, gentle breathing, blinking, a smile, heads that turn to look at each other, smooth acceleration and turning, and knees that bend when sitting.

## Amour restaurant and the car

- **Amour (restaurant):** on the right side of the street, near where you start, with a striped awning, glass windows, fairy lights and a glowing sign. Press `E` at the door. Inside: six candlelit tables for two (sit together), a bar, a host stand (ask for the menu), a dance floor with a mirror ball, a stage with a grand piano, a jukebox, paintings, glass windows and a waiter who walks between the tables. Use the piano or jukebox spot (`E`) to start soft romantic music (and `E` again to stop it). Dance together on the dance floor with the Dance emote.
- **Garage and car:** next to the mansion (right side) is a garage with a red open-top car. Press `E` next to the car and you both get in; the person who gets in first drives. Drive with `W`/`A`/`S`/`D` or the arrow keys (on a phone: the stick), `H` to honk, and `E` to get out. The car drives on the street, through the gate and fountain forecourt, along the driveway and into the garage. On two devices the passenger sees the same car moving.

## Ferris wheel, benches and our mansion

- **Love Wheel (in the park, at the far end):** a huge lit-up Ferris wheel. Stand on its platform and press `E` to ride together in one cabin. Each ride is one full turn and you get off at the bottom (press `E` or move to leave early; you step off when the cabin comes back down).
- **Benches:** press `E` near any bench to sit together. There are benches around the park plaza, near the wheel, along the street and around the garden gazebo. Walk or press `E` again to get up.
- **Our Home (end of the street):** past the park and garden, behind the "Welcome Home" gate and a fountain, stands a glass-fronted mansion: glass front doors, glass windows with gold frames, huge glass curtain walls on both wings and a glass roof lantern. Press `E` at the front door. Inside: a living room with a fireplace, marble columns, paintings, two sofas and a piano; a dining table and a canopy bed you can sit at together; then through an archway a **swimming pool hall** with a glass roof and floor-to-ceiling glass walls, poolside daybeds (sit together) and a pool you can walk into and swim in (or press `E` at the edge to jump in together); and finally a marble **bathroom** with a freestanding tub (take a bath together), a glass shower (press `E` to turn the rain on and off), a double vanity with mirrors and a toilet. The door at the back of the entrance hall takes you outside again.
- Tip: the street starts facing the library. Drag to turn the camera around (or use the arrow keys / `S`) to head down the street towards the park, the garden and the mansion.

## The park

Walk past the shops to the "Love Park" gate on the left side of the street (about halfway down). Inside you will find a swing set, a slide, a seesaw and a merry-go-round, with trees, benches, lamps and flowers. Stand near one and press `E` (phone: tap the button). On the swing, seesaw and merry-go-round both characters get on together. Press `E` again or move to get off.

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
