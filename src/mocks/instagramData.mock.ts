export const instagramAgeData = [
    { label: '18-24', value: 50 },
    { label: '25-34', value: 35 },
    { label: '35+', value: 15 },
];

export const instagramGenderData = [
    { label: 'Masculino', value: 72 },
    { label: 'Femenino', value: 23 },
    { label: 'No especificado', value: 5 },
];

export const instagramLocationData = [
    { label: 'Argentina', value: 68 },
    { label: 'México', value: 18 },
    { label: 'Chile', value: 14 },
];

export const instagramInterestData = [
    { label: 'Fútbol', value: 90 },
    { label: 'Deportes', value: 70 },
    { label: 'Entretenimiento', value: 55 },
];

export const instagramPerformanceData = [
    { label: 'Seguidores', value: 105000 },
    { label: 'Publicaciones', value: 1046 },
];

export const instagramFollowers = instagramPerformanceData && instagramPerformanceData.length > 0
    ? `+${(instagramPerformanceData[0].value / 1000).toFixed(0)}k`
    : '+105k'; // Valor por defecto de Instagram