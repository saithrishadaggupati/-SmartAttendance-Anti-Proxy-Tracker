// A pure math utility to calculate earth surface distance between two coordinates.
// This is what stops students from scanning screenshots from their hostel rooms.

interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calculates the distance between two points on Earth using the Haversine formula.
 * Returns the distance in meters.
 */
export function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  const EARTH_RADIUS_METERS = 6371000; 

  // Convert degrees to radians
  const lat1Rad = (point1.latitude * Math.PI) / 180;
  const lat2Rad = (point2.latitude * Math.PI) / 180;
  
  const deltaLatRad = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const deltaLonRad = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  // The core Haversine calculation
  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in meters
  return EARTH_RADIUS_METERS * c;
}

/**
 * Checks if the student is within the allowed boundary (e.g., 100 meters).
 */
export function isWithinClassroom(
  studentLoc: Coordinates,
  classroomLoc: Coordinates,
  allowedRadiusMeters: number = 100
): boolean {
  const physicalDistance = calculateDistance(studentLoc, classroomLoc);
  return physicalDistance <= allowedRadiusMeters;
}
