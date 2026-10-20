# Project Beyond — Interactive Video Prototype

A mobile-first bilingual (Bangla/English) prototype for a branching interactive-video platform.

## What works in this prototype
- Interactive branching story with two different endings.
- Viewer choice buttons and back/restart navigation.
- Story path map, discover page, prototype Creator Studio page, profile/settings page.
- Bangla/English interface toggle.
- Responsive dark UI designed for mobile and desktop.

## What is not connected yet
- This prototype uses story data in the app, not real video clips.
- No accounts, online upload, backend, comments, likes, or cloud storage yet.
- Creator Studio is a preview, not a persistent editor.
- No Android APK has been built or tested from this source yet.

## Run locally
Requires Node.js 20+.
```bash
npm install
npm run dev
```
Open the local URL shown by Vite.

## Production build
```bash
npm run build
```
The build output is created in `dist/`.

## Roadmap
1. Validate interactive-story demo.
2. Add a real video player and scene assets.
3. Build a branching Creator Studio editor.
4. Wrap the app for Android and set up APK builds in GitHub Actions.
5. Add a secure backend, accounts, uploads, feeds, follows, comments, search, notifications, reporting, and moderation.

A free prototype is realistic; a large video platform will eventually need storage, bandwidth, moderation, and backend funding.
