import { Pressable, StyleSheet, Text, View, AppState } from 'react-native';

export default function IntroPage()
{
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={{fontSize:30}}>Welcome to FocusZoo!</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={{fontSize:24,}}>Improve your concentration and unlock new animals from all over the world.</Text>
                <Text style={{fontSize:24,}}>Every moment you focus helps save one animal from poachers</Text>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.buttonPrimary}>
                    <Text style={styles.buttonText}>NEXT</Text>
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
   
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop:75,
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
    width:'100%',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  footer:{
    paddingBottom:70,
    width:'100%',
  },
  
});