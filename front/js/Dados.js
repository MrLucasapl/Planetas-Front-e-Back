let originalData;

fetch('http://localhost:4002/html/planetas?').then(resposta => resposta.json()).then(body => {
  originalData = body.data;
  init()
})
