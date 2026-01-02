import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Vibration,
  AppState,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sound from 'react-native-sound';
import { useAlarms, useAccelerometer } from '@noescape/shared';
import { COLORS, SPACING, FONT_SIZES } from '@noescape/shared';
import type { MathChallenge, WalkChallenge } from '@noescape/shared';
import Button from '@noescape/shared';
import NumberPad from '@noescape/shared';
import VolumeIndicator from '@noescape/shared';
import StepCounter from '@noescape/shared';
import { AlarmRingScreenProps } from '../navigation/types';

// Enable playback in silence mode
Sound.setCategory('Playback');

const AlarmRingScreen: React.FC<AlarmRingScreenProps> = ({ route, navigation }) => {
  const { alarm } = route.params;
  const { regenerateChallenge } = useAlarms();
  const { steps, startListening, stopListening, resetSteps } = useAccelerometer({
    threshold: 2,
    debounceTime: 300,
  });

  const [volume, setVolume] = useState(30);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const soundRef = useRef<Sound | null>(null);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Prevent back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    // Start sound
    playAlarmSound();

    // Start volume progression
    startVolumeProgression();

    // Start step counter if walk challenge
    if (alarm.challenge.type === 'walk') {
      startListening();
    }

    return () => {
      backHandler.remove();
      stopAlarmSound();
      stopListening();
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current);
      }
    };
  }, []);

  const playAlarmSound = () => {
    try {
      const sound = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load sound', error);
          return;
        }
        sound.setNumberOfLoops(-1); // Loop infinitely
        sound.setVolume(volume / 100);
        sound.play();
      });
      soundRef.current = sound;
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopAlarmSound = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
      soundRef.current = null;
    }
  };

  const startVolumeProgression = () => {
    volumeIntervalRef.current = setInterval(() => {
      setVolume((prev) => {
        const newVolume = Math.min(prev + 5, 100);
        if (soundRef.current) {
          soundRef.current.setVolume(newVolume / 100);
        }
        return newVolume;
      });
    }, 10000); // Increase every 10 seconds
  };

  useEffect(() => {
    // Check walk challenge completion
    if (alarm.challenge.type === 'walk' && !isComplete) {
      const walkChallenge = alarm.challenge as WalkChallenge;
      if (steps >= walkChallenge.requiredSteps) {
        handleComplete();
      }
    }
  }, [steps, isComplete]);

  const handleNumberPress = (number: number) => {
    setUserAnswer((prev) => prev + number.toString());
  };

  const handleDelete = () => {
    setUserAnswer((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUserAnswer('');
  };

  const handleSubmit = async () => {
    if (alarm.challenge.type === 'math') {
      const mathChallenge = alarm.challenge as MathChallenge;
      const answer = parseInt(userAnswer, 10);

      if (isNaN(answer)) {
        setError('Entrez une réponse');
        Vibration.vibrate(500);
        return;
      }

      if (answer === mathChallenge.answer) {
        handleComplete();
      } else {
        setError('Réponse incorrecte! Réessayez');
        setUserAnswer('');
        Vibration.vibrate([100, 100, 100, 100, 500]);
        await regenerateChallenge(alarm.id);
      }
    }
  };

  const handleComplete = () => {
    setIsComplete(true);
    stopAlarmSound();
    stopListening();
    Vibration.vibrate([100, 50, 100]);

    setTimeout(() => {
      navigation.navigate('Home');
    }, 1500);
  };

  const renderMathChallenge = () => {
    const mathChallenge = alarm.challenge as MathChallenge;
    return (
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeTitle}>Résolvez cette opération</Text>
        <View style={styles.mathExpression}>
          <Text style={styles.mathNumber}>{mathChallenge.operand1}</Text>
          <Text style={styles.mathOperator}>{mathChallenge.operator}</Text>
          <Text style={styles.mathNumber}>{mathChallenge.operand2}</Text>
          <Text style={styles.mathOperator}>=</Text>
          <Text style={styles.mathNumber}>{userAnswer || '?'}</Text>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.numberPadContainer}>
          <NumberPad
            onNumberPress={handleNumberPress}
            onDeletePress={handleDelete}
            onClearPress={handleClear}
            onSubmitPress={handleSubmit}
            disabled={isComplete}
          />
        </View>
      </View>
    );
  };

  const renderWalkChallenge = () => {
    const walkChallenge = alarm.challenge as WalkChallenge;
    return (
      <View style={styles.challengeContainer}>
        <Text style={styles.challengeTitle}>Marchez pour désactiver</Text>
        <Text style={styles.challengeSubtitle}>
          Secouez votre téléphone pour détecter les pas
        </Text>
        <StepCounter
          current={steps}
          required={walkChallenge.requiredSteps}
        />
        <View style={styles.walkInstructions}>
          <Text style={styles.instructionText}>🚶‍♂️ Gardez votre téléphone en main</Text>
          <Text style={styles.instructionText}>👟 Marchez normalement</Text>
          <Text style={styles.instructionText}>✅ Le compteur s'incrémente automatiquement</Text>
        </View>
      </View>
    );
  };

  if (isComplete) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeIcon}>✅</Text>
          <Text style={styles.completeText}>Alarme désactivée!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Text style={styles.time}>{alarm.time}</Text>
        {alarm.label && <Text style={styles.label}>{alarm.label}</Text>}

        <VolumeIndicator volume={volume} maxVolume={100} />

        <Text style={styles.volumeText}>Volume: {volume}%</Text>

        <View style={styles.challengeWrapper}>
          {alarm.challenge.type === 'math' ? renderMathChallenge() : renderWalkChallenge()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  time: {
    fontSize: 80,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 4,
    marginTop: SPACING.xl,
  },
  label: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  volumeText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.alarm,
    marginTop: SPACING.md,
    fontWeight: 'bold',
  },
  challengeWrapper: {
    flex: 1,
    width: '100%',
    marginTop: SPACING.lg,
  },
  challengeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  challengeSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  mathExpression: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mathNumber: {
    fontSize: FONT_SIZES.huge,
    fontWeight: 'bold',
    color: COLORS.white,
    minWidth: 60,
    textAlign: 'center',
  },
  mathOperator: {
    fontSize: FONT_SIZES.huge,
    fontWeight: 'bold',
    color: COLORS.alarm,
  },
  error: {
    fontSize: FONT_SIZES.md,
    color: COLORS.alarm,
    marginBottom: SPACING.md,
    fontWeight: 'bold',
  },
  numberPadContainer: {
    width: '100%',
  },
  walkInstructions: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.secondary,
    padding: SPACING.lg,
    borderRadius: 4,
  },
  instructionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.lightGray,
    marginBottom: SPACING.sm,
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeIcon: {
    fontSize: 120,
    marginBottom: SPACING.lg,
  },
  completeText: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.success,
    letterSpacing: 2,
  },
});

export default AlarmRingScreen;
