var Error = document.querySelector('#error')
var clouds = document.querySelector('#clouds')
var temp = document.querySelector('#temp')
var img = document.querySelector('img')
const Search = document.querySelector('form')
Search.addEventListener('submit', (e) => {
  e.preventDefault();
  Error.textContent = ""
  temp.textContent = ""
  clouds.textContent = ""
  img.src = "";
  error.textContent = 'Loading...'
  const Location = document.querySelector('input').value
  document.querySelector('input').value="";
  document.querySelector('input').focus();
  fetch("/weather?address=" + Location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        Error.textContent = data.error
        console.log(data.error);
      } else {
        Error.textContent = 'Location: ' + data.location
        temp.textContent = 'Temperature: ' + data.temp + '  °C'
        clouds.textContent = 'Weather Description:  ' + data.desc
        img.src = "https://openweathermap.org/img/wn/" + data.visual + "@2x.png"
      }
    })
  })
})
