<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  // Exemple : récupérer les sliders
  const baseSlider = document.getElementById("baseSlider");
  const brasSlider = document.getElementById("brasSlider");
  const mainSlider = document.getElementById("mainSlider");

  // Fonction pour envoyer les valeurs au serveur via WebSocket
  function envoyerSliders() {
    const base = baseSlider.value;
    const bras = brasSlider.value;
    const main = mainSlider.value;

    const message = `slider=base:${base}&bras:${bras}&main:${main}`;
    socket.send(message); // Envoi vers le serveur
    console.log("Message envoyé :", message);
  }

  // Ajouter des écouteurs sur les sliders
  baseSlider.addEventListener("input", envoyerSliders);
  brasSlider.addEventListener("input", envoyerSliders);
  mainSlider.addEventListener("input", envoyerSliders);

  // Réception d'une réponse du serveur
  socket.on("message", (msg) => {
    console.log("Réponse du serveur :", msg);
  });
</script>
