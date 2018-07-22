export default function(object, filename) {
    if(typeof object == 'object') object = JSON.stringify(object);
    
    let blob = new window.Blob([object], {type: 'text/json'});
    let blobURL = window.URL.createObjectURL(blob);
    
    let a = document.createElement('a');
    a.download = filename;
    a.href = blobURL;
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
    
    let e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    
    a.dispatchEvent(e);
}