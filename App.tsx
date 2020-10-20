import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, ProgressBarAndroid } from 'react-native';
import axios from 'axios';

export default function App() {

  const [valorDolar, setValorDolar] = useState<number>(0);
  const [valorEuro, setValorEuro] = useState<number>(0);

  const [real, setReal] = useState<string>();
  const [dolar, setDolar] = useState<string>();
  const [euro, setEuro] = useState<string>();

  useEffect(() => {
    axios.get('https://api.hgbrasil.com/finance?key=f29d9739').then(response => {
      setValorDolar(response.data['results']['currencies']['USD']['buy']);
      setValorEuro(response.data['results']['currencies']['EUR']['buy']);
    });
  }, []);
  
  function converterDeReal(text: number){
    setDolar((text / valorDolar).toFixed(2));
    setEuro((text / valorEuro).toFixed(2));
  }

  function converterDeDolar(text: number){
    setReal((text * valorDolar ).toFixed(2));
    setEuro((text * valorDolar / valorEuro).toFixed(2));
  }

  function converterDeEuro(text: number){
    setReal((text * valorEuro).toFixed(2));
    setDolar((text * valorEuro / valorDolar).toFixed(2)); 
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>$ Conversor de moedas $</Text>

      {valorDolar == 0 ? 
      
      <ProgressBarAndroid style={styles.scrollView} />

      :

      <ScrollView>

        <Image style={styles.logo} source={require('./assets/money.png')} />

        <Text style={styles.labelMoeda} >Real</Text>
        <TextInput 
          style={styles.inputMoeda} 
          placeholder="R$"
          multiline={false}
          keyboardType="numeric"
          onChangeText={(text) => converterDeReal(Number(text))}
          defaultValue={real}
        />
        
        <Text style={styles.labelMoeda} >Dólar</Text>
        <TextInput 
          style={styles.inputMoeda} 
          placeholder="US$"
          multiline={false}
          keyboardType="numeric"
          onChangeText={(text) => converterDeDolar(Number(text))}
          defaultValue={dolar}
        />
        
        <Text style={styles.labelMoeda} >Euro</Text>
        <TextInput 
          style={styles.inputMoeda} 
          placeholder="€"
          multiline={false}
          keyboardType="numeric"
          onChangeText={(text) => converterDeEuro(Number(text))}
          defaultValue={euro}
       />

      </ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: 'white',
  },

  logo: {
    alignSelf: "center",
    width: '100%',
    height: 100,
    resizeMode: "contain",
    marginVertical: 20
  },

  scrollView: {
    marginVertical: '60%',
    color: '#E68A2E',
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: '#E68A2E',
    textAlign: "center",
    marginTop: 25,
    marginBottom: 8
  },

  inputMoeda: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#E68A2E',
    margin: 8,
    marginTop: 0,
    height: 55,
    fontSize: 20,
    paddingLeft: 8
  },

  labelMoeda: {
    color: '#E68A2E',
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "700",
  }
});
