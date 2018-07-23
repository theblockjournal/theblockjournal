export default async function () {
  return new Promise((resolve, reject) => {
    const i = document.createElement('input');
    const e = document.createEvent('MouseEvents');
    i.type = 'file';
    i.onchange = () => {
      const fr = new window.FileReader();
      fr.onload = (event) => resolve(JSON.parse(event.target.result));
      fr.readAsText(i.files.item(0));
    };
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    i.dispatchEvent(e);
  });
}
