<script>
  // Création d'une connexion WebSocket native
  const socket = new WebSocket(`ws://${location.host}`);

  // Sliders
  const baseSlider = document.getElementById("baseSlider");
  const brasSlider = document.getElementById("brasSlider");
  const mainSlider = document.getElementById("mainSlider");

  // Fonction pour envoyer les valeurs au serveur
  function envoyerSliders() {
    const base = baseSlider.value;
    const bras = brasSlider.value;
    const main = mainSlider.value;

    const message = `slider=base:${base}&bras:${bras}&main:${main}`;
    
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      console.log("Message envoyé :", message);
    } else {
      console.warn("WebSocket non prêt");
    }
  }

  // Ajouter les écouteurs
  baseSlider.addEventListener("input", envoyerSliders);
  brasSlider.addEventListener("input", envoyerSliders);
  mainSlider.addEventListener("input", envoyerSliders);

  // Réception de messages du serveur
  socket.onmessage = (event) => {
    console.log("Réponse du serveur :", event.data);
  };

  socket.onopen = () => {
    console.log("🟢 WebSocket connecté");
  };

  socket.onclose = () => {
    console.log("🔴 WebSocket déconnecté");
  };

  socket.onerror = (err) => {
    console.error("⚠️ Erreur WebSocket :", err);
  };
</script>
