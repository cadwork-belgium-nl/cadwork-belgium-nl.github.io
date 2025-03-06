document.addEventListener("DOMContentLoaded", () => {
	// Recherche toutes les images qui contiennent une classe "img-**"
    document.querySelectorAll('img[class*="img-"]').forEach(img => {
        // Extraire le pourcentage de réduction de la classe.
		const match = img.className.match(/img-(\d+)/);
		const percentage = match ? parseInt(match[1], 10) / 100 : false;

		if (!percentage) {
			return;
		}

		// Réduire la largeur de l'image
		if (img.complete) {
            // Si l'image est déjà chargée
            img.style.width = (img.naturalWidth * percentage) + 'px';
        } else {
            // Si l'image n'est pas encore chargée
            img.onload = () => {
                img.style.width = (img.naturalWidth * percentage) + 'px';
            };
        }
    });
});
