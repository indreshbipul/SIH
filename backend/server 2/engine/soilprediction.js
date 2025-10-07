const soilPropertyReference = {
    
  bdod: {
    label: "Bulk Density",
    unit: "g/cm³",
    idealRange: [1.1, 1.5],
    evaluate: (val) => {
      if (val < 1.1)
        return {
          status: "Too Low",
          suggestion:
            "Soil is too loose. It holds too much water and air does not move well. Mix some compost and plough lightly to make it firm.",
        };
      if (val > 1.6)
        return {
          status: "Too High",
          suggestion:
            "Soil is very hard. Roots cannot grow easily. Loosen the soil by deep ploughing and adding organic matter or dry leaves.",
        };
      return {
        status: "Ideal",
        suggestion:
          "Soil is in good condition. Roots can grow easily and water moves well.",
      };
    },
  },

  cec: {
    label: "Cation Exchange Capacity",
    unit: "cmol(+)/kg",
    idealRange: [10, 40],
    evaluate: (val) => {
      if (val < 10)
        return {
          status: "Low",
          suggestion:
            "Soil cannot hold enough nutrients. Add compost or manure to make it more fertile.",
        };
      return {
        status: "Ideal",
        suggestion:
          "Soil can hold and give nutrients to plants properly. This is good for crop growth.",
      };
    },
  },

  cfvo: {
    label: "Coarse Fragments",
    unit: "%",
    idealRange: [0, 15],
    evaluate: (val) => {
      if (val > 30)
        return {
          status: "High",
          suggestion:
            "Soil has too many stones. It is not good for crops with deep roots. Try removing big stones or grow crops with small roots.",
        };
      return {
        status: "Ideal",
        suggestion:
          "Soil has the right amount of stones. Roots can grow easily.",
      };
    },
  },

  clay: {
    label: "Clay Content",
    unit: "%",
    idealRange: [20, 35],
    evaluate: (val) => {
      if (val < 15)
        return {
          status: "Low",
          suggestion:
            "Soil is sandy. It cannot hold water well. Add compost or cow dung to improve water holding.",
        };
      if (val > 40)
        return {
          status: "High",
          suggestion:
            "Soil has too much clay. Water does not drain properly. Mix sand or organic matter to improve it.",
        };
      return {
        status: "Ideal",
        suggestion:
          "Clay level is good. Soil can hold both water and air for crops.",
      };
    },
  },

  nitrogen: {
    label: "Nitrogen",
    unit: "%",
    idealRange: [0.15, 0.5],
    evaluate: (val) => {
      if (val < 0.15)
        return {
          status: "Low",
          suggestion:
            "Soil needs more nitrogen. Use urea, cow dung, or compost to increase nitrogen for green leaf growth.",
        };
      return {
        status: "Ideal",
        suggestion: "Nitrogen level is good for healthy crop growth.",
      };
    },
  },

  ocd: {
    label: "Organic Carbon Density",
    unit: "Mg/m²",
    idealRange: [2, 10],
    evaluate: (val) => {
      if (val < 2)
        return {
          status: "Low",
          suggestion:
            "Soil has less organic matter. Add compost, green leaves, or grow cover crops to make it rich.",
        };
      return {
        status: "Ideal",
        suggestion:
          "Soil has good organic matter. It will stay fertile and soft.",
      };
    },
  },

  ocs: {
    label: "Organic Carbon Stock",
    unit: "Mg/ha",
    idealRange: [30, 80],
    evaluate: (val) => {
      if (val < 30)
        return {
          status: "Low",
          suggestion:
            "Soil needs more carbon. Add compost, crop waste, or animal manure to increase soil fertility.",
        };
      return {
        status: "Ideal",
        suggestion:
          "Soil has good carbon level. It can support crops for a long time.",
      };
    },
  },

  phh2o: {
    label: "pH (H₂O)",
    unit: "",
    idealRange: [6.0, 7.5],
    evaluate: (val) => {
      if (val < 5.5)
        return {
          status: "Acidic",
          suggestion:
            "Soil is too acidic. Add lime or wood ash to reduce acidity and help crops grow better.",
        };
      if (val > 7.5)
        return {
          status: "Alkaline",
          suggestion:
            "Soil is too alkaline. Mix compost or use sulfur fertilizer to make it normal.",
        };
      return {
        status: "Ideal",
        suggestion:
          "pH is perfect. Plants can take all nutrients easily and grow well.",
      };
    },
  },

  sand: {
    label: "Sand Content",
    unit: "%",
    idealRange: [30, 70],
    evaluate: (val) => {
      if (val < 20)
        return {
          status: "Low",
          suggestion:
            "Soil has less sand and stays wet for long. Mix some sand or compost to improve drainage.",
        };
      if (val > 70)
        return {
          status: "High",
          suggestion:
            "Soil is too sandy. It cannot hold water or fertilizer. Add compost, clay soil, or manure to hold more water.",
        };
      return {
        status: "Ideal",
        suggestion:
          "Sand level is good. Water drains properly and soil stays healthy.",
      };
    },
  },

  silt: {
    label: "Silt Content",
    unit: "%",
    idealRange: [10, 40],
    evaluate: (val) => {
      return {
        status: "OK",
        suggestion:
          "Silt helps soil stay soft and hold water. It is generally good for crops unless it is too high.",
      };
    },
  },

  soc: {
    label: "Soil Organic Carbon",
    unit: "%",
    idealRange: [0.75, 3],
    evaluate: (val) => {
      if (val < 0.75)
        return {
          status: "Low",
          suggestion:
            "Soil has less organic matter. Add compost, crop residue, or cow dung to make it healthy.",
        };
      return {
        status: "Ideal",
        suggestion:
          "Soil has good organic matter. It will hold water and nutrients well for crops.",
      };
    },
  },

  wv0010: {
    label: "Water Content (0.01 MPa)",
    unit: "cm³/cm³",
    evaluate: (val) => {
      return {
        status: "Informative",
        suggestion:
          "This shows how much water the soil can hold after rainfall. It helps know if soil stores enough water for crops.",
      };
    },
  },

  wv0033: {
    label: "Water Content (0.033 MPa)",
    unit: "cm³/cm³",
    evaluate: (val) => {
      return {
        status: "Informative",
        suggestion:
          "This shows how much water plants can use from the soil. It helps know if your soil needs irrigation often.",
      };
    },
  },

  wv1500: {
    label: "Water Content (1.5 MPa)",
    unit: "cm³/cm³",
    evaluate: (val) => {
      return {
        status: "Wilting Point",
        suggestion:
          "This shows the point where plants start drying because they cannot take more water from soil.",
      };
    },
  },
};

module.exports = soilPropertyReference;
