import { Pressable, StyleSheet, Text, View, AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';




export default function LoginPage()
{
    
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={{fontSize:30}}>Sign up and build your own ZOO! 🐾</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={{fontSize:24}}>Save your progress, collect animals, and track your growth.</Text>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.buttonPrimary} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
                <Pressable style={styles.buttonSecondary} onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.buttonText}>CONTINU AS GUEST</Text>
                </Pressable>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems:"center",    
  },
  headerContainer: {
    paddingTop: 100,
    margin:40  
   
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop:30,
    margin:30,
    gap:20,
    
    
  },
  buttonPrimary: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: 200,
    width:'95%',
  },
  buttonSecondary: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width:'95%',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  footer:{
    paddingBottom:70,
    width:'100%',
    alignItems:"center",
  },
  
});