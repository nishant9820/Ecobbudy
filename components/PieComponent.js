import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const PieChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Normalize data to calculate percentages
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const normalizedData = data.map((entry) => ({
      ...entry,
      percentage: (entry.value / total) * 100,
    }));

    setChartData(normalizedData);
  }, [data]);

  return (
    <View style={styles.chartContainer}>
      {chartData.map((entry, index) => (
        <View
          key={index}
          style={[
            styles.chartSegment,
            { backgroundColor: entry.color || getRandomColor() },
            {
              transform: [{ rotate: `${(index / chartData.length) * 360}deg` }],
            },
          ]}
        >
          <Text style={styles.chartLabel}>{entry.name}</Text>
          <Text style={styles.chartPercentage}>{`${entry.percentage.toFixed(
            1
          )}%`}</Text>
        </View>
      ))}
    </View>
  );
};

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const styles = StyleSheet.create({
  chartContainer: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
    borderRadius: Dimensions.get("window").width / 4,
    borderColor: "#fff",
    borderWidth: 2,
    overflow: "hidden",
    position: "relative",
  },
  chartSegment: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  chartLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  chartPercentage: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
});

export default PieChart;
