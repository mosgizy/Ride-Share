
export interface MapCoordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Places{
  address: string;
  distance:number
}

export interface FromTo{
  from: string;
  to:string
}

export interface MapStore {
  userLocation: MapCoordinate | null;
  destination: MapCoordinate | null;
  otherUsers: MapCoordinate[];

  locationModal: boolean;
  locationPermission: boolean;
  recentPlaces: Places[];

  sideBarModal: boolean;
  setSideBarModal:(status:boolean) => void

  addressFromTo: FromTo | null;

  avatarPath: string,
  setAvatarPath:(path:string) => void

  setAddressFromTo:(address:FromTo) => void

  setRecentPlaces: (recentPlace:Places) => void;

  setUserLocation: (location: MapCoordinate) => void;
  setDestination: (location: MapCoordinate) => void;
  setOtherUsers: (users: MapCoordinate[]) => void;

  setLocationPermission: (permission: boolean) => void;
  setLocationModal: (modal: boolean) => void;
  clearLocations: () => void;
}

export interface CarInfo {
  id: string;
  name: string;
  model: string;
  capacity: number;
  color: string;
  fuel_type: 'Petrol' | 'Diesel' | 'Electric' | 'Octane' | 'Hybrid';
  gear_type: 'Automatic' | 'Manual';
  distance: string;
  rating: number;
  reviews: number;
  max_power: string;      
  zero_to_sixty: string;   
  tank_size: string;      
  max_speed: string;      
  image: string;
  car_image:string
}

export interface RentStore{
  bookedCar: CarInfo | null;
  bookLater: CarInfo[];
  date: Date | null
  driverStatus: boolean;
  setDriverStatus: (status: boolean) => void;
  setDate:(date:Date) => void
  setBooked: (car: CarInfo) => void
  setBookLater: (car:CarInfo) => void
}

