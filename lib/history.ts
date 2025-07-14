type History = {
  id: number;
  name: string;
  car: string;
  time?: string;
  status?: string;
};

export type HistoryCategory = 'upcoming' | 'completed' | 'cancelled';


export const histories: Record<HistoryCategory, History[]> = {
  upcoming: [
    {
      id: 1,
      name: 'Nate',
      car: 'Mustang Shelby GT',
      time: 'Today at 09:20 am',
    },
    {
      id: 2,
      name: 'Henry',
      car: 'Mustang Shelby GT',
      time: 'Today at 10:20 am',
    },
    {
      id: 3,
      name: 'Willam',
      car: 'Mustang Shelby GT',
      time: 'Tomorrow at 09:20 am',
    },
    {
      id: 4,
      name: 'Nate',
      car: 'Mustang Shelby GT',
      time: 'Today at 09:20 am',
    },
    {
      id: 5,
      name: 'Henry',
      car: 'Mustang Shelby GT',
      time: 'Today at 10:20 am',
    },
    {
      id: 6,
      name: 'Willam',
      car: 'Mustang Shelby GT',
      time: 'Tomorrow at 09:20 am',
    },
  ],
  completed: [
    {
      id: 7,
      name: 'Nate',
      car: 'Mustang Shelby GT',
      status: 'Done',
    },
    {
      id: 8,
      name: 'Henry',
      car: 'Mustang Shelby GT',
      status: 'Done',
    },
    {
      id: 9,
      name: 'Willam',
      car: 'Mustang Shelby GT',
      status: 'Done',
    },
    {
      id: 10,
      name: 'Nate',
      car: 'Mustang Shelby GT',
      status: 'Done',
    },
    {
      id: 11,
      name: 'Henry',
      car: 'Mustang Shelby GT',
      status: 'Done',
    },
    {
      id: 12,
      name: 'Willam',
      car: 'Mustang Shelby GT',
      status: 'Done',
    },
  ],
  cancelled: [
    {
      id: 13,
      name: 'Nate',
      car: 'Mustang Shelby GT',
      status: 'Cancel',
    },
    {
      id: 14,
      name: 'Henry',
      car: 'Mustang Shelby GT',
      status: 'Cancel',
    },
    {
      id: 15,
      name: 'Willam',
      car: 'Mustang Shelby GT',
      status: 'Cancel',
    },
    {
      id: 16,
      name: 'Nate',
      car: 'Mustang Shelby GT',
      status: 'Cancel',
    },
    {
      id: 17,
      name: 'Henry',
      car: 'Mustang Shelby GT',
      status: 'Cancel',
    },
    {
      id: 18,
      name: 'Willam',
      car: 'Mustang Shelby GT',
      status: 'Cancel',
    },
  ],
};
