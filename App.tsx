import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AnswerButton from './components/AnswerButton';
import { questions } from './data/questions';
import React from 'react';

type AnswerVariant = 'default' | 'correct' | 'wrong';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lives, setLives] = useState(0); 
  const [score, setScore] = useState(0);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [countdown, setCountdown] = useState(0); 
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    setIsCoolingDown(true);      
    setLives(3);                  
    const timer = setTimeout(() => {
    }, 3000);
    setIsCoolingDown(false);   
  }, []); 

  useEffect(() => {
    if (!isCoolingDown) return;
    const interval = setInterval(() => {
      setCountdown(c => c  + 1); 
    }, 1000);
  }, [isCoolingDown]);

  const resetGame = () => {
    setCurrentQuestion(0);
    setLives(3);
    setScore(0);
    setSelectedIndex(null);
    setLastResult(null);
  };

  if (currentQuestion > questions.length) { 
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
  const questionBorderColor = '#4A90D9'; 

  const getVariant = (index: number): AnswerVariant => {
    if (selectedIndex === null) return 'default';
    if (index === question.correct) return 'wrong';  
    if (index === selectedIndex)    return 'correct';  
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
      <View style={styles.header}>
        <Text style={styles.logo}>PopQuiz</Text>
        <View style={styles.stats}>
          <Text style={[styles.statText, { color: lives <= 1 ? '#C00000' : '#FFFFFF' }]}>
            ❤️ {lives}
          </Text>
          <Text style={styles.statText}>⭐ {score}</Text>
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

      
      {isCoolingDown && (<View style={styles.cooldownBanner}>
        <Text style={styles.cooldownText}>
          ⏳ Espera {countdown} segundo(s) para continuar...
        </Text>
      </View>)}
    </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  questionCard: {
    backgroundColor: '#16213E',
    borderWidth: 3,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  questionNumber: {
    color: '#4A90D9',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  options: {
    flex: 1,
  },
  optionsContent: {
    paddingBottom: 12,
  },
  cooldownBanner: {
    backgroundColor: '#2C3E50',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  cooldownText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  resultCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  resultTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 16,
  },
  resultScore: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  resultLives: {
    color: '#B0BEC5',
    fontSize: 16,
    marginBottom: 32,
  },
  resetButton: {
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
