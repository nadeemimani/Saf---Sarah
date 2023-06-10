const nameInput = document.getElementById('name');
const suggestions = document.getElementById('suggestions');
const tableNumberInput = document.getElementById('table-number');
let names = [];
let tableNumbers = {};
let submittedNames = [];

function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

fetch('https://docs.google.com/spreadsheets/d/e/YOUR_NEW_SPREADSHEET_ID/pub?gid=YOUR_GID&single=true&output=csv')
  .then(response => response.text())
  .then(text => {
    text.split('\n').forEach(line => {
      const [name, tableNumber] = line.split(',').map(value => value.trim());
      names.push(name);
      tableNumbers[name.toLowerCase()] = tableNumber;
    });
  })
  .catch(error => {
    console.error('Error fetching names and table numbers:', error);
  });


nameInput.addEventListener('input', (e) => {
  const input = e.target.value.trim().toLowerCase();
  suggestions.innerHTML = '';
  if (input.length > 0) {
    const matches = names.filter(name => name.toLowerCase().includes(input));
    if (matches.length > 0) {
      suggestions.classList.add('visible');
      matches.forEach(match => {
        const li = document.createElement('li');
        li.textContent = match;
        li.addEventListener('click', () => {
          nameInput.value = match;
          const quantityInput = document.querySelector('input[name="quantity"]');
          quantityInput.setAttribute('data-max', maxQuantities[match.toLowerCase()] || 1);
          suggestions.classList.remove('visible');
        });
        suggestions.appendChild(li);
      });
    } else {
      suggestions.classList.remove('visible');
    }
  } else {
    suggestions.classList.remove('visible');
  }
});

window.addEventListener("load", function () {
  const form = document.getElementById('my-form');
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    const name = form.name.value.trim().toLowerCase();
    const capitalizedName = capitalizeWords(name);
    const numberOfGuests = form.quantity.value;

    if (submittedNames.includes(name)) {
      if (numberOfGuests == 1) {
        alert(`Looks like we’ve already received a submission for your group for ${numberOfGuests} guest. If there’s a mistake, please call or text one of us.`);
      } else {
        alert(`Looks like we’ve already received a submission for your group for ${numberOfGuests} guests. If there’s a mistake, please call or text one of us.`);
      }
    } else {
      if (name === "" || numberOfGuests === "") {
        alert("Please fill out both name and number of guests.");
      } else {
        fetch(action, {
          method: 'POST',
          body: data,
        })
        .then(() => {
          if (numberOfGuests == 1) {
            alert(`Thank you ${capitalizedName} for RSVPing ${numberOfGuests} guest. See you soon!`);
          } else {
            alert(`Thank you ${capitalizedName} for RSVPing ${numberOfGuests} guests. See you soon!`);
          }
          const submitButton = document.querySelector('.rsvpformbutton');
          if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.remove('rsvpformbutton');
            submitButton.classList.add('rsvpformclicked');
          }
        });
      }
    }
  });
});

