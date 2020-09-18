var firebaseConfig = {
    apiKey: "AIzaSyCNCLNf_eHvAOxkQp4y5I2UW5H31SMAi3Q",
    authDomain: "gtacitymods.firebaseapp.com",
    databaseURL: "https://gtacitymods.firebaseio.com",
    projectId: "gtacitymods",
    storageBucket: "gtacitymods.appspot.com",
    messagingSenderId: "262395675013",
    appId: "1:262395675013:web:44f281bde43448fc3404ec"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  let Vehicles = []
  function renderVehicles(){
      const box = document.getElementById("car_fulldisplay")
    for (doc of Vehicles){
          const imgcar = document.getElementById("principal_image")
          const img = document.createElement("img")
          img.src=doc.image
          const title = document.getElementById("infocar")
          const titletext = document.createElement("h2")
          titletext.innerHTML=doc.title
          const motor = document.createElement("h3")
          var cilynder = doc.cilindrada * 1000
          motor.innerHTML= cilynder + `cc`
          const km_rodados = document.createElement("h3")
          km_rodados.innerHTML=doc.km_rodados + ` km`
          const transmission = document.createElement("h3")
          transmission.innerHTML=doc.transmissao
          const car_class = document.createElement("h3")
          car_class.innerHTML=doc.car_class
          const ano = document.createElement("h3")
          ano.innerHTML=doc.year
          

          const description = document.getElementById("description")
          description.innerHTML=doc.description
        
        imgcar.appendChild(img)
        title.appendChild(titletext)
        title.appendChild(motor)
        title.appendChild(km_rodados)
        title.appendChild(transmission)
        title.appendChild(car_class)
        title.appendChild(ano)
      }
  }

async function readVehicles() {
    Vehicles = []
    var url = window.location.href;
    const url_id = url.substring(48, 100)
    console.log(url_id)
    const logVehicles = await db.collection("vehicles").where(firebase.firestore.FieldPath.documentId(), '==', url_id).get()
    for (doc of logVehicles.docs) {
    Vehicles.push({
        id: doc.id,
        date: doc.data().date,
        title: doc.data().title,
        description: doc.data().description,
        brand: doc.data().brand,
        car_name: doc.data().car_name,
        author: doc.data().author,
        image: doc.data().image,
        price: doc.data().price,
        year: doc.data().year,
        km_rodados: doc.data(). km_rodados,
        versao_carro: doc.data(). versao_carro,
        cilindrada: doc.data().cilindrada,
        transmissao: doc.data(). transmissao,
        car_class: doc.data(). car_class,
        })
    }
    renderVehicles()
}
readVehicles()
