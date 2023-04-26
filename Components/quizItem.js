import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
const {hight, width} = Dimensions.get('window');
const QuizItem = ({data, selectOption}) => {
  return (
    <View style={style.card}>
      <Text style={style.qustion}>{'Q.No:' + data.id + '. '}</Text>
      <Text style={style.qustion}>{data.qustion}</Text>
      <View style={{marginTop: 20}}>
        <FlatList
          data={data.options}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: '90%',
                  height: 55,
                  elevation: 20,
                  shadowColor: '#61045f',
                  marginBottom: 10,
                  marginTop: 10,
                  alignSelf: 'center',
                  alignItem: 'center',
                  paddingLeft: 15,
                  flexDirection: 'row',
                  backgroundColor:
                    data.marked == index + 1 ? '#61045f' : '#fff',
                }}
                onPress={() => {
                  selectOption(index + 1);
                }}>
                <View
                  style={{
                    borderRadius: 15,
                    hight: 30,
                    width: 30,
                    backgroundColor:
                      data.marked == index + 1 ? '#fff' : '#36cfe0',
                    margin: 12,
                    elevation: 5,
                    shadowColor: '#000',
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      color: data.marked == index + 1 ? '#61045f' : '#000',
                    }}>
                    {index == 0
                      ? 'A'
                      : index == 1
                      ? 'B'
                      : index == 2
                      ? 'C'
                      : index == 3
                      ? 'D'
                      : 'E'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: data.marked == index + 1 ? '#fff' : '#000',
                    fontWeight: '500',
                    marginLeft: 10,
                    alignSelf: 'center',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  qustion: {
    fontFamily: 'roboto',
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  options: {
    flex: 1,
    width: '90%',
    height: 55,
    elevation: 20,
    shadowColor: '#61045f',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    alignItem: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
  },
  card: {
    marginTop: 30,
    marginBottom: 30,
    margin: 5,
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width,
  },
  optionText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
    marginLeft: 10,
    alignSelf: 'center',
  },
  optionIndex: {
    borderRadius: 15,
    hight: 30,
    width: 30,
    backgroundColor: '#36cfe0',
    margin: 12,
    elevation: 5,
    shadowColor: '#000',
    padding: 5,
  },
});
export default QuizItem;
