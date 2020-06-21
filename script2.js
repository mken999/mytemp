const myfile = document.getElementById('myfile');
const label = document.getElementById('label');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//houkou
// const tmURL = "https://teachablemachine.withgoogle.com/models/Yed2--jiC/";

//jyannken
// const tmURL = "https://teachablemachine.withgoogle.com/models/2zquFkt5K/";

//
const tmURL = "https://teachablemachine.withgoogle.com/models/LMyUlKDsE/";

let model;

const startEvent = async () => {
  model = await tmImage.load(tmURL+'model.json', tmURL+'metadata.json');
  const img = new Image();
  const zoom = 0.05;
  img.src = window.URL.createObjectURL(myfile.files[0]);
  img.onload = async () => {
    canvas.width = img.width*zoom;
    canvas.height = img.height*zoom;
    ctx.drawImage(img,0,0,img.width*zoom,img.height*zoom);
    // ctx.drawImage(img, 0, 0);
    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0,0,300,300);
    await predict(canvas);
  }

  // loop();
}

const predict = async image => {
  console.log('predict');
  const prediction = await model.predict(image);

  for (let i = 0; i < model.getTotalClasses(); i++) {
    const name = prediction[i].className;
    const value = prediction[i].probability.toFixed(2);

    if(value > 0.85) label.textContent = `${name}: ${value}%`;


  }
}

const loop = async () => {
  await predict();

  window.requestAnimationFrame(loop);
}


myfile.addEventListener('change', startEvent);
