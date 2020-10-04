//fecha por parametro
const bool = (date) => {
  const distanciaMedia = 225000000;

  //marte
  const readioM = 227936640; //km
  const velocidadM = 24.077; //km/s

  const velocidadE = 29.78;
  const semiEjeE = 149598261; //km
  const execE = 0.01671123;

  //sol
  const masa = 1989000000000000000000000000000; //kg

  const n_earth = 365;
  const e_mars = 687;
  const radioEarth = Math.pow(150, 3);
  const dias = Math.pow(n_earth, 2);

  var start = new Date(now.getFullYear(), 0, 0);
  var diff = date - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  const raizCubica = Math.pow(n_earth, 1 / 3);
};
