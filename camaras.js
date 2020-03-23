const axios = require('axios');
const parser = require('fast-xml-parser');
const got = require('got');
const fs = require('fs');
const terminalImage = require('terminal-image');

// Destructuring: del objeto que devuelve el GET de Axios, nos quedamos con la parte que nos interesa, en este caso solamente el data. Es muy elegante hacerlo así, pero podríamos haber recibido el objeto entero (response) y después acceder a response.data
module.exports = async () => {

    // 1. Descargamos la información de las cámaras
    const { data } = await axios.get('https://datos.madrid.es/egob/catalogo/202088-0-trafico-camaras.kml');

    // 2. Parseamos el XML a JSON y recogemos el array de Placemarks con Destructuring
    const { kml: { Document: { Placemark: arrPlacemarks } } } = parser.parse(data);

    // 3. Seleccionamos una cámara aleatoria
    const randomNum = Math.floor(Math.random() * arrPlacemarks.length);
    const camaraSeleccionada = arrPlacemarks[randomNum];

    // 4. Obtenemos la posición de inicio y fin de la URL con la imagen de la cámara
    const urlStartIndex = camaraSeleccionada.description.indexOf('img src=') + 8;
    const urlEndIndex = camaraSeleccionada.description.indexOf(' ', urlStartIndex);

    // 5. Obtenemos la URL de la imagen de la cámara
    const urlImage = camaraSeleccionada.description.substring(urlStartIndex, urlEndIndex);

    // 6. Obtenemos el nombre de la cámara
    const nombre = urlImage.substring(urlImage.indexOf('Camara'), urlImage.indexOf('.jpg'));

    // 7. Descargamos la imagen (obtenemos con Destructuring su propiedad body)
    const { body } = await got(urlImage, { responseType: 'buffer' });
    fs.appendFileSync(`./images/${nombre}.jpg`, body);

    // 8. Mostramos la imagen en la consola (con iTerm se ve bien)
    console.log(await terminalImage.buffer(body));
}