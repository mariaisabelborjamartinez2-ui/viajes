// =====================================
// RUMBO AVENTURA - JAVASCRIPT
// =====================================

// DESTINOS TURÍSTICOS
// Precios estimados por persona en pesos colombianos.

const destinations = [

  {
    id: 1,
    name: "Cartagena",
    country: "Colombia",
    continent: "América",
    duration: "4 días / 3 noches",
    price: 850000,
    hotelNight: 120000,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85",
    description: "Descubre la magia del Caribe colombiano, sus calles coloridas, murallas históricas, playas y atardeceres inolvidables."
  },

  {
    id: 2,
    name: "San Andrés",
    country: "Colombia",
    continent: "América",
    duration: "5 días / 4 noches",
    price: 1250000,
    hotelNight: 150000,
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85",
    description: "Disfruta del mar de siete colores, playas de arena blanca y actividades acuáticas en un paraíso del Caribe."
  },

  {
    id: 3,
    name: "Medellín",
    country: "Colombia",
    continent: "América",
    duration: "3 días / 2 noches",
    price: 620000,
    hotelNight: 100000,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=85",
    description: "Vive una ciudad innovadora, llena de cultura, gastronomía, arte urbano y paisajes de montaña."
  },

  {
    id: 4,
    name: "París",
    country: "Francia",
    continent: "Europa",
    duration: "7 días / 6 noches",
    price: 4200000,
    hotelNight: 350000,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    description: "Enamórate de la Ciudad de la Luz, sus monumentos, museos, cafés y rincones llenos de encanto."
  },

  {
    id: 5,
    name: "Roma",
    country: "Italia",
    continent: "Europa",
    duration: "6 días / 5 noches",
    price: 3900000,
    hotelNight: 320000,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=85",
    description: "Recorre siglos de historia entre plazas, fuentes, arquitectura monumental y la mejor gastronomía italiana."
  },

  {
    id: 6,
    name: "Santorini",
    country: "Grecia",
    continent: "Europa",
    duration: "6 días / 5 noches",
    price: 4600000,
    hotelNight: 390000,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format5",
    description: "Contempla casas blancas, cúpulas azules y vistas al mar Egeo en una de las islas más románticas."
  },

  {
    id: 7,
    name: "Tokio",
    country: "Japón",
    continent: "Asia",
    duration: "8 días / 7 noches",
    price: 5100000,
    hotelNight: 420000,
    image: "https://images.unsplash.com/photo-1711539924906-c26039c3f903?auto=format&fit=crop&w=900&q=85",
    description: "Explora una metrópolis fascinante donde la tradición japonesa se encuentra con la tecnología y la modernidad."
  },

  {
    id: 8,
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    duration: "7 días / 6 noches",
    price: 3700000,
    hotelNight: 300000,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    description: "Relájate entre templos, arrozales, playas tropicales y paisajes naturales llenos de serenidad."
  },

  {
    id: 9,
    name: "Marrakech",
    country: "Marruecos",
    continent: "África",
    duration: "6 días / 5 noches",
    price: 3400000,
    hotelNight: 280000,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=900&q=85",
    description: "Sumérgete en mercados tradicionales, jardines, palacios y la fascinante cultura marroquí."
  }

];


// FORMATO DE PRECIOS COLOMBIANOS

const money = value => new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
}).format(value);


// ELEMENTOS HTML

const grid = document.getElementById("destinationGrid");
const count = document.getElementById("destinationCount");
const emptyMessage = document.getElementById("emptyMessage");

const continentFilter = document.getElementById("continentFilter");
const priceFilter = document.getElementById("priceFilter");

const searchInput = document.getElementById("searchInput");
const continentSearch = document.getElementById("continentSearch");

const quoteDestination = document.getElementById("quoteDestination");
const modal = document.getElementById("destinationModal");

let selectedDestination = null;


// MOSTRAR DESTINOS DINÁMICAMENTE

function renderDestinations(list) {

  grid.innerHTML = list.map(destination => `

    <article class="destination-card">

      <div class="card-image">

        <img
          src="${destination.image}"
          alt="Paisaje de ${destination.name}"
          loading="lazy"
        >

        <span class="card-tag">
          ${destination.continent}
        </span>

      </div>

      <div class="card-body">

        <span class="card-location">
          ${destination.country} · ${destination.continent}
        </span>

        <h3>${destination.name}</h3>

        <p class="card-description">
          ${destination.description}
        </p>

        <div class="card-bottom">

          <div>
            <span class="duration">
              ◷ ${destination.duration}
            </span>
          </div>

          <div>
            <span class="price-label">
              Desde / persona
            </span>

            <span class="price">
              ${money(destination.price)}
            </span>
          </div>

        </div>

        <button
          class="details-button"
          type="button"
          data-destination="${destination.id}"
        >
          Ver detalles del destino →
        </button>

      </div>

    </article>

  `).join("");

  count.textContent = `${list.length} ${
    list.length === 1 ? "experiencia" : "experiencias"
  }`;

  emptyMessage.hidden = list.length !== 0;
}


// FILTRAR DESTINOS

function applyFilters() {

  const term = searchInput.value.trim().toLocaleLowerCase("es");

  const continent = continentFilter.value;

  const maxPrice = Number(priceFilter.value);

  const filtered = destinations.filter(destination => {

    const matchesTerm =
      `${destination.name} ${destination.country}`
      .toLocaleLowerCase("es")
      .includes(term);

    return matchesTerm &&
      (continent === "todos" || destination.continent === continent) &&
      destination.price <= maxPrice;

  });

  renderDestinations(filtered);
}


// CARGAR DESTINOS EN EL COTIZADOR

function populateQuoteDestinations() {

  quoteDestination.innerHTML =
    '<option value="">Selecciona un destino</option>' +

    destinations.map(destination => `
      <option value="${destination.id}">
        ${destination.name} — ${money(destination.price)}
      </option>
    `).join("");

}


// MOSTRAR DETALLES DE CADA DESTINO

function openDestination(id) {

  const destination = destinations.find(
    item => item.id === Number(id)
  );

  if (!destination) return;

  selectedDestination = destination;

  document.getElementById("modalImage").src =
    destination.image;

  document.getElementById("modalImage").alt =
    `Paisaje de ${destination.name}`;

  document.getElementById("modalContinent").textContent =
    `${destination.country} · ${destination.continent}`;

  document.getElementById("modalTitle").textContent =
    destination.name;

  document.getElementById("modalDescription").textContent =
    destination.description;

  document.getElementById("modalDuration").textContent =
    `Duración sugerida: ${destination.duration}`;

  document.getElementById("modalPrice").textContent =
    `${money(destination.price)} / persona`;

  modal.classList.add("open");

  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


// CERRAR VENTANA DE DETALLES

function closeModal() {

  modal.classList.remove("open");

  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


// EVENTOS DE LOS DESTINOS

grid.addEventListener("click", event => {

  const button = event.target.closest("[data-destination]");

  if (button) {
    openDestination(button.dataset.destination);
  }

});

modal.addEventListener("click", event => {

  if (event.target.hasAttribute("data-close-modal")) {
    closeModal();
  }

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeModal();
  }

});


// LLEVAR DESTINO SELECCIONADO AL COTIZADOR

document.getElementById("modalQuoteButton")
.addEventListener("click", () => {

  if (selectedDestination) {
    quoteDestination.value = String(selectedDestination.id);
  }

  closeModal();

  document.getElementById("cotizador")
    .scrollIntoView({ behavior: "smooth" });

});


// EVENTOS DE FILTROS

[continentFilter, priceFilter].forEach(element => {

  element.addEventListener("change", applyFilters);

});


// BUSCADOR

document.getElementById("searchForm")
.addEventListener("submit", event => {

  event.preventDefault();

  continentFilter.value = continentSearch.value;

  applyFilters();

  document.getElementById("destinos")
    .scrollIntoView({ behavior: "smooth" });

});

searchInput.addEventListener("input", applyFilters);


// LIMPIAR FILTROS

document.getElementById("clearFilters")
.addEventListener("click", () => {

  searchInput.value = "";

  continentSearch.value = "todos";

  continentFilter.value = "todos";

  priceFilter.value = "999999999";

  applyFilters();

});


// =====================================
// COTIZADOR DE VIAJES
// =====================================

document.getElementById("quoteForm")
.addEventListener("submit", event => {

  event.preventDefault();

  const destination = destinations.find(
    d => d.id === Number(quoteDestination.value)
  );

  const people = Number(
    document.getElementById("people").value
  );

  const nights = Number(
    document.getElementById("nights").value
  );

  const hotelType = document.getElementById("hotel").value;

  const result = document.getElementById("quoteResult");


  // VALIDAR DESTINO

  if (!destination) {

    alert("Por favor, selecciona un destino.");

    quoteDestination.focus();

    return;
  }


  // VALIDAR PERSONAS

  if (!Number.isInteger(people) || people < 1 || people > 20) {

    alert("El número de personas debe estar entre 1 y 20.");

    document.getElementById("people").focus();

    return;
  }


  // VALIDAR NOCHES

  if (!Number.isInteger(nights) || nights < 1 || nights > 30) {

    alert("El número de noches debe estar entre 1 y 30.");

    document.getElementById("nights").focus();

    return;
  }


  // TARIFAS DE HOTEL

  const hotelRates = {
    economico: 0.65,
    estandar: 1,
    lujo: 1.8
  };

  const hotelNames = {
    economico: "Económico",
    estandar: "Estándar",
    lujo: "Lujo"
  };


  // CÁLCULOS

  const baseTotal = destination.price * people;

  const hotelTotal = Math.round(
    destination.hotelNight *
    hotelRates[hotelType] *
    nights *
    people
  );

  const total = baseTotal + hotelTotal;


  // MOSTRAR DESGLOSE

  result.innerHTML = `

    <div class="result-title">
      Resumen para ${destination.name}
    </div>

    <div class="result-line">
      <span>Destino</span>
      <b>${destination.name}</b>
    </div>

    <div class="result-line">
      <span>Viajeros</span>
      <b>${people} persona(s)</b>
    </div>

    <div class="result-line">
      <span>Noches</span>
      <b>${nights}</b>
    </div>

    <div class="result-line">
      <span>Hotel ${hotelNames[hotelType]}</span>
      <b>${money(hotelTotal)}</b>
    </div>

    <div class="result-line">
      <span>Precio base (${money(destination.price)} × ${people})</span>
      <b>${money(baseTotal)}</b>
    </div>

    <div class="result-total">
      <span>Total estimado</span>
      <strong>${money(total)}</strong>
    </div>

  `;

  result.classList.add("show");

});


// =====================================
// FORMULARIO DE CONTACTO WHATSAPP
// =====================================

document.getElementById("contactForm")
.addEventListener("submit", event => {

  event.preventDefault();

  const name = document.getElementById("contactName")
    .value.trim();

  const destination = document.getElementById("contactDestination")
    .value.trim();

  const message = document.getElementById("contactMessage")
    .value.trim();


  if (!name || !destination) {

    alert("Completa tu nombre y el destino de interés.");

    return;
  }


  // WHATSAPP DE RUMBO AVENTURA

  const whatsappNumber = "573126020219";

  const text = `
Hola, soy ${name}.

Me interesa viajar a ${destination}.

${message}

Quisiera recibir información y asesoría personalizada.
`;


  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(whatsappURL, "_blank", "noopener");

});


// =====================================
// MENÚ PARA CELULARES
// =====================================

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuToggle.textContent = isOpen ? "×" : "☰";

});


navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";

  });

});


// AÑO AUTOMÁTICO EN EL PIE DE PÁGINA

document.getElementById("year").textContent =
  new Date().getFullYear();


// INICIAR LA PÁGINA

renderDestinations(destinations);

populateQuoteDestinations();