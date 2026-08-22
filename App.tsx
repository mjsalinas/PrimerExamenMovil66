import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AnswerButton from './components/AnswerButton';
import { questions } from './data/questions';

type AnswerVariant = 'default' | 'correct' | 'wrong';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);

  // useEffect 1: detecta lives === 0 y activa cooldown
  useEffect(() => {
    if (lives !== 0) return;
    setIsCoolingDown(true);
    setCountdown(3);
    const timer = setTimeout(() => {
      setIsCoolingDown(false);
      setLives(3);
    }, 3000);
    return () => clearTimeout(timer);
  }, [lives]);

  // useEffect 2: maneja cuenta regresiva con setInterval
  useEffect(() => {
    if (!isCoolingDown) return;
    const interval = setInterval(() => {
      setCountdown(c => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCoolingDown]);

  const resetGame = () => {
    setCurrentQuestion(0);
    setLives(3);
    setScore(0);
    setSelectedIndex(null);
    setLastResult(null);
  };

  if (currentQuestion >= questions.length) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>¡Fin del juego!</Text>
            <Text style={styles.resultScore}>
              Puntaje: {score} / {questions.length}
            </Text>
            <Text style={styles.resultLives}>Vidas restantes: {lives}</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
              <Text style={styles.resetButtonText}>Jugar de nuevo</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const question = questions[currentQuestion];

  const questionBorderColor =
    lastResult === 'correct' ? '#4CAF50' :
    lastResult === 'wrong'   ? '#E53935' :
    '#4A90D9';

  const getVariant = (index: number): AnswerVariant => {
    if (selectedIndex === null) return 'default';
    if (index === question.correct) return 'correct';
    if (index === selectedIndex)    return 'wrong';
    return 'default';
  };

  const handleAnswer = (index: number) => {
    if (selectedIndex !== null || isCoolingDown) return;

    setSelectedIndex(index);

    if (index === question.correct) {
      setLastResult('correct');
      setScore(score + 1);
    } else {
      setLastResult('wrong');
      setLives(lives - 1);
    }

    setTimeout(() => {
      setSelectedIndex(null);
      setLastResult(null);
      setCurrentQuestion(currentQuestion + 1);
    }, 800);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.logo}>PopQuiz</Text>
          <View style={styles.stats}>
            <Text style={[styles.statText, { color: lives <= 1 ? '#C00000' : '#FFFFFF' }]}>
              {'❤️ '.repeat(lives).trim()}
            </Text>
            <Text style={styles.statText}>Puntaje: {score} / 10</Text>
          </View>
        </View>

        <View style={[styles.questionCard, { borderColor: questionBorderColor }]}>
          <Text style={styles.questionNumber}>
            Pregunta {currentQuestion + 1} de {questions.length}
          </Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <ScrollView style={styles.options} contentContainerStyle={styles.optionsContent}>
          {question.options.map((option, index) => (
            <AnswerButton
              key={index}
              label={option}
              onPress={() => handleAnswer(index)}
              disabled={isCoolingDown || selectedIndex !== null}
              variant={getVariant(index)}
            />
          ))}
        </ScrollView>

        {isCoolingDown && (
          <View style={styles.cooldownBanner}>
            <Text style={styles.cooldownText}>
              ⏳ Espera {countdown} segundo(s) para continuar...
            </Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}