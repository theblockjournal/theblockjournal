export default async function() {
    return new Promise((resolve, reject) => {
        let i = document.createElement('input');
        i.type = 'file';
        i.onchange = function() {
            let fr = new window.FileReader();
            fr.onload = function(e) {
                resolve(JSON.parse(e.target.result));
            };
            fr.readAsText(i.files.item(0));
        };
        let e = document.createEvent('MouseEvents');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        i.dispatchEvent(e);
    });
}