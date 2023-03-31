const nameInput = document.getElementById('name');
const suggestions = document.getElementById('suggestions');
let names = [];
let maxQuantities = {};
let submittedNames = [];

// Fetch names and max quantities from the text file
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQxIo5cPZffEUpclFdDS_Whdr47iQKanqBg_tgFAHrgMerLgfyc_kqTvkT96zNl0Q497PAL1t00Tjsz/pub?gid=1685786161&single=true&output=csv')
  .then(response => response.text())
  .then(text => {
    text.split('\n').forEach(line => {
      const [name, maxQuantity] = line.split(',').map(value => value.trim());
      names.push(name);
      maxQuantities[name.toLowerCase()] = parseInt(maxQuantity, 10);
    });
  })
  .catch(error => {
    console.error('Error fetching names and quantities:', error);
  });

// Fetch submitted names from the Google Sheet
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQxIo5cPZffEUpclFdDS_Whdr47iQKanqBg_tgFAHrgMerLgfyc_kqTvkT96zNl0Q497PAL1t00Tjsz/pub?gid=0&single=true&output=csv')
  .then(response => response.text())
  .then(text => {
    text.split('\n').forEach(line => {
      const [name] = line.split(',').map(value => value.trim());
      submittedNames.push(name.toLowerCase());
    });
  })
  .catch(error => {
    console.error('Error fetching submitted names:', error);
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
    const numberOfGuests = form.quantity.value;

    // Check for duplicates before submitting
    if (submittedNames.includes(name)) {
      if (numberOfGuests == 1) {
        alert(`Looks like we’ve already received a submission for your group for ${numberOfGuests} guest. If there’s a mistake, please call or text one of us.`);
      } else {
        alert(`Looks like we’ve already received a submission for your group for ${numberOfGuests} guest. If there’s a mistake, please call or text one of us.`);
      }
    } else {
      fetch(action, {
        method: 'POST',
        body: data,
      })
        .then(() => {
          if (numberOfGuests == 1) {
            alert(`Thank you ${name} for RSVPing ${numberOfGuests} guest. See you soon!`);
          } else {
            alert(`Thank you ${name} for RSVPing ${numberOfGuests} guests. See you soon!`);
          }
          // Add the submitted name to the list of submitted names
          submittedNames.push(name);
        })
        .catch(error => {
          console.error('Error submitting the form:', error);
        });
    }
  });
});

function checkForm(form) {
  //
  // validate form fields
  //

  form.myButton.disabled = true;
  return true;
}
