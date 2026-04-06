export const instagramAgeData = [
    { label: '13-17', value: 21 },
    { label: '18-24', value: 28 },
    { label: '25-34', value: 33 },
    { label: '35+', value: 9.2 },
];

export const instagramGenderData = [
    { label: 'Masculino', value: 90.6 },
    { label: 'Femenino', value: 9.4 },
    { label: 'No especificado', value: 0 },
];

export const instagramLocationData = [
    { label: 'Argentina', value: 43 },
    { label: 'México', value: 21 },
    { label: 'Chile', value: 6 },
    { label: 'España', value: 4 },
];

export const instagramInterestData = [
    { label: 'Reels', value: 98 },
    { label: 'Stories', value: 2 },
];

export const instagramPerformanceData = [
    { label: 'Seguidores', value: 105000 },
    { label: 'Publicaciones', value: 1056 },
];

export const instagramFollowers = instagramPerformanceData && instagramPerformanceData.length > 0
    ? `+${(instagramPerformanceData[0].value / 1000).toFixed(0)}k`
    : '+105k'; // Valor por defecto de Instagram