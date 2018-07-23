const $ = window.jQuery;

export default function(el, binding) {
    if(!binding.value) return;
    $(el).tooltip({
        title: binding.value,
        placement: binding.arg,
        trigger: 'hover',
    });
}