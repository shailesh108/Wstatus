import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  ToastAndroid,
  ScrollView,
  View,
  Dimensions
} from 'react-native';
import { Container, Content, Item, Input, Card, CardItem, Text, Button, Thumbnail,Body,Left,Right,Icon,Spinner,List,Header,Title } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob'
import { getWhatsappStatusDirectory,downloadFiles, shareFile,getFilePath } from '../utils/helper.js';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import RNThumbnail from 'react-native-thumbnail';

const {height, width} = Dimensions.get('window');

export class VideoFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {thumbnail: undefined}
    this.thumbnail = undefined;
  }

  componentWillMount(){
    let dir =  getWhatsappStatusDirectory() + '/'  + this.props.video_url;
    let  self=this;
    RNThumbnail.get(dir).then((result) => {
      console.log(result.path); // thumbnail path
      self.thumbnail =result.path
      self.setState({thumbnail: result.path})
    })
    console.log("hh",this.thumbnail,this.state.thumbnail)
  }
  render() {
    return (
            <List style={styles.gird}>
              <CardItem cardBody>
                <View>
                 <VideoPlayer
                    endWithThumbnail
                    thumbnail={{uri: this.thumbnail}}
                    video={{ uri: getFilePath(this.props.video_url) }}
                    customStyles={{flex: 1,width: width/2}}
                    duration={undefined}
                    ref={r => this.player = r}
                  />
                  <CardItem style={{ width: width/2,backgroundColor: 'transparent', height: 30, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <Left>
                      <Button transparent onPress={ () =>  shareFile(this.props.video_url)}>
                        <Icon active name="md-share-alt" style = {{color: 'white', fontSize: 20}}/>
                      </Button>
                    </Left>
                    <Right>
                     <Button transparent onPress={ () =>  downloadFiles(this.props.video_url)}>
                        <Icon active name="md-download" style = {{color: 'white', fontSize: 20}}/>
                      </Button>
                    </Right>
                  </CardItem>
                </View>
              </CardItem>
            </List>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backgroundVideo: {
    position: 'relative',
    height: 300,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  gird:{
    flex: 1,
    margin: 3,
    minWidth: 170,
    maxWidth: 170,
    maxHeight:170,
    // height: 150,
    backgroundColor: 'red',
    }
});