export default function createCustomPatchView(patchConnection) {
  const iframe = document.createElement('iframe');
  iframe.src = './index.html';
  window['patchConnection'] = patchConnection;

  iframe.setAttribute('style', 'width:100vw !important; height:100vh; border: none;');
  return iframe;
}
