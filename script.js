window.onload = () => {
  renderPlaces();
};

function isOpen(event) {
  // temporary
  const now = new Date('2022-07-03T16:00:00');
  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  return now > start && now < end;
}

function renderPlaces() {
  const openEvents = entries.filter(isOpen);

  const scene = document.querySelector('a-scene');

  scene
    .querySelectorAll('a-text')
    .forEach((text) => text.parentNode.removeChild(text));

  console.log('There are this many open events:', openEvents.length);

  openEvents.forEach((place) => {
    let latitude = place.lat;
    let longitude = place.lng;

    // add place name
    const placeText = document.createElement('a-text');
    placeText.setAttribute(
      'gps-entity-place',
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    placeText.setAttribute('value', place.name);
    placeText.setAttribute('scale', '50 50 50');
    placeText.setAttribute('look-at', '[gps-camera]');

    placeText.addEventListener('loaded', () => {
      window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
    });

    placeText.addEventListener('click', () => {
      alert(place.description);
    });

    scene.appendChild(placeText);
  });
}
