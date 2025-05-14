document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('holiday-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const people = document.getElementById('people').value.trim();
    const budget = document.getElementById('budget').value.trim();
    const nights = document.getElementById('nights').value;
    const season = document.getElementById('season').value;
    const type = document.getElementById('type').value;
    const email = document.getElementById('email').value.trim();

    if (!people || !budget || !nights || !season || !type || !email) {
      alert('Please fill in all the fields including your email!');
      return;
    }

    const destinations = {
      Adventure: ['New Zealand', 'Switzerland', 'Costa Rica', 'Norway'],
      Relaxation: ['Bali', 'Maldives', 'Hawaii', 'Santorini'],
      'City Break': ['Paris', 'New York', 'Tokyo', 'Barcelona'],
    };

    const chosenDestinations = destinations[type];

    if (!Array.isArray(chosenDestinations)) {
      alert('Something went wrong selecting your destination. Please check the holiday type.');
      return;
    }

    const randomDestination = chosenDestinations[Math.floor(Math.random() * chosenDestinations.length)];

    const formData = {
      user_email: email,
      people,
      budget,
      nights,
      season,
      type,
      destination: randomDestination,
    };

    sendFormEmail(formData)
      .then((response) => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-box');
        resultDiv.innerHTML = `       
          <p>📧 We've sent the details over to our team</p>
        `;
        document.querySelector('.main-content').appendChild(resultDiv);
      })
      .catch((error) => {
        console.error('EmailJS error:', error.text, error);
        alert('Oops! Something went wrong sending your email. Please try again.');
      });
  });

  window.toggleInfo = () => {
  const icon = document.querySelector('.info-icon');
  const box = document.getElementById('infoBox');
  icon.classList.toggle('active');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
};
});

function sendFormEmail(formData) {
  return emailjs
    .send('service_1sjgyhs', 'template_qsp2r9s', {
      people: formData.people,
      budget: formData.budget,
      nights: formData.nights,
      season: formData.season,
      type: formData.type,
      email: formData.user_email,
      destination: formData.destination,
    })
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text);
      return response;
    })
    .catch((error) => {
      console.error('Failed to send email:', error.text, error);
      throw error;
    });
}

const nights = document.getElementById('nights').value.trim();
const season = document.getElementById('season').value.trim();
const type = document.getElementById('type').value.trim();