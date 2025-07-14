import * as Location from 'expo-location';

export const getAddressFromCoords = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<string | null> => {
  try {
    const addresses = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (addresses.length > 0) {
      const address = addresses[0];
      const fullAddress = `${address.name || ''}, ${address.street || ''}, ${
        address.city || ''
      }, ${address.region || ''}, ${address.country || ''}`
        .replace(/, ,/g, ',')
        .replace(/^,|,$/g, '');
      return fullAddress || null;
    }

    console.log('No address found for coordinates:', { latitude, longitude });
    return null;
  } catch (error) {
    console.error('Reverse geocode error:', error);
    return null;
  }
};