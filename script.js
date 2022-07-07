window.onload = () => {
  renderPlaces(entries.splice(0, 10));
};

function renderPlaces(places) {
  let scene = document.querySelector('a-scene');

  places.forEach((place) => {
    console.log('adding place', place.name);
    let latitude = place.lat;
    let longitude = place.lng;

    // add place name
    const placeText = document.createElement('a-text');
    placeText.setAttribute(
      'gps-entity-place',
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    placeText.setAttribute('value', place.name);
    placeText.setAttribute('scale', '15 15 15');
    placeText.setAttribute('look-at', '[gps-camera]');

    placeText.addEventListener('loaded', () => {
      window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
    });

    scene.appendChild(placeText);
  });
}
