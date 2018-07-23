export default function (object, filename) {
  if (typeof object === 'object') object = JSON.stringify(object);

  const blob = new window.Blob([object], { type: 'text/json' });

  const a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');

  const e = document.createEvent('MouseEvents');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

  a.dispatchEvent(e);
}
