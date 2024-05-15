import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Picker, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Mapa from "../src/components/Mapa";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import ListaMapas from "../src/components/listaMapas";
import { useAcessibilidade } from "../src/context/AcessibilidadeContext";
import * as Speech from "expo-speech";

const TelaMapa = ({ navigation }) => {
  const { acessibilidade } = useAcessibilidade();

  const [mapaSelecionado, setMapaSelecionado] = useState("1");
  const [selectedValue, setSelectedValue] = useState("Mapa área 1 (superior)");

  const [showImage1, setShowImage1] = useState(false); // Estado para a primeira seção
  const [showImage2, setShowImage2] = useState(false); // Estado para a segunda seção
  const [showImage3, setShowImage3] = useState(false); // Estado para a terceira seção

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  const falarTexto = (texto) => {
    Speech.speak(texto, { language: "pt-BR" });
  };

  const handleChange = (itemValue, itemIndex) => {
    setSelectedValue(itemValue);
    // Dependendo da opção selecionada, defina um valor diferente para setMapaSelecionado
    switch (itemValue) {
      case "Mapa área 1 (superior)":
        setMapaSelecionado("1");
        break;
      case "Mapa área 1 (inferior)":
        setMapaSelecionado("2");
        break;
      case "Mapa área 2":
        setMapaSelecionado("3");
        break;
      default:
        break;
    }
    if (acessibilidade) {
      falarTexto(itemValue);
    }
  };

  const CaminhoQr = () => {
    switch (selectedValue) {
      case "Mapa área 1 (superior)":
        navigation.navigate("TelaQR", {
          imagemLink: require("./../assets/mapaSenaiQR.png"),
        });
        break;
      case "Mapa área 1 (inferior)":
        navigation.navigate("TelaQR", {
          imagemLink: require("./../assets/blocobQR.png"),
        });
        break;
      case "Mapa área 2":
        navigation.navigate("TelaQR", {
          imagemLink: require("./../assets/areadoisQR.png"),
        });
        break;
    }
    if (acessibilidade) {
      falarTexto("Baixar caminho");
    }
  };

  const btnSalas = () => {
    switch (selectedValue) {
      case "Mapa área 1 (superior)":
        navigation.navigate(
          "TelaSalas",
          { local: "http://10.110.12.44:8080/salas/area1-inferior" },
          { andar: "Área 1 (inferior)" }
        );
        break;
      case "Mapa área 1 (inferior)":
        navigation.navigate(
          "TelaSalas",
          { local: "http://10.110.12.44:8080/salas/area1-superior" },
          { andar: "Área 1 (superior)" }
        );
        break;
      case "Mapa área 2":
        navigation.navigate(
          "TelaSalas",
          { local: "http://10.110.12.44:8080/salas/area2" },
          { andar: "Área 2" }
        );
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.footer}>
          <View style={styles.cabecalho}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <FontAwesome name="arrow-left" size={50} color="black" />
            </Pressable>

            <FontAwesome
              style={styles.icon}
              name="map"
              size={50}
              color="black"
            />
          </View>

          <Picker
            selectedValue={selectedValue}
            style={styles.estiloBtn}
            onValueChange={handleChange}
          >
            <Picker.Item
              label="Área 1 (superior)"
              value="Mapa área 1 (superior)"
            />

            <Picker.Item
              label="Área 1 (inferior )"
              value="Mapa área 1 (inferior)"
            />

            <Picker.Item label="Área 2" value="Mapa área 2" />
          </Picker>

          <Pressable
            style={[styles.botaoBaixarCaminho, {}]}
            onPress={CaminhoQr}
          >
            <Text style={styles.footerText}>Baixar caminho</Text>
          </Pressable>
        </View>

        <View style={styles.mapa}>
          <Mapa mapaSelecionado={mapaSelecionado} />
        </View>

        <Pressable style={styles.btnsalas} onPress={btnSalas}> 
          <Text style={styles.textoBtnSalas}>Salas</Text>
        </Pressable>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  logo: {
    width: 70,
    height: 53,
  },
  contentContainer: {
    flexDirection: "column",
    flex: 1,
    flexShrink: 1,
  },
  blueBackground: {
    flex: 1,
    backgroundColor: "E8E8E8",
    borderWidth: 1,
    borderColor: "none",
    alignItems: "center",
  },
  texto: {
    fontSize: 20,
  },
  footer: {
    backgroundColor: "#E8E8E8", // Define a cor de fundo do rodapé como branco.
    height: 65, // Define a altura do rodapé como 65 unidades.
    width: "100%", // Define a largura do rodapé como 100% da largura do contêiner pai.
    flexDirection: "row", // Organiza os itens horizontalmente
    justifyContent: "space-between", // Distribui o espaço entre os itens
    alignItems: "center", // Centraliza os itens verticalmente dentro do rodapé.
    margin: 10,
  },
  backButton: {
    marginTop: 40,
    marginLeft: 10,
  },
  botaoBaixarCaminho: {
    right: 30,
    marginTop: 40,
    backgroundColor: "#ff0000",
    borderRadius: 20,
    alignItems: "center", // Centraliza os itens horizontalmente dentro do botão
    justifyContent: "center", // Centraliza os itens verticalmente dentro do botão
  },
  botaoVerSalas: {
    marginTop: 20,
    backgroundColor: "#ff0000",
    borderRadius: 20,

    alignSelf: "center",
    alignItems: "center", // Centraliza os itens horizontalmente dentro do botão
    justifyContent: "center", // Centraliza os itens verticalmente dentro do botão
  },
  footerText: {
    padding: 20,
    fontWeight: "bold",
    fontSize: 25,
    color: "#ffffff",
    //alignSelf: 'center',
  },
  cabecalho: {
    flexDirection: "row",
  },
  icon: {
    alignSelf: "flex-end",
    marginLeft: 20,
  },
  mapa: {
    padding: 20,
    height: 650,
  },
  estiloBtn: {
    padding: 20,
    marginTop: 40,
    fontSize: 25,
    fontWeight: "bold",
    borderColor: "red",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "red",
    color: "#ffffff",
  },
  // containerBTNS: {
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   backgroundColor: 'black',
  //   flexdirection: 'column',
  //   height: '30%',
  //   width: "40%",
  //   display: 'flex',
  // },
  // BTNS: {
  //   alignItems: 'center',
  //   backgroundColor: 'red',
  //   flexDirection: 'Row',
  //   margin: '5',
  // },
  containerBTNS: {
    alignItems: "center",
    alignSelf: "center",
    // backgroundColor: "red",
    flexDirection: "row", // Alterado para 'column'
    height: "30%",
    width: "40%",
    display: "flex",
  },
  BTNS: {
    alignItems: "center",
    alignSelf: "center",
    //backgroundColor: "black",
    flexDirection: "row", // Alterado para 'row'
    margin: 5, // Alterado para 5 sem aspas
    marginLeft: "2.5%",
    height: "90%", //altura mas não funciona
    width: "120%", //largura
  },
  textoMapa: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },

  // botaoColunas: {
  //   width: "1%", // Definindo largura para ocupar metade da linha
  //   height: "4%",
  //   backgroundColor: "red",
  //   alignItems: "center",
  //   textAlign: "center",
  //   marginBottom: "2%",
  //   marginTop: '1%',
  //   marginLeft: "1%", // Adicionando um pequeno espaço entre os botões
  // },

  TextoBotaoColunas: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  BaixarQRButton: {
    margin: "7%",
    height: "90%", //altura
    width: "20%", //largura
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
  },
  column: {
    flex: 1, // Isso faz com que cada coluna ocupe o mesmo espaço
    flexDirection: "column",
    height: "38%", //altura
    width: "38%", // largura
    alignSelf: "center",
    alignItems: "center",
    marginTop: "1%",
    padding: "1%",
    paddingBottom: "130%",
  },
  botaoColunas: {
    backgroundColor: "red",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: "2%",
    //marginRight: '50'
    width: "100%",
  },
  btnsalas: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '10%',
    height: '7%',
    backgroundColor: 'red',
    borderRadius: 10,


  },
  textoBtnSalas: {
    marginTop:10,
    color: 'white',
    fontSize: 35,
    alignSelf: 'center',
  },

});

export default TelaMapa;
