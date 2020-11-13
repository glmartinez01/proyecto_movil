import React, { useEffect, useState } from "react";
import {Header,Container, View,Spinner,Card,CardItem,Body, Thumbnail, Left, H3 } from "native-base";
import { Text,Dimensions,FlatList,Image } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import { TouchableOpacity } from "react-native-gesture-handler";
import _, { map,findWhere, collect, find, findIndex} from 'underscore';

const array = [
    {
        id: 2,
        "img": require("../../assets/Iconos/PointNClick.png")
    },
    {
        id: 4,
        "img": require("../../assets/Iconos/fighting.png")
    },
    {
        id: 5,
        "img": require("../../assets/Iconos/shooter.png")
    },
    {
        id: 7,
        "img": require("../../assets/Iconos/Music.png")
    },
    {
        id: 8,
        "img": require("../../assets/Iconos/Platform.png")
    },
    {
        id: 9,
        "img": require("../../assets/Iconos/Puzzle.png")
    },
    {
        id: 10,
        "img": require("../../assets/Iconos/Racing.png")
    },
    {
        id: 11,
        "img": require("../../assets/Iconos/RTS.png")
    },
    {
        id: 12,
        "img": require("../../assets/Iconos/RPG.png")
    },
    {
        id: 13,
        "img": require("../../assets/Iconos/SIM.png")
    },
    {
        id: 14,
        "img": require("../../assets/Iconos/Sport.png") 
    },
    {
        id: 15,
        "img": require("../../assets/Iconos/Strategy.png")
    },
    {
        id: 16,
        "img": require("../../assets/Iconos/TBS.png")
    },
    {
        id: 24,
        "img": require("../../assets/Iconos/Tactical.png")
    },
    {
        id: 25,
        "img": require("../../assets/Iconos/HacknSlash.png")
    },
    {
        id: 26,
        "img": require("../../assets/Iconos/Quiz.png")
    },
    {
        id: 30,
        "img": require("../../assets/Iconos/Pinball.png")
    },
    {
        id: 31,
        "img": require("../../assets/Iconos/Adventure.png")
    },
    {
        id: 32,
        "img": require("../../assets/Iconos/Indie.png")
    },
    {
        id: 33,
        "img": require("../../assets/Iconos/Arcade.png")
    },
    {
        id: 34,
        "img": require("../../assets/Iconos/VN.png")
    },
    {
        id: 35,
        "img": require("../../assets/Iconos/Cartas.png")
    },
    {
        id: 36,
        "img": require("../../assets/Iconos/Moba.png")
    },
];

const {width, height} = Dimensions.get("window");
const {apiKey,apiAuthorization,apiImageUrl,apiImageSize} = getEnvVars();


const genresScreen = ({navigation}) => {

    const [genres,setGenres] = useState(null);
    const [error,setError] = useState(false);

    const getGenres = async() => {
        try {
            const response = await backend.post(`genres/`,`fields *;limit 23;`,{

                headers:{   'Client-ID':`${apiKey}`,
                            'Authorization':`${apiAuthorization}`}
                        
            });
            setGenres(response.data);
            

        } catch (error) {
            setError(true);
            {console.log(error)};
        }
        
    }

    useEffect(()=>{

        getGenres();

    },[])

    if(!genres){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center", backgroundColor:'#ffffd1'}}>
                <Image source = {require('../../assets/splash.gif')} style={{height: 200 }}/>
            </View>
        )
    }

    return(
        <Container style={{backgroundColor:'#000022'}}>
            <FlatList
                        
                        numColumns={2}
                        data={genres}
                        keyExtractor={(item)=>item.id}
                        ListEmptyComponent={<Text>No genres found!</Text>}

                        renderItem={({item}) => {
                            return(
                                <View>
                                    <TouchableOpacity onPress={()=> navigation.navigate("gamesbygenreScreen",{id:item.id, name:item.name})}>
                                        <Card style={{width:width*0.49,borderColor:'#000000',backgroundColor:'#0d4b56',borderRadius:10}}>
                                            <CardItem style={{height:65,justifyContent:"center",alignItems:"center",backgroundColor:"#007a7c",borderRadius:10}}>
                                                    <H3 style={{color:'#ffffff',fontSize:18}}>{item.name}</H3>
                                            </CardItem>
                                            <CardItem cardBody style={{backgroundColor:"#0d4b56",borderRadius:10}}>
                                                <Body style={{justifyContent:"center",alignItems:"center"}}>
                                                    <Image
                                                        source={array[findIndex(array, {id:item.id} )].img}
                                                        style={{height:50,resizeMode:'contain',margin:20}}
                                                    />
                                                </Body>
                                            </CardItem>
                                            
                                        </Card>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        }
                    />
        </Container>

    );
};

export default genresScreen;