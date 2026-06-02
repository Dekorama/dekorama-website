/**
 * Curated seed keywords for Dekorama blog pipeline (ES-focused queries;
 * locale "both" still generates bilingual posts).
 * @returns {string[]}
 */
function buildSeedKeywords() {
  const keywords = new Set();
  const add = (phrase) => {
    const normalized = phrase.trim().replace(/\s+/g, ' ');
    if (normalized.length >= 12) keywords.add(normalized);
  };

  const costa = 'Costa del Sol';
  const cities = [
    'Benalmadena',
    'Marbella',
    'Fuengirola',
    'Estepona',
    'Torremolinos',
    'Malaga',
    'Mijas',
    'Nerja',
    'Ronda',
    'Manilva',
    'San Pedro de Alcantara',
    'La Cala de Mijas',
    'Coin',
    'Alhaurin el Grande',
    'Benahavis',
    'Casares',
  ];

  for (const city of cities) {
    add(`reformas integrales ${city} presupuesto y plazos`);
    add(`cuanto cuesta una reforma integral en ${city}`);
    add(`empresa de reformas integrales en ${city}`);
    add(`reforma integral de piso en ${city}`);
    add(`reforma integral de apartamento en ${city}`);
    add(`reforma integral de villa en ${city}`);
    add(`reforma bano completo ${city} precio 2026`);
    add(`cuanto cuesta reformar un bano en ${city}`);
    add(`diseno de bano moderno en ${city}`);
    add(`reforma de cocina en ${city} presupuesto`);
    add(`cocina a medida en ${city} precio`);
    add(`cocina con isla en ${city} ideas y coste`);
    add(`reformar piso para alquiler vacacional en ${city}`);
    add(`materiales para reforma en ${city} donde comprar`);
  }

  const materialTopics = [
    'porcelanico para terraza exterior',
    'porcelanico antideslizante para piscina',
    'porcelanico efecto madera para salon',
    'porcelanico efecto marmol para bano',
    'porcelanico gran formato tendencias',
    'porcelanico rectificado vs no rectificado',
    'porcelanico 20mm para terraza',
    'gres porcelanico para suelo exterior',
    'griferia de cocina moderna',
    'griferia de bano negro mate',
    'griferia termostatica para ducha',
    'grifo de cocina extraible alto',
    'plato de ducha extraplano resina',
    'plato de ducha de porcelanico',
    'banera exenta instalacion y precio',
    'mampara de ducha corredera vs abatible',
    'mampara de ducha walk in',
    'inodoro suspendido ventajas y desventajas',
    'mueble de bano suspendido a medida',
    'encimera de cocina Silestone',
    'encimera de cocina Neolith',
    'encimera cuarzo vs granito cocina',
    'suelo porcelanico vs gres ceramico',
    'tarima flotante vs porcelanico salon',
    'iluminacion led empotrada en bano',
    'espejo con luz para bano',
    'mampara antical para ducha',
    'sanitarios compactos para bano pequeno',
    'griferia empotrada en pared bano',
    'ducha de obra vs plato de ducha',
  ];
  for (const topic of materialTopics) {
    add(`${topic} ${costa}`);
  }

  const comparisons = [
    'porcelanico vs ceramica en bano',
    'plato de ducha de resina vs ceramica',
    'mampara sin marco vs con marco',
    'cocina lacada vs melamina calidad',
    'encimera de cuarzo vs granito',
    'banera vs plato de ducha para bano pequeno',
    'suelo vinilico vs porcelanico',
    'microcemento vs porcelanico en bano',
    'griferia cromo vs negro mate',
    'porcelanico mate vs brillante',
    'porcelanico vs piedra natural exterior',
    'mueble de bano suspendido vs mueble de suelo',
    'campana extractora de techo vs de pared',
    'vitroceramica vs induccion en cocina',
    'ducha italiana vs plato de ducha standard',
  ];
  for (const topic of comparisons) {
    add(`${topic} cual elegir`);
  }

  const guides = [
    'tendencias en cocinas 2026',
    'tendencias en banos 2026',
    'colores de porcelanico tendencia 2026',
    'reforma integral por fases guia completa',
    'licencia de obra menor para reforma de bano en Malaga',
    'permisos de comunidad para reforma integral',
    'como elegir empresa de reformas en la costa',
    'errores comunes en reforma integral',
    'desglose de presupuesto reforma de cocina',
    'partidas de presupuesto reforma de bano',
    'porcelanico compatible con suelo radiante',
    'reforma de bano sin cambiar distribucion',
    'cocina pequena en forma de L distribucion',
    'cocina pequena en forma de U distribucion',
    'bano pequeno con plato de ducha en esquina',
    'cocina abierta al salon ventajas',
    'puerta corredera entre cocina y salon',
    'ventana en cocina reforma consideraciones',
    'plazos de fontaneria en reforma de bano',
    'normativa electrica en reforma de cocina',
    'reforma de cocina sin cambiar tuberias',
    'impermeabilizar ducha antes de alicatar',
    'alicatado de bano altura y normativa',
    'nivelar suelo antes de porcelanico',
    'juntas de porcelanico epoxi vs cemento',
    'porcelanico para escaleras exteriores',
    'reforma de local comercial en Malaga',
    'reforma de oficina pequena Benalmadena',
    'baño principal suite reforma ideas',
    'segundo bano reforma materiales economicos',
    'reforma cocina estilo nordico',
    'reforma bano estilo minimalista',
    'reforma integral estilo mediterraneo',
    'porcelanico tipo cemento para salon',
    'azulejo metro blanco bano clasico',
    'hidromasaje en bano vale la pena',
    'mampara con tratamiento antical',
    'griferia de lujo para cocina',
    'fregadero bajo encimera vs sobre encimera',
    'campana isla en cocina con isla',
    'almacenaje en cocina pequena soluciones',
    'armarios de cocina hasta el techo',
    'cajones interiores cocina organizacion',
    'enchufes en cocina altura y normativa',
    'reforma bano para personas mayores',
    'plato de ducha extra plano ventajas',
    'inodoro con doble descarga ahorro agua',
    'mueble lavabo doble para bano familiar',
    'espejo retroiluminado instalacion',
    'led perimetral techo bano',
    'revestimiento porcelanico pared ducha',
    'grout color juntas porcelanico elegir',
    'reforma piso comprado en Malaga',
    'reforma antes de vender piso Costa del Sol',
    'revalorizar vivienda con reforma cocina bano',
    'reforma integral expat en Espana guia',
    'contrato reforma que debe incluir',
    'pago por fases reforma integral',
    'garantia reforma integral que pedir',
    'visitar obra reforma que revisar',
    'elegir alicatador o empresa integral',
    'porcelanico para cocina suelo y pared',
    'falsos techos en bano con led',
    'mueble columnario cocina electrodomesticos',
    'nevera integrada medidas estandar',
    'lavavajillas integrado instalacion cocina',
    'isla cocina con zona desayuno taburetes',
    'encimera continua cocina y pared',
    'backplash cocina porcelanico vs vidrio',
    'suelo continuo salon cocina porcelanico',
    'puerta pivotante bano cristal',
    'mampara fija vs plegable bano pequeno',
    'reforma bano en semisotano humedades',
    'ventilacion bano sin ventana soluciones',
    'extractor bano silencioso reforma',
    'calefaccion bano suelo radiante electrico',
    'toallero electrico en bano reforma',
    'griferia empotrada techo ducha',
    'ducha efecto lluvia instalacion',
    'bañera y ducha en mismo bano',
    'separador wc bidet espacio minimo',
    'porcelanico wood look exterior terraza',
    'porcelanico stone look salon',
    'reforma cocina en casa de pueblo',
    'reforma bano en adosado Costa del Sol',
    'reforma integral chalet adosado',
    'reforma apartamento planta baja',
    'reforma atico terraza cubierta',
    'impermeabilizar terraza antes de porcelanico',
    'drenaje terraza exterior porcelanico',
    'porcelanico para jardin y terraza',
    'barandilla terraza reforma integracion suelo',
    'pergola y suelo porcelanico exterior',
    'cocina exterior summer kitchen Costa del Sol',
    'reforma baño invitados pequeño',
    'lavadero reforma materiales',
    'reforma integral piso 80m2 presupuesto orientativo',
    'reforma integral piso 100m2 coste',
    'reforma bano 4m2 ideas distribucion',
    'reforma bano 6m2 con banera y ducha',
    'cocina 12m2 con isla posible',
    'cocina lineal vs en L para piso estrecho',
    'reforma integral sin mudarse plazos',
    'ruidos reforma horarios comunidad',
    'proteccion suelos durante reforma',
    'limpieza final obra reforma checklist',
    'snagging lista revision reforma',
    'elegir tono porcelanico con mueble cocina',
    'combinar porcelanico salon y bano',
    'reforma bano hotel particular lujo',
    'reforma cocina restaurante pequeño Malaga',
    'materials showroom Benalmadena renovation',
    'buy porcelain tiles Malaga Costa del Sol',
    'kitchen renovation quote Marbella english',
    'bathroom renovation timeline Costa del Sol',
    'full renovation villa Marbella budget',
    'holiday let renovation ROI Costa del Sol',
    'frameless shower cost Benalmadena',
    'walk in shower design small bathroom',
    'kitchen island electrical requirements Spain',
    'renovation permits Andalusia expat guide',
    'best flooring for coastal humidity Spain',
    'anti slip tiles pool surround Spain',
    'outdoor kitchen tiles Costa del Sol',
    'renovation company english speaking Malaga',
  ];
  for (const topic of guides) {
    add(topic.includes('Costa') || topic.includes('Benalmadena') || topic.includes('Marbella') || topic.includes('Malaga') || topic.includes('Spain')
      ? topic
      : `${topic} ${costa}`);
  }

  return [...keywords];
}

module.exports = { buildSeedKeywords };
