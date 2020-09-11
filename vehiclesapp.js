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
        image.style.display="block"
        image.style.margin="auto"
        const description = document.createElement("p")
        description.innerHTML=doc.description
        description.style.width="90%"
        description.style.margin="auto"
        box.appendChild(title)
        box.appendChild(image)
        box.appendChild(description)
        vehicle_content.appendChild(box)

      }
  }

async function readVehicles() {
    Vehicles = []
    const logVehicles = await db.collection("vehicles").get()
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
        download_link: doc.data().download_link,
        })
    }
    renderVehicles()
}
readVehicles()