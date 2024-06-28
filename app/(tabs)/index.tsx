import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Leaderboard from 'react-native-leaderboard';
import { useState } from 'react';

export default function HomeScreen() {

  const rand: number = Math.floor(Math.random() * 525);
  const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  let [current, setCurrent] = useState(1);
  const [currentQuiz, setCurrentQuiz] = useState(rand);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState([{}]);
  const quiz = require('../../assets/json/quiz.json');

  const handleAns = (selectAns: string) => {
    console.log(leaderBoard);
    if(quiz[currentQuiz]?.answer === selectAns){
      setScore((prevScore: number) => prevScore + 1);
      
    }
    
    const nextQuiz = rand;
    if(current < 20){
      setCurrent(current + 1);
      setCurrentQuiz(nextQuiz);
    }
    else{
      leaderBoard.push({
        timestamp: `${new Date().getTime()}`,
        score: score
      })
      setShowScore(true);
    }
  }

  const handleReset = () => {
    setCurrent(1);
    setScore(0);
    setCurrentQuiz(rand);
    setShowScore(false);
    console.log(leaderBoard);
    
  }


  return (
    <View style={styles.container}>
      { showScore ? 
        <View style={styles.container_score}>
          <Text style={styles.score}> {score} </Text>
          <TouchableOpacity style={styles.answerContainer} onPress={() => handleReset()}>  
            <Text style={styles.resetButton}> Reset </Text>
          </TouchableOpacity>
          <View>
            <Leaderboard style={styles.leaderBoard} data={leaderBoard} sortBy='score' labelBy='timestamp'/>
          </View>
        </View>
      : <View style={styles.quiz}>
          <Text style={styles.fontquiz}> {current}. { quiz[currentQuiz]?.question} </Text>
          <TouchableOpacity style={styles.answerContainer} onPress={() => handleAns("A")}>  
            <Text style={styles.resetButton}> A. { quiz[currentQuiz]?.A} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answerContainer} onPress={() => handleAns("B")}>  
            <Text style={styles.resetButton}> B. { quiz[currentQuiz]?.B} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answerContainer} onPress={() => handleAns("C")}>  
            <Text style={styles.resetButton}> C. { quiz[currentQuiz]?.C} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answerContainer} onPress={() => handleAns("D")}>  
            <Text style={styles.resetButton}> D. { quiz[currentQuiz]?.D} </Text>
          </TouchableOpacity>
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container_score: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // space for dynamic island
    paddingTop: 100,
    // overflow: "scroll"
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 50 // space for dynamic island
  },
  quiz: {
    backgroundColor: "@DDDDDD",

    margin: 10,
    borderRadius: 5,
  },
  fontquiz: {
    fontSize: 25
  },
  answerContainer: {
    borderColor: '#000',
    borderWidth: 3,
    marginTop: 10,
    width: 250,
    height: 50
  },
  score: {
    fontSize: 250,
    justifyContent: "center",
    alignItems: "center"
  },
  resetButton: {
    flex: 1,
    padding: 10,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderBoard: {
    flex: 1,
    height: 100
  }
});
