// make animation selection to diplay the value for the selecte box
let defaultSpeed = 250;
let text = "";
let animReference;
let temp = 0;
let frames;

window.onload = function () {
    // disable stop button => 
    document.getElementById("stopAnim").disabled = true;

    // when start button clicked
    let start = document.getElementById("startAnim");
    start.onchange = startAnim;

    // when stop button clicked
    let stop = document.getElementById("stopAnim");
    stop.onclick = stopAnimation;

    //when animation change
    let anim = document.getElementById("animationType");
    anim.onchange = changeAnimation;
    anim.disabled = false;

    // when speed changed
    let speed = document.getElementById("speed");
    speed.onchange = speedChange;
}

function startAnim() {
    // starting animation
    let animationType = document.getElementById("animationType");
    let content = ANIMATIONS[animationType.value];
    let textBox = document.getElementById("animationBox");

    text = textBox.value;

    frames = content.split("=====\n");

    document.getElementById("startAnim").disabled = true;
    document.getElementById("stopAnim").disabled = false;
    animationType.disabled = true;
    animReference = setInterval(animateFrame, defaultSpeed, frames); // need modificaiton because it is not supported in IE9 and erlier versions
}

function animateFrame(input) {
    let animationBox = document.getElementById("animationBox");
    animationBox.value = frames[(temp % input.length)];
    temp++;
}

function speedChange() {
    const speed = document.getElementById("speed").checked;

    if (speed) {
        defaultSpeed = 50;
        clearInterval(animReference);
        animReference = setInterval(animateFrame, defaultSpeed, frames);
    } else {
        defaultSpeed = 250;
        clearInterval(animReference);
        animReference = setInterval(animateFrame, defaultSpeed, frames);
    }
}

function stopAnimation() {
    let animationBox = document.getElementById("animationBox");
    animationBox.value = text;

    text = '';
    clearInterval(animReference);
    temp = 0;
    document.getElementById("startAnim").disabled = false;
    document.getElementById("stopAnim").disabled = true;
    document.getElementById("animationType").disabled = false;

}

function changeAnimation() {
    let animType = document.getElementById("animationType").value;
    if (animType === "Blank") {
        console.log("set the text area empty value");
    } else {
        document.getElementById("animationBox").innerHTML =
            ANIMATIONS[animType];
    }
}

function changeFont() {
    const selectedFontSize = document.getElementById("fontSizeType").value;
    document.getElementById("animationBox").style.fontSize = selectedFontSize;
}
