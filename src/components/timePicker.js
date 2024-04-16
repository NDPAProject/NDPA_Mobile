import React, {useRef, useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const timeViewHeight = 50; // Height of each time option
const visibleItems = 3; // Number of items visible in the picker

const TimePicker = () => {
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedSecond, setSelectedSecond] = useState('00');
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    // This will scroll each picker to the initial selected time
    const offset = timeViewHeight; // as we want to start at the second item (index 1)
    hourRef.current?.scrollTo({y: offset, animated: false});
    minuteRef.current?.scrollTo({y: offset, animated: false});
    secondRef.current?.scrollTo({y: offset, animated: false});
  }, []);

  const generateTimeOptions = range => {
    let times = [];
    for (let i = 0; i <= range; i++) {
      times.push(i < 10 ? `0${i}` : `${i}`);
    }
    return times;
  };

  const handleSelectTime = (value, type) => {
    if (type === 'hour') setSelectedHour(value);
    if (type === 'minute') setSelectedMinute(value);
    if (type === 'second') setSelectedSecond(value);
  };

  const renderTimeOptions = (times, selectedTime, type, ref) => (
    <ScrollView
      ref={ref}
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      snapToInterval={timeViewHeight}
      onMomentumScrollEnd={event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / timeViewHeight);
        handleSelectTime(times[index], type);
      }}>
      {times.map((time, index) => (
        <View key={index} style={styles.timeView}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View>
      <View style={styles.selectedTimeContainer}>
        <Text style={styles.selectedTimeText}>{selectedHour}h</Text>
        <Text style={styles.selectedTimeText}>{selectedMinute}m</Text>
        <Text style={styles.selectedTimeText}>{selectedSecond}s</Text>
      </View>
      <View style={styles.timeOptionsContainer}>
        {renderTimeOptions(
          generateTimeOptions(23),
          selectedHour,
          'hour',
          hourRef,
        )}
        {renderTimeOptions(
          generateTimeOptions(59),
          selectedMinute,
          'minute',
          minuteRef,
        )}
        {renderTimeOptions(
          generateTimeOptions(59),
          selectedSecond,
          'second',
          secondRef,
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: timeViewHeight * visibleItems, // Only show three rows at a time
  },
  timeView: {
    height: timeViewHeight,
    justifyContent: 'center',
  },
  timeText: {
    textAlign: 'center',
    fontSize: 20,
  },
  selectedTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  selectedTimeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
    textDecorationLine: 'underline',
  },
  timeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TimePicker;
