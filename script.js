window.onload = () => {
  renderPlaces(entries.splice(0, 10));
};

function renderPlaces(places) {
  console.log(places);
  let scene = document.querySelector('a-scene');

  places.forEach((place) => {
    let latitude = place.lat;
    let longitude = place.lng;

    // add place name
    const placeText = document.createElement('a-image');
    placeText.setAttribute(
      'gps-entity-place',
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    placeText.setAttribute('name', place.name);
    placeText.setAttribute('scale', '15 15 15');
    placeText.setAttribute(
      'src',
      'https://maps.google.com/mapfiles/ms/icons/red.png'
    );

    placeText.addEventListener('loaded', () => {
      window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
    });

    scene.appendChild(placeText);
  });
}
