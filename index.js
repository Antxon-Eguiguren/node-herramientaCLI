const vorpal = require('vorpal')();
const chalk = vorpal.chalk;
const clear = require('clear');

const camaras = require('./camaras');

// Crear el delimitador de la línea de comandos
vorpal.delimiter('$ >').show();

// Crear un comando de prueba
vorpal.command('test', 'Comando para hacer pruebas')
    .action((args, callback) => {
        console.log(chalk.blue('Esto es una prueba'));
        callback();
    });


// Crear un comando para acceder a las cámaras de Madrid
vorpal.command('camara', 'Recupera aleatoriamente una de las cámaras de Madrid')
    .action((args, callback) => {
        clear();
        camaras().then(() => {
            callback();
        });
    });

// Crear un comando para hacer un cuestionario de preguntas
vorpal.command('preguntas', 'Cuestionario con Preguntas')
    .action(function (args, callback) {
        clear();
        this.prompt([
            {
                type: 'input',
                message: 'Introduce tu nombre: ',
                name: 'nombre',
                default: 'Antxon Eguiguren'
            },
            {
                type: 'confirm',
                message: '¿Estás siguiendo la cuarentena?: ',
                name: 'cuarentena'
            },
            {
                type: 'list',
                message: '¿Cuánto crees que va a durar la cuarentena?: ',
                name: 'duracion',
                choices: ['1 semana', '2 semanas', 'Más de 1 mes']
            },
            {
                type: 'password',
                message: 'Dame tu password: ',
                name: 'clave'
            },
            {
                type: 'list',
                message: 'Elige el país que va a caer antes: ',
                name: 'pais',
                choices: [
                    { name: 'España 🇪🇸', value: 'es' },
                    { name: 'Italia 🇮🇹', value: 'it' },
                    { name: 'Francia 🇫🇷', value: 'fr' }
                ]
            }
        ], function (respuestas) {
            console.log(respuestas);
            callback();
        });
    });
