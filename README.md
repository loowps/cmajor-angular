# Cmajor + Angular

![cmajorpatch screenshot](screenshot.png)

Proof of concept [cmajor] gain fx patch with [angular] gui built to a single web component.

To test the patch simply run `npm install` and `npm run build`. Afterward drag the .cmajorpatch from
the dist directory to the cmaj-plugin within your daw or play the patch via the cmaj command line tool.

For development use `npm start` to rebuild the patch on change.

Setup: Angular 17 and [angular-elements], jest, eslint, prettier, husky + lintstaged
Tested with Cmajor Version: 0.9.2233 running the cmaj-plugin in Bitwig v5.0.11 on Windows 10.

#### Known issues / future improvements

- currently running the patch via the vscode extension does not seem to work
- the pointer lock api causes a notification within the webview to use the ESC button
- when loading a patch the default values don't seem to be reflected inside the host

#### 🔊 [Spotify] / [Apple Music] / [Bandcamp] / [Soundcloud]

[cmajor]: https://github.com/SoundStacks/cmajor
[angular]: https://angular.io/
[angular-elements]: https://angular.io/guide/elements
[esbuild]: https://esbuild.github.io/
[Spotify]: https://open.spotify.com/artist/2jOQrKX3rRoZORPfFcXaYU
[Apple Music]: https://music.apple.com/us/artist/loowps/1326334750
[Bandcamp]: https://loowps.bandcamp.com
[Soundcloud]: https://soundcloud.com/loowps
