window.onload = () => {
  renderPlaces(entries);
};

function renderPlaces(places) {
  console.log(places);
  let scene = document.querySelector('a-scene');

  places.forEach((place) => {
    let latitude = place.lat;
    let longitude = place.lng;

    // add place name
    const placeText = document.createElement('a-link');
    placeText.setAttribute(
      'gps-entity-place',
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    placeText.setAttribute('title', place.name);
    placeText.setAttribute('scale', '15 15 15');

    placeText.addEventListener('loaded', () => {
      window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
    });

    scene.appendChild(placeText);
  });
}
