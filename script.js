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

  const createText = (place) => {
    const text = document.createElement('a-text');
    text.setAttribute(
      'gps-entity-place',
      `latitude: ${place.lat}; longitude: ${place.lng};`
    );
    text.setAttribute('scale', '50 50 50');
    text.setAttribute('look-at', '[gps-camera]');
    text.setAttribute(
      'geometry',
      'primitive: plane; height: auto; width: auto'
    );
    //text.setAttribute('baseline', 'bottom');
    text.setAttribute('material', 'color: lightblue');

    text.addEventListener('loaded', () => {
      window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
    });

    return text;
  };

  openEvents.forEach((place) => {
    const nameText = createText(place);
    nameText.setAttribute(
      'value',
      `${place.name} - Mat: ${place.food ? 'Ja' : 'Nej'} - Öppet: ${
        place.startTime
      } - ${place.endTime}`
    );
    nameText.addEventListener('click', () => {
      alert(place.description);
    });

    const foodText = createText(place);
    foodText.setAttribute('value', `Mat: ${place.food ? 'Ja' : 'Nej'}`);
    foodText.setAttribute('position', '0 -3 0');

    const openText = createText(place);
    openText.setAttribute(
      'value',
      `Öppet: ${place.startTime} - ${place.endTime}`
    );
    openText.setAttribute('position', '0 -6 0');

    // scene.appendChild(openText);
    scene.appendChild(nameText);
    // scene.appendChild(foodText);
  });
}
