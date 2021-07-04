import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import db from '../config'
import {DrawerItems, createDrawerNavigator} from '@react-navigation/drawer'
import {Avatar} from 'react-native-elements'
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import WelcomeScreen from '../screens/WelcomeScreen'

export default class CustomSideBarMenu extends React.Component{
    state = {
        image : '#',
        docId : '',
        name : '',
        userId : firebase.auth().currentUser.email
    }

    componentDidMount(){
        this.fetchImage(this.state.userId)
        this.getUserProfile()
    }

    getUserProfile(){
        db.collections("user").where("email_id", "==", this.state.userId)
        .onSnapshot((querySnapshot) =>{
            querySnapshot.forEach((doc) =>{
                this.setState({
                    name : doc.data().name,
                    docId : doc.id,
                    image : doc.data().image
                })
            })
        })
    }

    selectPicture =async=()=>{
        const{cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing : true,
            aspect : [4, 3],
            quality : 1
        })
        if(!cancelled){
            this.setState({
                image : uri
            })
            this.uploadImage(uri, this.state.userId)
        }
    }

    uploadImage =async(uri, imageName)=>{
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase.storage().ref().child("user_profiles/" + imageName)
        return ref.put(blob).then((response) => {
            this.fetchImage(imageName)
        })
    }

    fetchImage =(imageName)=>{
        var storageRef = firebase.storage().ref().child("user_profiles/" + imageName)
        storageRef.getDownloadURL().then((url) =>{
            this.setState({
                image : url
            })
        })
        .catch((error) => {
            this.setState({
                image : "#"
            })
        })
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex : 0.5, alignItems : 'center', backgroundColor : "#faebcd"}}>
                    <Avatar rounded source = {{uri : this.state.image}}
                    size = "medium"
                    onPress ={()=>{
                        this.selectPicture()
                    }}
                    containerStyle = {styles.imageContainer}
                    showEditButton/>
                    <Text style = {{fontWeight : '100', fontSize : 15, textAlign : 'center'}}>
                        {this.state.name}
                    </Text>
                </View>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style = {styles.logOutContainer}>
                    <TouchableOpacity style = {styles.logOutButton}
                    onPress ={() =>{
                        this.props.navigation.navigate("WelcomeScreen")
                        firebase.auth().signOut()
                    }}>
                        <Text style = {styles.logOutText}> Sign Out </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



var styles = StyleSheet.create({
    container : {
        flex : 1
    },
    drawerItemsContainer : {
        flex : 0.8,
    },
    logOutContainer : {
        flex : 0.6,
        justifyContent : 'flex-end',
        paddingBottom : 25
    },
    imageContainer : {
        flex : 0.75,
        width : "40%",
        height : "20%",
        marginLeft : 20,
        marginTop : 25
    },
    logOutButton : {
        height : 40,
        width : 60,
        padding : 15,
        justifyContent : 'center'
    },
    logOutText : {
        fontSize : 30,
        color : "#ffffff",
        alignText : 'center'
    }
})