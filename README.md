# Cmajor + Angular

![cmajorpatch screenshot](screenshot.png)

Proof of concept [cmajor] gain fx patch with [angular] gui.

To test the patch simply run `npm install` and `npm run build` and afterwards drag the .cmajorpatch from
the dist directory to the cmaj-plugin within your daw.

For development use `npm run watch` to rebuild the patch on change.
With the current solution you still have to manually refresh the webview within the plugin to update the gui.

Alternatively run `npm start` to simply open the gui in a browser (no patch connection provided).

Setup: Angular 15 with standalone components, jest, eslint, prettier, husky + lintstaged
Tested with Cmajor Version: 0.9.1967 running the cmaj-plugin in Bitwig v4.3 on Windows 10.

#### Known issues / future improvements

- patch run in vscode does not display any gui (probably caused by the iframe, loading the patch via cmajor plugin in a
  daw works)
- the pointer lock api causes a notification within the webview to use the ESC button
- when loading a patch the default values don't seem to be reflected inside the host (this also happens with other
  example patches without custom gui)

#### 🔊 [Spotify] / [Apple Music] / [Bandcamp] / [Soundcloud]

[cmajor]: https://github.com/SoundStacks/cmajor
[angular]: https://angular.io/
[Spotify]: https://open.spotify.com/artist/2jOQrKX3rRoZORPfFcXaYU
[Apple Music]: https://music.apple.com/us/artist/loowps/1326334750
[Bandcamp]: https://loowps.bandcamp.com
[Soundcloud]: https://soundcloud.com/loowps
