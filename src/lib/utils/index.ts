export function scrollToElement(id: string, offset = 0) {
    let el = document.getElementById(id);
    let top = findPos(el) - offset;

    window.scrollTo({
        left: 0,
        top: top,
        behavior: "smooth"
    });
};

function findPos(obj: any) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return curtop;
    }
    return curtop;
}