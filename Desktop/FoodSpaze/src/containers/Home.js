import React, { Component } from "react";
import { View, Text, ListView, TouchableOpacity, Image, TextInput } from "react-native";
import SideMenu from 'react-native-side-menu';
import Menu from "../component/Menu";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            text: "",
            isOpen: false
        };

        this.arrayholder = [] ;

        this.renderRow = this.renderRow.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        this.fetchRestaurant();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    fetchRestaurant() {
        fetch('http://www.mocky.io/v2/5ac4842c2f00005600f5f9fb')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ dataSource: responseJson.restaurantList });
                this.arrayholder = responseJson.restaurantList;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: `${rowData.image_url}`}} style={{ height: 70, width: 70 }}/>
                <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 18, color: "black" }}>{`${rowData.name}`}</Text>
                    <Text style={{ fontSize: 18, color: "blue" }}>{`${rowData.contact}`}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    SearchFilterFunction(text){

        const newData = this.arrayholder.filter(function(item){
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        });
        this.setState({
            dataSource: newData,
            text: text
        })
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    render() {
        return(
            <View>
                <TextInput
                    style={{ textAlign: 'center',
                        height: 40,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 5 ,
                        backgroundColor : "#FFFFFF", margin: 10 }}
                    onChangeText={(text) => this.SearchFilterFunction(text)}
                    value={this.state.text}
                    underlineColorAndroid='transparent'
                    placeholder="Search Here"
                />
                <View style={{ backgroundColor: "white", margin: 10 }}>
                    <ListView
                        enableEmptySections={true}
                        dataSource={ds.cloneWithRows(this.state.dataSource)}
                        renderRow={this.renderRow}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={{ height: 5, backgroundColor: "#ededed" }} />}
                    />
                </View>
            </View>
        );
    }
}