
/*!
    respect to PatrickJS
*/

// create new application elements and remove the old elements
let input: any;
let startTimer: number = 0;
export function createNewApplication(componentsList: any) {
    let rawComponentsList = componentsList.map(function (componentNode: any) {

        const newNode = document.createElement(componentNode.tagName);
        const parentNode = componentNode.parentNode;
        const currentDisplay = newNode.style.display;
        input = getInputValues(parentNode);

        newNode.style.display = 'none';
        parentNode.insertBefore(newNode, componentNode);

        function removeOldHost() {
            newNode.style.display = currentDisplay;
            try {
                parentNode.removeChild(componentNode);
            } catch (e) { }
            setTimeout(() => {
                setInputValues(newNode, input);
            }, 0);
        }

        return removeOldHost;
    });
    return function removeOldHosts() {
        clearTimer();
        rawComponentsList.forEach((removeOldHost: any) => removeOldHost());
    };
}

// remove timer
function clearTimer() {
    const timer = window.setTimeout(() => { }, 0);
    for (let i = startTimer; i <= timer; i++) clearTimeout(i);
    startTimer = timer;
}

// get input values
function getInputValues(htmlNode: HTMLElement) {
    const inputsNode = htmlNode.querySelectorAll('input');
    const inputsArr = Array.prototype.slice.call(inputsNode);
    return inputsArr.map((input: any) => input.value);
}

// set input values
function setInputValues(newNode: HTMLElement, _inputs: any) {
    const inputs = newNode.querySelectorAll('input');
    if (_inputs && inputs.length === _inputs.length) {
        _inputs.forEach((value: any, i: number) => {
            const el: any = inputs[i];
            el.value = value;
            el.dispatchEvent(new CustomEvent('input', { detail: el.value }));
        });
        // clear array
        _inputs.length = 0;
        input.length = 0;
    }
}