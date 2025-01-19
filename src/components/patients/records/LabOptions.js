const labOptions = [
    { name: 'Complete Blood Count (CBC)', components: [
      { name: 'White Blood Cell (WBC)', range: '4.5-11.0 x10^9/L' },
      { name: 'Red Blood Cell (RBC)', range: '4.5-5.9 x10^12/L' },
      { name: 'Hemoglobin', range: '13.5-17.5 g/dL' },
      { name: 'Hematocrit', range: '41-53%' },
      { name: 'Platelets', range: '150-450 x10^9/L' }
    ]},
    { name: 'Metabolic Panel', components: [
      { name: 'Glucose', range: '70-99 mg/dL' },
      { name: 'Calcium', range: '8.6-10.3 mg/dL' },
      { name: 'Sodium', range: '135-145 mmol/L' },
      { name: 'Potassium', range: '3.5-5.0 mmol/L' },
      { name: 'CO2', range: '23-29 mmol/L' },
      { name: 'Chloride', range: '98-107 mmol/L' },
      { name: 'BUN', range: '7-20 mg/dL' },
      { name: 'Creatinine', range: '0.6-1.2 mg/dL' },
      { name: 'Albumin', range: '3.4-5.4 g/dL' },
      { name: 'Total Bilirubin', range: '0.1-1.2 mg/dL' },
      { name: 'ALP', range: '20-140 U/L' },
      { name: 'ALT', range: '7-56 U/L' },
      { name: 'AST', range: '10-40 U/L' }
    ]},
    { name: 'Lipid Panel', components: [
      { name: 'Total Cholesterol', range: '<200 mg/dL' },
      { name: 'LDL Cholesterol', range: '<100 mg/dL' },
      { name: 'HDL Cholesterol', range: '>60 mg/dL' },
      { name: 'Triglycerides', range: '<150 mg/dL' }
    ]},
    { name: 'Thyroid Function Tests', components: [
      { name: 'TSH', range: '0.4-4.0 mIU/L' },
      { name: 'Free T4', range: '0.8-1.8 ng/dL' },
      { name: 'Free T3', range: '2.3-4.2 pg/mL' }
    ]},
    { name: 'Hemoglobin A1C', components: [
      { name: 'HbA1c', range: '<5.7%' }
    ]},
    { name: 'Vitamin D', components: [
      { name: '25-OH Vitamin D', range: '30-100 ng/mL' }
    ]},
    { name: 'Prostate-Specific Antigen (PSA)', components: [
      { name: 'PSA', range: '<4.0 ng/mL' }
    ]},
    { name: 'C-Reactive Protein (CRP)', components: [
      { name: 'CRP', range: '<3.0 mg/L' }
    ]},
    { name: 'Urinalysis', components: [
      { name: 'pH', range: '4.5-8.0' },
      { name: 'Specific Gravity', range: '1.005-1.030' },
      { name: 'Protein', range: 'Negative' },
      { name: 'Glucose', range: 'Negative' },
      { name: 'Ketones', range: 'Negative' },
      { name: 'Blood', range: 'Negative' },
      { name: 'Leukocyte Esterase', range: 'Negative' },
      { name: 'Nitrite', range: 'Negative' }
    ]}
  ];
