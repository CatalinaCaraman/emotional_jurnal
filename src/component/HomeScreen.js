import React from 'react';
import { View, Image, Button } from 'react-native';

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 450,
      borderRadius: 5, // Use borderRadius directly
      width: '30%',
      backgroundColor: '#AB4A1F', // Set background color directly
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
};

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/kp.jpg')} style={styles.backgroundImage} />
            <View style={styles.buttonContainer}>
                <Button
                    title="How are you feeling today?"
                    onPress={() => navigation.navigate('EmotionalState')}
                    color="#AB4A1F"
                />
            </View>
        </View>
    );
};

export default HomeScreen;
