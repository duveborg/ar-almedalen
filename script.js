window.onload = () => {
  renderPlaces();
};

function isOpen(event) {
  // temporary
  const now = new Date('2022-07-03T20:00:00');
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
    //text.setAttribute('z-offset', '0.5');
    //text.setAttribute('geometry', 'primitive: plane; height: auto; width: 10');
    text.setAttribute('baseline', 'bottom');
    //text.setAttribute('material', 'color: lightblue');

    text.addEventListener('loaded', () => {
      window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
    });

    return text;
  };

  openEvents.forEach((place) => {
    const nameText = createText(place);
    nameText.setAttribute(
      'value',
      `${place.name}\n
      Mat: ${place.food ? 'Ja' : 'Nej'}\n
      Öppet: ${place.startTime} - ${place.endTime}`
    );
    nameText.addEventListener('click', () => {
      alert(place.description);
    });

    // scene.appendChild(openText);
    scene.appendChild(nameText);
    // scene.appendChild(foodText);
  });
}
