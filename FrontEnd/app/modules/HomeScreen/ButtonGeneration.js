import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RoundButton from '../../components/buttons/RoundButton'; // Adjust path if needed

// Icon Imports
import BladderIcon from '../../assets/MedIcons/Bladder.svg'; // Adjust path if needed
import BrainIcon from '../../assets/MedIcons/brain.svg';
import HeartIcon from '../../assets/MedIcons/Heart.svg';
import LiverIcon from '../../assets/MedIcons/Liver.svg';
import LungIcon from '../../assets/MedIcons/Lung.svg';
import MuscleIcon from '../../assets/MedIcons/Muscle.svg';
import StomachIcon from '../../assets/MedIcons/Stomach.svg';
import ThyroidIcon from '../../assets/MedIcons/Thyroid.svg';
import UnionIcon from '../../assets/MedIcons/Union.svg';
import WombIcon from '../../assets/MedIcons/Womb.svg';

function ButtonGeneration() {
  const icons = [
    BladderIcon, BrainIcon, HeartIcon, LiverIcon, LungIcon, 
    MuscleIcon, StomachIcon, ThyroidIcon, UnionIcon, WombIcon,
  ];

  const labels = [
    "Urologist",
    "Psychologist",
    "Cardiologist",
    "Hepatologist",
    "Pulmonologist",
    "Orthopedist",
    "Gastrologist",
    "Endocrinologist"
  ];

  const buttons = [];
  
  for (let i = 0; i < 8; i++) {
    const IconComponent = icons[i];
    let labelText = labels[i];

    if (labelText.length > 12) {
      labelText = labelText.substring(0, 10) + '...';
    }

    buttons.push(
      <View key={i} style={styles.buttonWrapper}>
        <RoundButton
          icon={<IconComponent width={33} height={33} style={{ color: '#417FFF' }} />}
        />
        <Text style={styles.labelText} numberOfLines={1}>
          {labelText}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {buttons}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: 12, 
    paddingHorizontal: 10,

    // --- TO MOVE BUTTONS UP OR DOWN, EDIT HERE ---
    alignContent: 'center', // Change to 'flex-start' (top) or 'flex-end' (bottom)
    paddingTop: 0,          // If using 'flex-start', increase this number to push grid down
    // ---------------------------------------------
  },
  buttonWrapper: {
    alignItems: 'center',
    gap: 8,
    width: '22%', 
  },
  labelText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center', 
  }
});

export default ButtonGeneration;