const size = document.querySelector(".btn")
size.addEventListener('click', () => {
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  alert(`Ширина вашего экрана ${window.innerWidth}
Высота вашего экрана ${window.innerHeight}`)
         });