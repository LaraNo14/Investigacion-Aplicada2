const express = require('express');
const app = express();
const port = 3100; // Podemos cambiar al puerto que querramos, del 1024 en adelante

//Materias del pensum de cada carrera
const pensumTecnico = [
  {
    codigo: 'ANF231',
    nombre: 'Antropología Filosófica',
    UV: 3,
    ciclo: 1,
    requisitos: ['Bachillerato'],
  },
  {
    codigo: 'LME404',
    nombre: 'Lenguajes de Marcado y Estilo Web',
    UV: 4,
    ciclo: 1,
    requisitos: ['Bachillerato'],
  },
  {
    codigo: 'MAD541',
    nombre: 'Matemática Discreta',
    UV: 4,
    ciclo: 1,
    requisitos: ['Bachillerato'],
  },
  {
    codigo: 'PAL404',
    nombre: 'Programación de Algoritmos',
    UV: 4,
    ciclo: 1,
    requisitos: ['Bachillerato'],
  },
  {
    codigo: 'REC404',
    nombre: 'Redes de Comunicación',
    UV: 4,
    ciclo: 1,
    requisitos: ['Bachillerato'],
  },
  {
    codigo: 'ADS404',
    nombre: 'Análisis y Diseño de Sistemas',
    UV: 3,
    ciclo: 2,
    requisitos: ['PAL404'],
  },
  {
    codigo: 'DAW404',
    nombre: 'Desarrollo de Aplic. Web con Soft. Interpret. en el Cliente',
    UV: 4,
    ciclo: 2,
    requisitos: ['LME404'],
  },
  {
    codigo: 'DSP404',
    nombre: 'Desarrollo de Aplicaciones con Software Propietari',
    UV: 4,
    ciclo: 2,
    requisitos: ['PAL404'],
  },
  {
    codigo: 'MTE511',
    nombre: 'Matemática Técnica',
    UV: 4,
    ciclo: 2,
    requisitos: ['MAD541'],
  },
  {
    codigo: 'SES404',
    nombre: 'Soporte de Equipos y Sistemas Computacionales',
    UV: 4,
    ciclo: 2,
    requisitos: ['REC404'],
  },

];

const pensumIngenieria = [
  {
      codigo: 'CAD501',
      nombre: 'Cálculo Diferencial',
      UV: 4,
      ciclo: 1,
      requisitos: ['Bachillerato'],
    },
    {
      codigo: 'QUC501',
      nombre: 'Química General',
      UV: 4,
      ciclo: 1,
      requisitos: ['Bachillerato'],
    },
    {
      codigo: 'ANF231',
      nombre: 'Antropología Filosófica',
      UV: 3,
      ciclo: 1,
      requisitos: ['Bachillerato'],
    },
    {
      codigo: 'PRE104',
      nombre: 'Programación Estructurada',
      UV: 4,
      ciclo: 1,
      requisitos: ['Bachillerato'],
    },
    {
      codigo: 'ALG501',
      nombre: 'Álgebra Vectorial y Matrices',
      UV: 4,
      ciclo: 2,
      requisitos: ['Bachillerato'],
    },
    {
      codigo: 'CAI501',
      nombre: 'Cálculo Integral',
      UV: 4,
      ciclo: 2,
      requisitos: ['CAD501'],
    },
    {
      codigo: 'MDB104',
      nombre: 'Modelamiento y Diseño de Base de Datos',
      UV: 4,
      ciclo: 2,
      requisitos: ['PRE104'],
    },
    {
      codigo: 'POO104',
      nombre: 'Programación Orientada a Objetos',
      UV: 4,
      ciclo: 2,
      requisitos: ['PRE104'],
    },
    {
      codigo: 'ADS104',
      nombre: 'Análisis y Diseño de Sistemas Informaticos',
      UV: 4,
      ciclo: 3,
      requisitos: ['MDB104'],
    },
    {
      codigo: 'PED104',
      nombre: 'Programación con Estructura de Datos',
      UV: 4,
      ciclo: 3,
      requisitos: ['POO104'],
    },
];

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.get('/', (req, res) => {
  res.send('Node JS api');
});
  
app.get('/requisitos/:codigo', (req, res) => {
  const codigoMateria = req.params.codigo;
  let materiaEncontrada = null;

  // Buscar la materia en el pensum técnico
  materiaEncontrada = pensumTecnico.find((materia) => materia.codigo === codigoMateria);

  // Si no se encontró en el pensum técnico, buscar en el pensum de ingeniería
  if (!materiaEncontrada) {
    materiaEncontrada = pensumIngenieria.find((materia) => materia.codigo === codigoMateria);
  }

  if (materiaEncontrada) {
    res.json({ materia: materiaEncontrada });
  } else {
    res.json({ mensaje: 'Materia no encontrada.' });
  }
});

app.get('/materias/ciclo/:numeroCiclo', (req, res) => {
  const numeroCiclo = parseInt(req.params.numeroCiclo); // Convierte el parámetro a número

  // Filtra las materias del pensum técnico por ciclo
  const materiasTecnicoPorCiclo = pensumTecnico.filter((materia) => materia.ciclo === numeroCiclo);

  // Filtra las materias del pensum de ingeniería por ciclo
  const materiasIngenieriaPorCiclo = pensumIngenieria.filter((materia) => materia.ciclo === numeroCiclo);

  // Combina las materias de ambos pensums
  const materiasPorCiclo = [...materiasTecnicoPorCiclo, ...materiasIngenieriaPorCiclo];

  if (materiasPorCiclo.length === 0) {
    res.json({ mensaje: 'No se encontraron materias para el ciclo especificado.' });
  } else {
    res.json({ materiasPorCiclo });
  }
});








