
// const getStart = () => {
//     setInterval(getStart, 1000);

//     const time = new Date();
//     console.log(time.toLocaleString());
//     console.log(time.toLocaleDateString());
//     const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
//     const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
//     const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
//     document.querySelector('div .time p').textContent =  `${seconds}`+`${minutes}`+`${hours}`
// }
// const start = document.querySelector('button.main');
// start.addEventListener('click', getStart());
// const getReset = () => {
//     setInterval(getReset, 1000);

//     const time = new Date();
//     console.log(time.toLocaleString());
//     console.log(time.toLocaleDateString());
//     const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
//     const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
//     const hours = time.getHours() < 10 ? "0" + time.getHours() : timegetHours();
//     document.querySelector('div .time p').textContent = `${seconds}`+`${minutes}`+`${hours}`
// }

// const reset = document.querySelector('button.reset');

// reset.addEventListener('click', getReset());



const btnTime = document.querySelector('.main');
const btnReset = document.querySelector('.reset');
const panel = document.querySelector('.time div');
let time = 0;
let active = false;
let idI;

const start = () => {
    time++;
    panel.textContent = (time / 100).toFixed(2);
    console.log(time / 100);
}
const reset = () => {
    time = 0;
    panel.textContent = '---';
    active = !active;
    btnTime.textContent = 'Start';
    clearInterval(idI);
}
const timer = () => {
    if (!active) {
        active = !active
        btnTime.textContent = 'Pauza';
        idI = setInterval(start, 10);
    } else {
        active = !active
        btnTime.textContent = 'Start'
        clearInterval(idI)
    }
}

btnTime.addEventListener('click', timer);
btnReset.addEventListener('click', reset);


