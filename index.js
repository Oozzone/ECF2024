// Fonction pour ouvrir la page de contact
function ouvrirFenetreContact() {
    window.location.href = 'contact.html';
}

// Fonction pour le carousel
const carousel = document.querySelector('.carousel');
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 3; // ajustez la vitesse de défilement si nécessaire
    carousel.scrollLeft = scrollLeft - walk;
});

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value;
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    // Créer un nouvel élément pour l'avis
    const review = document.createElement('li');
    review.classList.add('review');

    // Ajouter le contenu à l'élément avis
    review.innerHTML = `
        <h3>${name} - Note : ${rating}/5</h3>
        <p>${comments}</p>
    `;

    // Ajouter l'avis à la liste des avis
    document.getElementById('reviewsList').appendChild(review);

    // Réinitialiser le formulaire
    document.getElementById('reviewForm').reset();
});

// Fermeture de la fenêtre de contact après l'envoie du formulaire

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire standard

    const formData = new FormData(this);

    fetch('/submit_form', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'index.html'; // Redirige vers la page d'accueil
        } else {
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    });
});

// Path: contact.html

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Logique de vérification des identifiants
    if (username === 'utilisateur' && password === 'motdepasse') {
        alert('Connexion réussie');
        // Redirection ou autres actions après la connexion réussie
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
});

// habitats.html
document.addEventListener("DOMContentLoaded", function() {
    const habitats = document.querySelectorAll('.habitat');
    
    habitats.forEach(habitat => {
        habitat.addEventListener('click', function() {
            const animalsList = habitat.querySelector('.animals');
            animalsList.classList.toggle('hidden');
        });
    });
});