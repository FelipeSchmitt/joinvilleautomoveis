
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
    const vehicle_content = document.getElementById("vehicles")
   vehicle_content.innerHTML=""
    for (doc of Vehicles){
        const box = document.createElement("div")
        box.id="card"
        box.onclick = function(){
          var url = window.location.href;
          url = "https://felipeschmitt.github.io/joinvilleautomoveis/vehicle_fulldisplay.html#?" + doc.id
          window.open(url)
          if(url.indexOf("#?")){
            url
          }
        }
        box.style.width="95%"
        box.style.margin="auto"
        box.style.height="98%"
        box.style.marginTop="40px"
        box.style.borderRadius="7px"
        box.style.backgroundColor="rgb(211, 209, 209)"
        const title = document.createElement("h3")
        title.innerHTML=doc.title
        title.style.textAlign="center"
        title.style.backgroundColor="#343a40"
        title.style.color="white"
        title.style.borderRadius="20px"
        title.style.margin="auto"
        title.style.marginTop="10px"
        title.style.marginBottom="10px"
        title.style.width="95%"
        const image = document.createElement("img")
        image.src=doc.image
        image.style.width="90%"
        image.style.borderRadius="4px"
        image.style.borderBottomLeftRadius="0"
        image.style.borderBottomRightRadius="0"
        image.style.display="block"
        image.style.margin="auto"
        const price = document.createElement("h4")
        price.innerHTML="R$" + doc.price
        price.style.backgroundColor="#343a40"
        price.style.color="white"
        price.style.borderRadius="7px"
        price.style.borderTopLeftRadius="0"
        price.style.borderTopRightRadius="0"
        price.style.textAlign="center"
        price.style.lineHeight="40px"
        price.style.height="40px"
        price.style.margin="auto"
        price.style.width="90%"
        const itensdiv = document.createElement("div")
        itensdiv.id="km"
        const versao_carro = document.createElement("div")
        versao_carro.id="modelo"
        const boxitem = document.createElement("div")
        boxitem.id="itens"
        const km_rodados = document.createElement("img")
        km_rodados.src="km_icon.png"
        km_rodados.style.width="30px"
        km_rodados.style.borderRadius="50em"

        itensdiv.appendChild(km_rodados)
        const h5 = document.createElement("h5")
        h5.innerHTML=doc.km_rodados + ` km`
        const h5_versao = document.createElement("h5")
        h5_versao.style.textAlign="center"
        h5_versao.innerHTML=doc.versao_carro
        h5.style.paddingLeft="5px"

        const cilindradadiv = document.createElement("div")
        const cilindrada = document.createElement("img")
        cilindrada.src="https://icon-library.com/images/motor-icon/motor-icon-7.jpg"
        cilindrada.style.width="30px"
        cilindradadiv.style.display="flex"
        cilindradadiv.appendChild(cilindrada)
        const h5_cilindrada = document.createElement("h5")
        h5_cilindrada.innerHTML=doc.cilindrada
        cilindradadiv.appendChild(h5_cilindrada)
        
        const transmissaodiv = document.createElement("div")
        const transmissao = document.createElement("img")
        transmissao.src="https://static.thenounproject.com/png/363283-200.png"
        transmissaodiv.style.display="flex"
        transmissao.style.width="30px"
        transmissaodiv.appendChild(transmissao)
        const h5_transmissao = document.createElement("h5")
        h5_transmissao.innerHTML=doc.transmissao
        transmissaodiv.appendChild(h5_transmissao) 
        transmissaodiv.style.marginTop="8px"

        const description = document.createElement("p")
        description.innerHTML=doc.description
        description.style.width="90%"
        description.style.margin="auto"
        description.style.backgroundColor="white"
        description.style.borderRadius="7px"
        box.appendChild(title)
        box.appendChild(image)
        box.appendChild(price)
        box.appendChild(boxitem)
        boxitem.appendChild(itensdiv)
        itensdiv.appendChild(h5)
        boxitem.appendChild(versao_carro)
        versao_carro.appendChild(h5_versao)
        boxitem.appendChild(cilindradadiv)
        boxitem.appendChild(transmissaodiv)
        box.appendChild(description)
        vehicle_content.appendChild(box)

      }
  }

async function readVehicles() {
    Vehicles = []
    const brand1 = document.getElementById("brand").value
    const car_name1 = document.getElementById("car_name").value
    const year1 = document.getElementById("year1").value
    const year2 = document.getElementById("year2").value
    var filter_use = ""
    var sequency = ""
    if(year1 != "" && year2 != ""){
      readVehicles_2_sentences()
    }else
    if (car_name1 != ""){
      filter_use = "car_name"
      sequency = car_name1
    }else{
      if(brand1 != ""){
        filter_use = "brand"
        sequency = brand1
    }else{
      if(brand1 == ""){
        readVehiclesAll()
      }
    }
    }
    const logVehicles = await db.collection("vehicles").where(filter_use, "==", sequency).get()
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
        download_link: doc.data().download_link,
        })
    }
    renderVehicles()
}
  async function readVehicles_2_sentences(){
    var sequency = document.getElementById("car_name").value
    var yearold = document.getElementById("year1").value
    var yearnew = document.getElementById("year2").value
    const logVehicles2 = await db.collection("vehicles").where("year", ">=", yearold).get()
    for (doc of logVehicles2.docs) {
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
        km_rodados: doc.data().km_rodados,
        versao_carro: doc.data(). versao_carro,
        cilindrada: doc.data().cilindrada,
        transmissao: doc.data(). transmissao,
        download_link: doc.data().download_link,
        })
    }
    renderVehicles()
  }

  async function readVehiclesAll(){
    const logVehicles3 = await db.collection("vehicles").get()
    for (doc of logVehicles3.docs) {
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
        km_rodados: doc.data().km_rodados,
        versao_carro: doc.data(). versao_carro,
        cilindrada: doc.data().cilindrada,
        transmissao: doc.data(). transmissao,
        download_link: doc.data().download_link,
        })
    }
    renderVehicles()
  }


  function url(){
    const vehicle_content = document.getElementById("vehicles")
    vehicle_content.innerHTML=""
    for (doc of Vehicles){
    var url = window.location.href;
    url += + `/` + doc.id
    }
  }

  function ID(){
    w
  }
