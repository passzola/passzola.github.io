function changeFont() {
    const textarea = document.getElementById("txtarea");

    let size = parseInt(window.getComputedStyle(textarea, null).getPropertyValue('font-size'));
    size += 2;
    textarea.style.fontSize = size + 'px';
}

function decoreText() {
    const bling = document.getElementById("blingId");
    const textarea = document.getElementById("txtarea");


    if (bling.checked) {
        textarea.style.fontWeight = "bold";
        textarea.style.color = 'green';
        textarea.style.textDecoration = 'underline';
    } else {
        textarea.style.fontWeight = 'normal';
        textarea.style.color = 'black';
        textarea.style.textDecoration = 'none'
    }

    document.body.style.backgroundImage = "url('./assets/header-bg.png')";

}