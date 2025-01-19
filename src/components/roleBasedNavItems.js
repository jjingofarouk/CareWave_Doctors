const roleBasedNavItems = {
  patient: [
    {
      title: 'Health Dashboard',
      icon: 'heart',
      items: [
        { href: 'patient_dashboard', label: 'Dashboard', icon: 'view-dashboard' },
        { href: 'vitals', label: 'Vital Signs', icon: 'heartbeat' },
      ],
    },
    {
      title: 'Appointments & Consultations',
      icon: 'calendar-check',
      items: [
        { href: 'book', label: 'Book Appointment', icon: 'calendar-plus' },
        { href: 'rebook', label: 'Rebook Appointment', icon: 'calendar-refresh' },
        { href: 'consultations', label: 'Start Consultation', icon: 'chat' },
      ],
    },
    {
      title: 'Health Records & Care',
      icon: 'file-document',
      items: [
        { href: 'labs', label: 'My Labs', icon: 'clipboard-text' },
        { href: 'meds', label: 'Medications', icon: 'pill' },
        { href: 'cares', label: 'Care Plan', icon: 'heart-circle' },
        { href: 'chronics', label: 'Chronics Tracker', icon: 'history' },
      ],
    },
    {
      title: 'Support & Education',
      icon: 'brain',
      items: [
        { href: 'forum', label: 'Patient Community', icon: 'account-group' },
        { href: 'dictionary', label: 'Medical Dictionary', icon: 'book-open' },
        { href: 'feedback', label: 'Provide Feedback', icon: 'comment-edit' },
      ],
    },
  ],
  doctor: [
    {
      title: 'Patient Management',
      icon: 'heart',
      items: [
        { href: 'appointments', label: 'Appointments', icon: 'calendar-check' },
        { href: 'consultation', label: 'Consultations', icon: 'stethoscope' },
        { href: 'care-plans', label: 'Care Plans', icon: 'file-edit' },
      ],
    },
    {
      title: 'Clinical Tools',
      icon: 'stethoscope',
      items: [
        { href: 'calculators', label: 'Calculators', icon: 'calculator' },
        { href: 'ucg', label: 'Guidelines', icon: 'book' },
        { href: 'cases', label: 'Case Studies', icon: 'folder' },
      ],
    },
    {
      title: 'Medical Records',
      icon: 'file-document',
      items: [
        { href: 'visits', label: 'Patient Visits', icon: 'clipboard-list' },
        { href: 'labs', label: 'Lab Results', icon: 'test-tube' },
        { href: 'prescriptions', label: 'Prescriptions', icon: 'pill' },
      ],
    },
    {
      title: 'Practice & Analytics',
      icon: 'bar-chart',
      items: [
        { href: 'scheduler', label: 'Smart Scheduler', icon: 'clock' },
        { href: 'billing', label: 'Billing', icon: 'cash' },
        { href: 'analytics', label: 'Analytics', icon: 'chart-line' },
      ],
    },
    {
      title: 'Collaboration',
      icon: 'account-group',
      items: [
        { href: 'network', label: 'Network', icon: 'wifi' },
        { href: 'refer', label: 'Referrals', icon: 'account-arrow-right' },
        { href: 'files', label: 'Share Files', icon: 'file-share' },
      ],
    },
  ],
  hospital: [
    {
      title: 'Operations Hub',
      icon: 'view-dashboard',
      items: [
        { href: 'command', label: 'Command Center', icon: 'control' },
        { href: 'capacity-management', label: 'Capacity Management', icon: 'group' },
        { href: 'resource-allocation', label: 'Resource Allocation', icon: 'cogs' },
        { href: 'staff-scheduling', label: 'Staff Scheduling', icon: 'calendar-clock' },
      ],
    },
    {
      title: 'Patient Flow Management',
      icon: 'human-heart',
      items: [
        { href: 'admissions', label: 'Smart Admissions', icon: 'hospital-building' },
        { href: 'beds', label: 'Bed Management', icon: 'bed' },
        { href: 'patient-flow', label: 'Patient Flow Tracker', icon: 'map' },
      ],
    },
    {
      title: 'TeleRounds & Data',
      icon: 'video',
      items: [
        { href: 'rounds', label: 'Virtual Rounds', icon: 'video-camera' },
        { href: 'predictive-analytics', label: 'Predictive Analytics', icon: 'graph' },
      ],
    },
    {
      title: 'Support & Community',
      icon: 'globe',
      items: [
        { href: 'patient-education', label: 'Patient Education Portal', icon: 'school' },
        { href: 'community-partnerships', label: 'Partnerships', icon: 'handshake' },
      ],
    },
  ],
};

export default roleBasedNavItems;
