export const FILTERS = {
    literature: [
      { id: 'All', label: 'All' },
      { id: 'journal', label: 'Journal Articles' },
      { id: 'review', label: 'Review Articles' },
      { id: 'clinical', label: 'Clinical Studies' },
      { id: 'meta', label: 'Meta Analyses' },
      { id: 'rct', label: 'RCTs' },
      { id: 'guidelines', label: 'Guidelines' }
    ],
    trials: [
      { id: 'All', label: 'All' },
      { id: 'recruiting', label: 'Recruiting' },
      { id: 'completed', label: 'Completed' },
      { id: 'active', label: 'Active' },
      { id: 'phase1', label: 'Phase 1' },
      { id: 'phase2', label: 'Phase 2' },
      { id: 'phase3', label: 'Phase 3' },
      { id: 'phase4', label: 'Phase 4' }
    ]
  };
  
  export const SORT_OPTIONS = {
    literature: [
      { id: 'relevance', label: 'Relevance' },
      { id: 'date', label: 'Date' },
      { id: 'citations', label: 'Citations' },
      { id: 'impact', label: 'Impact Factor' }
    ],
    trials: [
      { id: 'relevance', label: 'Relevance' },
      { id: 'start_date', label: 'Start Date' },
      { id: 'last_updated', label: 'Last Updated' },
      { id: 'enrollment', label: 'Enrollment Size' }
    ]
  };