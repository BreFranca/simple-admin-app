import React from "react"

// import { Container, Grid, Header, Question, HeaderQuestion, ContentQuestion } from "./styles"

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    container: { background: '#FFFFFF' },
    page: { padding: '50px 0', maxWidth: '90%', margin: '0 auto' },
    header: { background: '#EBEBEB', padding: '25px 45px', display: 'flex', marginBottom: 50, alignItems: 'center' },
    image: { marginRight: 35, maxWidth: 120 }
})

const Pdf = (props) => (
    <Document style={styles.container}>
        <Page style={styles.page}>
            <View>
                <View>ADMIN</View>
                <View>
                    <Text>RELATÓRIO DE VOTAÇÃO</Text>
                    <Text>Grupo Lorem Ipsum Dolor</Text>
                    <Text><Text>Evento:</Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse</Text>
                </View>
            </View>
            <View>
                <View>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</Text>
                    <Text>Data: 99/99/9999 às 99:99</Text>
                </View>
                <View>
                    <View table={styles.table}>
                        <View>
                            <View>
                                <Text>Nome</Text>
                                <Text>Telefone</Text>
                                <Text>Data do Voto</Text>
                                <Text>Voto</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text>Renato Rafael Leonardo Ferreira</Text>
                                <Text>(99)9999-99999</Text>
                                <Text>99/99/9999 99:99</Text>
                                <Text>Lorem ipsum dolor sit amet, 
                                    consectetur adipiscing elit. 
                                    Vestibulum eu tincidunt libero.</Text>
                            </View>
                            <View>
                                <Text>Pedro Isaac Calebe Ribeiro</Text>
                                <Text>(99)9999-99999</Text>
                                <Text>99/99/9999 99:99</Text>
                                <Text>Lorem ipsum dolor sit amet. </Text>
                            </View>
                            <View>
                                <Text>Erick Carlos Silva</Text>
                                <Text>(99)9999-99999</Text>
                                <Text>99/99/9999 99:99</Text>
                                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </Text>
                            </View>
                            <View>
                                <Text>Aparecida Nicole Rodrigues</Text>
                                <Text>(99)9999-99999</Text>
                                <Text>99/99/9999 99:99</Text>
                                <Text>Lorem ipsum dolor sit amet.  </Text>
                            </View>
                            <View>
                                <Text>Raimundo Leandro Erick da Cruz</Text>
                                <Text>(99)9999-99999</Text>
                                <Text>99/99/9999 99:99</Text>
                                <Text>Lorem ipsum dolor sit amet.  </Text>
                            </View>
                            <View>
                                <Text>Raimundo Leandro Erick da Cruz</Text>
                                <Text>(99)9999-99999</Text>
                                <Text>99/99/9999 99:99</Text>
                                <Text>Lorem ipsum dolor sit amet.  </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
)

export default Pdf