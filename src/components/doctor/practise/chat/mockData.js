// src/constants/mockData.js
export const MOCK_DOCTORS = [
    {
      id: 'dr_smith',
      name: 'Dr. Emily Smith',
      specialty: 'General Practitioner',
      avatar: 'https://example.com/doctor-avatar.jpg',
      status: 'online',
      hospital: 'Central Hospital',
      availability: {
        online: true,
        nextAvailable: new Date(),
      }
    },
    // Add more mock doctors...
  ];