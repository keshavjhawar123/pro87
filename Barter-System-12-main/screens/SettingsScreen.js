import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, ScrollView} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            emailId : '',
            name : '',
            mobile : '',
            address : '',
            age : '',
            docId: ''
        }
    }

    getUserDetails =()=>{
        var emailId = firebase.auth().currentUser.emailId
        db.collection("user").where("email_id", "===", "emailId").get()
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                var data = doc.data()
                this.setState({
                    emailId : data.email_id,
                    name : data.name,
                    address : data.address,
                    mobile : data.mobile,
                    age : data.age,
                    docId : doc.id
                })})
            }
        )

    }

    updateUserDetails =()=>{
        db.collection("user").doc(this.state.docId)
        .update({
            "name" : this.state.name,
            "address" : this.state.address,
            "mobile" : this.state.mobile,
            "age" : this.state.age,
        })
        Alert.alert("Profile has been updated")
    }

    componentDidMount(){
        this.getUserDetails()
    }

    render(){
        return(
            <View style = {styles.container}>
                <MyHeader title = "Settings"
                navigation = {this.props.navigation}/>

                <View style = {styles.formContainer}>


                    <TextInput style = {styles.formTextInput}
                    placeholder = {"Name"}
                    maxLength = {25}
                    onChangeText ={(text) =>{
                        this.setState({
                            name : text
                        })
                    }}
                    value = {this.state.name}
                    />


                    <TextInput style = {styles.formTextInput}
                    placeholder = {"Address"}
                    multiline = {true}
                    onChangeText ={(text) =>{
                        this.setState({
                            address : text
                        })
                    }}
                    value = {this.state.address}
                    />

                    <TextInput style = {styles.formTextInput}
                    placeholder = {"Mobile"}
                    maxLength = {10}
                    keyboardType = {'numeric'}
                    onChangeText ={(text) =>{
                        this.setState({
                            mobile : text
                        })
                    }}
                    value = {this.state.mobile}
                    />

                    <TextInput style = {styles.formTextInput}
                    placeholder = {"Age"}
                    maxLength = {2}
                    keyboardType = {'numeric'}
                    onChangeText ={(text) =>{
                        this.setState({
                            age : text
                        })
                    }}
                    value = {this.state.age}
                    />

                    <TouchableOpacity style = {styles.button}
                    onPress ={() =>{
                        this.updateUserDetails()
                    }}>
                        <Text style = {styles.buttonText}>
                            Update
                        </Text>
                    </TouchableOpacity>               
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    button : {
        backgroundColor : "grey",
        width : 50,
        height : 20,
        alignItems : "center",
        justifyContent : "center"
    },
    buttonText : {
        color : "#000000",
        textAlign : "center",
        fontSize : 20
    },
    formTextInput : {
        height : 10,
        width : "25%",
        borderWidth : 3,
        borderRadius : 5,
        padding : 5,
        marginTop : 10,
        alignItems  : "center"
    },
    formContainer : {
        backgroundColor : "#ffffff",
        flex : 1,
        width : "100%",
        alignItems : "center",
        alignSelf : "center"
    }
})