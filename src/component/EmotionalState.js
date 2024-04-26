import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button, Image } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const styles = {
  container: {
    flex: 1,
    padding: 10, //la toata pagina
    
  },
  currentDateContainer: {
    marginBottom: 20,
  },
  currentDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  
  emotionButton: {
    backgroundColor: 'lightpink', // Default color
    padding: 15,  //de centrat textul, la padding>15 el dispare
    marginRight: 15,
    borderRadius: 40,
    height: 60,
    marginBottom: 80,
  },
  emotionButtonText: {
    fontSize: 16,
  },
  subEmotionsContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  subEmotionButton: {
    backgroundColor: 'lightblue', // Default color
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 5,
  },
  subEmotionButtonText: {
    fontSize: 14,
  },
  //ar trebui sa fie stiluri pentru emotii selectate
  selectedEmotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    minHeight: 10,
  },
  selectedEmotionItem: {
    backgroundColor: 'red', // Default color
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedEmotionText: {
    fontSize: 14,
    marginRight: 5,
  },

  journalingContainer: {
    marginBottom: 20,
  },
  journalingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  journalingInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  questionsContainer: {
    marginBottom: 20,
  },
  questionItem: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    minHeight: 50,
  },
  saveButton: {
    marginBottom: 20,
  },
};

const emotionsData = {
  bad: [
    { text: 'Bored', subEmotions: ['Indifferent', 'Apathetic'] },
    { text: 'Busy', subEmotions: ['Pressured', 'Rushed'] },
    { text: 'Stressed', subEmotions: ['Overwhelmed', 'Out of control'] },
    { text: 'Tired', subEmotions: ['Sleepy', 'Unfocused'] },
  ],
  fearful: [
    { text: 'Scared', subEmotions: ['Helpless', 'Frightened'] },
    { text: 'Anxious', subEmotions: ['Overwhelmed', 'Worried'] },
    { text: 'Insecure', subEmotions: ['Inadequate', 'Inferior'] },
    { text: 'Weak', subEmotions: ['Worthless', 'Insignificant'] },
    { text: 'Rejected', subEmotions: ['Excluded', 'Persecuted'] },
    { text: 'Threatened', subEmotions: ['Nervous', 'Exposed'] },
  ],
  angry: [
    { text: 'Let down', subEmotions: ['Betrayed', 'Resentful'] },
    { text: 'Humiliated', subEmotions: ['Disrespected', 'Ridiculed'] },
    { text: 'Bitter', subEmotions: ['Indignant', 'Violated'] },
    { text: 'Mad', subEmotions: ['Furious', 'Jealous'] },
    { text: 'Aggressive', subEmotions: ['Provoked', 'Hostile'] },
    { text: 'Frustrated', subEmotions: ['Infuriated', 'Annoyed'] },
    { text: 'Distant', subEmotions: ['Withdrawn', 'Numb'] },
    { text: 'Critical', subEmotions: ['Skeptical', 'Dismissive'] },
  ],
  disgusted: [
    { text: 'Disapproving', subEmotions: ['Judgmental', 'Embarrassed'] },
    { text: 'Disappointed', subEmotions: ['Appalled', 'Revolted'] },
    { text: 'Awful', subEmotions: ['Nauseated', 'Detestable'] },
    { text: 'Repelled', subEmotions: ['Horrified', 'Hesitant'] },
  ],
  sad: [
    { text: 'Lonely', subEmotions: ['Isolated', 'Abandoned'] },
    { text: 'Vulnerable', subEmotions: ['Victimized', 'Fragile'] },
    { text: 'Despair', subEmotions: ['Grief', 'Powerless'] },
    { text: 'Guilty', subEmotions: ['Ashamed', 'Remorseful'] },
    { text: 'Depressed', subEmotions: ['Inferior', 'Empty'] },
    { text: 'Hurt', subEmotions: ['Embarrassed', 'Disappointed'] },
  ],
  happy: [
    { text: 'Playful', subEmotions: ['Aroused', 'Cheeky'] },
    { text: 'Content', subEmotions: ['Free', 'Joyful'] },
    { text: 'Interested', subEmotions: ['Curious', 'Inquisitive'] },
    { text: 'Proud', subEmotions: ['Successful', 'Confident'] },
    { text: 'Accepted', subEmotions: ['Respected', 'Valued'] },
    { text: 'Powerful', subEmotions: ['Courageous', 'Creative'] },
    { text: 'Peaceful', subEmotions: ['Loving', 'Thankful'] },
    { text: 'Trusting', subEmotions: ['Sensitive', 'Intimate'] },
    { text: 'Optimistic', subEmotions: ['Hopeful', 'Inspired'] },
  ],
  surprised: [
    { text: 'Startled', subEmotions: ['Shocked', 'Dismayed'] },
    { text: 'Confused', subEmotions: ['Disillusioned', 'Perplexed'] },
    { text: 'Amazed', subEmotions: ['Astonished', 'Awe'] },
    { text: 'Excited', subEmotions: ['Eager', 'Energetic'] },
  ],
};


const EmotionalState = () => {
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState(moment().format('D MMMM YYYY'));
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [selectedSubEmotion1, setSelectedSubEmotion1] = useState('');
    const [selectedSubEmotion2, setSelectedSubEmotion2] = useState('');
    const [selectedEmotions, setSelectedEmotions] = useState([]);
    const [journalEntry, setJournalEntry] = useState('');
    const [questions, setQuestions] = useState([
        { text: 'Ce a cauzat emoțiile pe care le simți astăzi?' },
        { text: 'Există ceva specific pe care ai vrea să-l discuți?' },
        { text: 'Ce poți face pentru a te simți mai bine?' },
        { text: 'Care sunt lucrurile pentru care sunt recunoscător astăzi sau care m-au făcut fericit?' },
        { text: 'Ce am învățat despre mine și despre alte persoane din experiențele de azi?' },
    ]);
  
    // const handleEmotionPress = (emotion) => {
    //   setSelectedEmotion(emotion);
    //   setSelectedSubEmotion1('');
    //   setSelectedSubEmotion2('');
    // };

    const handleEmotionPress = (emotion) => {
      console.log('Emotion pressed:', emotion);
      setSelectedEmotion(emotion);
      setSelectedSubEmotion1('');
      setSelectedSubEmotion2('');
    };
    
  
    const handleSubEmotion1Press = (subEmotion) => {
      console.log('Emotion pressed:', subEmotion);
      setSelectedSubEmotion1(subEmotion);
    };
  
    const handleSubEmotion2Press = (subEmotion) => {
      console.log('Emotion pressed:', subEmotion);
      setSelectedSubEmotion2(subEmotion);
    };
  
    const handleJournalEntryChange = (text) => {
      setJournalEntry(text);
    };
  
    const handleSave = async () => {
        try {
          const savedData = {
            emotions: selectedEmotions,
            journalEntry,
            questions: questions.map((question) => ({
              text: question.text,
              answer: question.answer,
            })),
          };
      
          await localStorage.setItem('emotionalStateData', JSON.stringify(savedData));
      
          // Afișează un mesaj de succes
          alert('Datele au fost salvate cu succes!');
        } catch (error) {
          // Afișează un mesaj de eroare
          alert(error);
        }
      
        navigation.goBack();
      };
  
      return (
        <View style={styles.container}>
          {/* Afișarea datei curente */}
          <View style={styles.currentDateContainer}>
            <Text style={styles.currentDateText}>Data curentă: {currentDate}</Text>
          </View>
      
          {/* Roata emoțiilor - Emoții principale */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Object.keys(emotionsData).map((emotion) => (
              <TouchableOpacity
                key={emotion}
                style={styles.emotionButton}
                onPress={() => handleEmotionPress(emotion)}
              >
                <Text style={styles.emotionButtonText}>{emotion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
      
          {/* Sub-emoții (dacă este selectată o emoție principală) */}
          {selectedEmotion && (
            <View style={styles.subEmotionsContainer}>
              {emotionsData[selectedEmotion].map((subEmotion1) => (
                <TouchableOpacity
                  key={subEmotion1.text}
                  style={styles.subEmotionButton}
                  onPress={() => handleSubEmotion1Press(subEmotion1.text)}
                >
                  <Text style={styles.subEmotionButtonText}>{subEmotion1.text}</Text>
                </TouchableOpacity>
              ))}
              {selectedSubEmotion1 && (
                <View style={styles.subSubEmotionsContainer}>
                  {emotionsData[selectedEmotion].find((item) => item.text === selectedSubEmotion1)?.subEmotions.map(
                    (subEmotion2) => (
                      <TouchableOpacity
                        key={subEmotion2}
                        style={styles.subEmotionButton}
                        onPress={() => handleSubEmotion2Press(subEmotion2)}
                      >
                        <Text style={styles.subEmotionButtonText}>{subEmotion2}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              )}
            </View>
          )}
      
          {/* Lista emoțiilor selectate */}
          <View style={styles.selectedEmotionsContainer}>
            {selectedEmotions.map((emotion) => (
              <View key={emotion} style={styles.selectedEmotionItem}>
                <Text style={styles.selectedEmotionText}>{emotion}</Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveEmotion(emotion)}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
      
          {/* Jurnal */}
          <View style={styles.journalingContainer}>
            <Text style={styles.journalingLabel}>Jurnal:</Text>
            <TextInput
              style={styles.journalingInput}
              multiline={true}
              numberOfLines={4}
              placeholder="Scrie aici..."
              value={journalEntry}
              onChangeText={handleJournalEntryChange}
            />
          </View>
      
          {/* Întrebări */}
          <ScrollView style={styles.questionsContainer}>
            {questions.map((question, index) => (
              <View key={index} style={styles.questionItem}>
                <Text style={styles.questionText}>{question.text}</Text>
                <TextInput style={styles.answerInput} multiline={true} placeholder="Răspuns..." />
              </View>
            ))}
          </ScrollView>
      
          {/* Butonul Salvare */}
          <Button title="Salvează" style={styles.saveButton} onPress={handleSave} />
        </View>
      );
};     
export default EmotionalState;
 


