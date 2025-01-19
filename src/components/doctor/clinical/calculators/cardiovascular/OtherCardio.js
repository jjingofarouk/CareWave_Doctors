




export const calculateTIMI = (age, diabetes, chestPain, hypertension, heartFailure, setResult) => {
  let score = 0;
  score += parseInt(age) >= 65 ? 1 : 0;
  score += diabetes ? 1 : 0;
  score += chestPain ? 1 : 0;
  score += hypertension ? 1 : 0;
  score += heartFailure ? 1 : 0;

  setResult(prev => ({ ...prev, TIMI: score }));
};

export const calculateSCORE = (age, cholesterol, systolicBP, smoking, setResult) => {
  const ageNum = parseInt(age);
  const cholesterolNum = parseInt(cholesterol);
  const systolicBPNum = parseInt(systolicBP);

  let score = 0;
  if (ageNum >= 50) score += 1;
  score += cholesterolNum > 240 ? 1 : 0;
  score += systolicBPNum > 140 ? 1 : 0;
  score += smoking ? 1 : 0;

  setResult(prev => ({ ...prev, SCORE: score }));
};

export const calculateQTc = (heartRate, qtInterval, setResult) => {
  const heartRateNum = parseInt(heartRate);
  const qtIntervalNum = parseFloat(qtInterval);

  if (isNaN(heartRateNum) || isNaN(qtIntervalNum)) {
    alert("Please enter valid numbers for heart rate and QT interval.");
    return;
  }

  const qtc = qtIntervalNum / Math.sqrt(heartRateNum / 60);
  setResult(prev => ({ ...prev, QTc: qtc.toFixed(2) }));
};

export const calculateAorticStenosis = (aorticGradient, aorticArea, setResult) => {
  const aorticGradientNum = parseInt(aorticGradient);
  const aorticAreaNum = parseFloat(aorticArea);

  if (isNaN(aorticGradientNum) || isNaN(aorticAreaNum)) {
    alert("Please enter valid numbers for aortic gradient and area.");
    return;
  }

  const stenosisRisk = (aorticGradientNum / aorticAreaNum) * 100;
  setResult(prev => ({ ...prev, AorticStenosis: stenosisRisk.toFixed(2) }));
};
