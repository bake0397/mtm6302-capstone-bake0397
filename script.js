'use strict';

const API_KEY = 'CDflXmJyeFOr1VslnyDmo0hV2ABes8cD7v2FprKx';
const API_URL = 'https://api.nasa.gov/planetary/apod';
const FAVOURITES_KEY = 'apodFavourites';

const state = {
  currentApod: null,
  favourites: {}
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('apod-form');
  const dateInput = document.getElementById('apod-date');
  const favouriteBtn = document.getElementById('favourite-btn');
  const apodImage = document.getElementById('apod-image');

  const modal = document.getElementById('apod-modal');
  const calendarModal = document.getElementById('calendar-modal');
  const calendarLink = document.getElementById('calendar-link');
  const calendarLinkFooter = document.getElementById('calendar-link-footer');

  const backToTop = document.getElementById('back-to-top');
  const header = document.getElementById('top');

  const today = new Date().toISOString().split('T')[0];

  // Limit to non-future dates for main input
  if (dateInput) {
    dateInput.max = today;
    dateInput.value = today;
  }

  // CLOSE image modal
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeApodModal();
      }
    });
  }

  // CLOSE calendar modal
  if (calendarModal) {
    calendarModal.addEventListener('click', (e) => {
      if (e.target === calendarModal) {
        closeCalendarModal();
      }
    });
  }

  // OPEN calendar modal ––– NAVIGATION 
  if (calendarLink && calendarModal) {
    calendarLink.addEventListener('click', (event) => {
      event.preventDefault();
      openCalendarModal();
    });
  }

  // OPEN calendar modal ––– FOOTER 
  if (calendarLinkFooter && calendarModal) {
    calendarLinkFooter.addEventListener('click', (event) => {
      event.preventDefault();
      openCalendarModal();
    });
  }

  // SHOW / HIDE "Back to top" 
  window.addEventListener('scroll', () => {
    if (!backToTop || !header) {
      return;
    }

    const headerBottom = header.offsetTop + header.offsetHeight;

    if (window.scrollY > headerBottom) {
      backToTop.classList.remove('d-none');
    } else {
      backToTop.classList.add('d-none');
    }
  });

  // Load favourites + initial APOD
  loadFavourites();
  renderFavourites();
  fetchApod(today);

  // Date form submission (archive section)
  if (form && dateInput) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const selectedDate = dateInput.value;

      if (!selectedDate) {
        alert('Please choose a date.');
        return;
      }

      if (selectedDate > today) {
        alert('Please choose a date that is not in the future.');
        return;
      }

      fetchApod(selectedDate);
    });
  }

  // FAVOURITE BUTTON
  if (favouriteBtn) {
    favouriteBtn.addEventListener('click', () => {
      if (!state.currentApod) return;

      // Toggle visual state
      favouriteBtn.classList.toggle('heart-active');

      const icon = favouriteBtn.querySelector('i');

      if (favouriteBtn.classList.contains('heart-active')) {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
      } else {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
      }

      // Add to favourites ONLY if not already saved
      addFavourite(state.currentApod);
    });
  }

  if (apodImage) {
    apodImage.addEventListener('click', () => {
      if (!state.currentApod) {
        return;
      }
      openApodModal(state.currentApod);
    });
  }

});

function fetchApod(date) {
  const url = `${API_URL}?api_key=${API_KEY}&date=${date}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then((data) => {
      renderApod(data);
    })
    .catch((error) => {
      console.error('Error fetching APOD:', error);
      alert('There was a problem retrieving the Astronomy Picture of the Day. Please try again.');
    });
}

function renderApod(data) {
  state.currentApod = data;

  const imageElement = document.getElementById('apod-image');
  const dateDisplay = document.getElementById('apod-date-display');
  const aboutTitle = document.getElementById('apod-title');
  const explanation = document.getElementById('apod-explanation');
  const dateLabel = document.getElementById('apod-date-label');

  if (!imageElement || !dateDisplay || !aboutTitle || !explanation) {
    return;
  }

  // Handle non-image media
  if (data.media_type !== 'image') {
    imageElement.src = '';
    imageElement.alt = 'APOD for this date is not an image.';
    aboutTitle.textContent = data.title || 'Astronomy Picture of the Day';
    explanation.textContent = 'The APOD for this date is a video. This app only displays image APODs.';
    dateDisplay.textContent = data.date;
    if (dateLabel) {
      dateLabel.textContent = data.date;
    }
    return;
  }

  imageElement.src = data.url;
  imageElement.alt = data.title || 'Astronomy Picture of the Day';
  dateDisplay.textContent = data.date;
  aboutTitle.textContent = data.title || 'Astronomy Picture of the Day';
  explanation.textContent = data.explanation || '';
  if (dateLabel) {
    dateLabel.textContent = data.date;
  }
  
  updateHeartState();

}

function loadFavourites() {
  const stored = localStorage.getItem(FAVOURITES_KEY);

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        state.favourites = parsed;
      }
    } catch (error) {
      console.error('Error parsing favourites from localStorage', error);
      state.favourites = {};
    }
  }
}

function saveFavourites() {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(state.favourites));
}

function addFavourite(apodData) {
  if (!apodData || !apodData.date) {
    return;
  }

  if (state.favourites[apodData.date]) {
    alert('This date is already in your favourites.');
    return;
  }

  state.favourites[apodData.date] = {
    date: apodData.date,
    title: apodData.title,
    url: apodData.url,
    hdurl: apodData.hdurl,
    explanation: apodData.explanation,
    media_type: apodData.media_type
  };

  saveFavourites();
  renderFavourites();
}

function removeFavourite(date) {
  if (!state.favourites[date]) {
    return;
  }

  delete state.favourites[date];
  saveFavourites();
  renderFavourites();
}

function renderFavourites() {
  const container = document.getElementById('favourites-list');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  const dates = Object.keys(state.favourites);

  if (dates.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'You have no favourite images yet.';
    container.appendChild(message);
    return;
  }

  // Show newest APOD first
  dates.sort((a, b) => b.localeCompare(a));

  dates.forEach((date) => {
    const item = state.favourites[date];

    const wrapper = document.createElement('div');
    wrapper.className = 'favourite-item mb-3';

    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.title || 'Favourite APOD image';
    img.className = 'img-fluid mb-2';

    const title = document.createElement('h4');
    title.textContent = item.title || 'Astronomy Picture of the Day';

    const dateText = document.createElement('p');
    dateText.textContent = item.date;

    const buttons = document.createElement('div');

    // View favourited image (opens modal)
    const viewButton = document.createElement('button');
    viewButton.type = 'button';
    viewButton.textContent = 'View';
    viewButton.className = 'btn btn-dark bg-black rounded-pill btn-sm me-2 px-4 py-2';
    viewButton.addEventListener('click', () => {
      openApodModal(item);
    });

    // Delete favourited image
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger rounded-pill btn-sm px-4 py-2';
    deleteButton.addEventListener('click', () => {
      removeFavourite(item.date);
    });

    buttons.appendChild(viewButton);
    buttons.appendChild(deleteButton);

    wrapper.appendChild(img);
    wrapper.appendChild(title);
    wrapper.appendChild(dateText);
    wrapper.appendChild(buttons);

    container.appendChild(wrapper);
  });
}

// Updates the heart button based on whether the current APOD is already favourited
function updateHeartState() {
  const favouriteBtn = document.getElementById('favourite-btn');
  if (!favouriteBtn || !state.currentApod) return;

  const icon = favouriteBtn.querySelector('i');
  const isFavourited = !!state.favourites[state.currentApod.date];

  // Reset state first
  favouriteBtn.classList.remove('heart-active');
  icon.classList.remove('bi-heart-fill');
  icon.classList.add('bi-heart');

  // Apply active look if favourited
  if (isFavourited) {
    favouriteBtn.classList.add('heart-active');
    icon.classList.remove('bi-heart');
    icon.classList.add('bi-heart-fill');
  }
}


// FAVOURITES MODAL
function openApodModal(apod) {
  const modal = document.getElementById('apod-modal');
  if (!modal || !apod) {
    return;
  }

  if (apod.media_type !== 'image') {
    return;
  }

  modal.innerHTML = `
    <div class="apod-modal-content">
      <img 
        src="${apod.hdurl || apod.url}" 
        alt="${apod.title || 'Astronomy Picture of the Day'}" 
        class="img-fluid"
      >
      <h2>${apod.title || ''}</h2>
      <p>${apod.date || ''}</p>
      <p>${apod.explanation || ''}</p>
    </div>
  `;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function closeApodModal() {
  const modal = document.getElementById('apod-modal');
  if (!modal) {
    return;
  }

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = '';
}

// CALENDAR MODAL
function openCalendarModal() {
  const modal = document.getElementById('calendar-modal');
  const mainDateInput = document.getElementById('apod-date');
  if (!modal) {
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const currentValue = mainDateInput && mainDateInput.value ? mainDateInput.value : today;

  modal.innerHTML = `
    <div class="calendar-modal-content">
      <label for="calendar-modal-date" class="form-label">
        Choose a date for Astronomy Picture of the Day
      </label>
      <input 
        type="date" 
        id="calendar-modal-date" 
        class="form-control" 
        max="${today}" 
        value="${currentValue}"
      >
    </div>
  `;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');

  const modalDateInput = document.getElementById('calendar-modal-date');
  if (modalDateInput) {
    modalDateInput.addEventListener('change', () => {
      const selectedDate = modalDateInput.value;
      if (!selectedDate) {
        return;
      }

      const todayString = new Date().toISOString().split('T')[0];
      if (selectedDate > todayString) {
        alert('Please choose a date that is not in the future.');
        return;
      }

      if (mainDateInput) {
        mainDateInput.value = selectedDate;
      }

      fetchApod(selectedDate);
      closeCalendarModal();
    });
  }
}

function closeCalendarModal() {
  const modal = document.getElementById('calendar-modal');
  if (!modal) {
    return;
  }

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = '';
}