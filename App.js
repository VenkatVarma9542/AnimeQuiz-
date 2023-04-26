import {Component, React, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {quizData} from './Components/quizQuestions';
import LinearGradient from 'react-native-linear-gradient';
import QuizItem from './Components/quizItem';
import Icon from 'react-native-vector-icons/Entypo';

const {height, width} = Dimensions.get('window');

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ansQustions, setAnsQustions] = useState(1);
  const [qustions, setQustions] = useState(quizData);
  const listRef = useRef();
  const OnSelectOption = (index, x) => {
    const tempData = qustions;
    tempData.map((item, ind) => {
      if (index == ind) {
        if (item.marked !== -1) {
          item.marked = -1;
        } else {
          item.marked = x;
        }
      }
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQustions(temp);
  };

  const getTestScore = () => {
    let marks = 0;
    qustions.map(item => {
      if (item.marked !== -1) {
        marks = marks + 5;
      }
    });
    return marks;
  };
  const reset = () => {
    const tempData = qustions;
    tempData.map((item, ind) => {
      item.marked = -1;
    });
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setQustions(temp);
  };
  return (
    <LinearGradient colors={['#61045f', '#20011f']} style={{flex: 1}}>
      <View style={style.page}>
        <Text style={style.heading}>
          Anime Quiz :{ansQustions + '/' + quizData.length}
        </Text>
        <Text
          style={{
            marginRight: 20,
            fontSize: 20,
            fontWeight: '600',
            color: '#FFF',
            left: 320,
          }}
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({animated: true, index: 0});
          }}>
          Reset
        </Text>
        <View>
          <FlatList
            ref={listRef}
            showsHorizontalScrollIndicator={false}
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x / width;
              setAnsQustions((x + 1).toFixed(0));
            }}
            pagingEnabled
            horizontal
            data={qustions}
            renderItem={({item, index}) => {
              return (
                <QuizItem
                  data={item}
                  selectOption={x => {
                    OnSelectOption(index, x);
                  }}
                />
              );
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: 50,
            paddingLeft: 45,
          }}>
          {ansQustions == 1 ? null : (
            <TouchableOpacity
              onPress={() => {
                if (ansQustions > 1) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: ansQustions - 2,
                  });
                }
              }}>
              <Icon name="chevron-left" color={'#fff'} size={60} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            right: 50,
            bottom: 50,
          }}>
          {ansQustions == 10 ? (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Icon name="chevron-right" color={'#5af29e'} size={60} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (qustions[ansQustions - 1].marked !== -1) {
                  if (ansQustions < qustions.length) {
                    listRef.current.scrollToIndex({
                      animated: true,
                      index: ansQustions,
                    });
                  }
                }
              }}>
              <Icon name="chevron-right" color={'#fff'} size={60} />
            </TouchableOpacity>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba{0,0,0,.5}',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '90',
                hight: 200,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '800',
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                Test Score
              </Text>
              <Text
                style={{
                  fontSize: 45,
                  fontWeight: '800',
                  alignSelf: 'center',
                  marginTop: 20,
                  color: 'green',
                }}>
                {getTestScore()}
              </Text>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  height: 40,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  page: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    color: '#fff',
  },
});

export default App;
