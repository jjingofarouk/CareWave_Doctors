import React, { useState } from "react";
import { Card, CardContent, CardHeader, TextField, Button, FormControlLabel, Checkbox, Typography } from "@mui/material";

const OsteoporosisRiskCalculator = () => {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [familyHistory, setFamilyHistory] = useState(false);
  const [historyOfFractures, setHistoryOfFractures] = useState(false);
  const [risk, setRisk] = useState(null);

  const calculateOsteoporosisRisk = () => {
    // Mock risk calculation
    let riskScore = (age / 10) + (gender === "female" ? 1 : 0) + (familyHistory ? 1 : 0) + (historyOfFractures ? 1 : 0);
    setRisk(riskScore);
  };

  const resetFields = () => {
    setAge(0);
    setGender("male");
    setFamilyHistory(false);
    setHistoryOfFractures(false);
    setRisk(null);
  };

  return (
    <Card>
      <CardHeader title="Osteoporosis Risk Assessment" />
      <CardContent>
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(Math.max(0, Number(e.target.value)))} // Ensure positive values
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={<Checkbox checked={familyHistory} onChange={() => setFamilyHistory(!familyHistory)} />}
          label="Family History of Osteoporosis"
        />
        <FormControlLabel
          control={<Checkbox checked={historyOfFractures} onChange={() => setHistoryOfFractures(!historyOfFractures)} />}
          label="Personal History of Fractures"
        />
        <Button variant="contained" onClick={calculateOsteoporosisRisk} fullWidth>
          Calculate Osteoporosis Risk
        </Button>
        {risk !== null && (
          <Typography variant="h6" style={{ marginTop: "16px" }}>
            Osteoporosis Risk Score: {risk.toFixed(2)}
          </Typography>
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={resetFields}
          fullWidth
          style={{ marginTop: "8px" }}
        >
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};

export default OsteoporosisRiskCalculator;
