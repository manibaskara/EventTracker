import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {
  trackEventAction,
  removeEventAction,
} from '../store/actions/eventAction';
import {connect, useDispatch} from 'react-redux';
import {Appbar, Button, IconButton} from 'react-native-paper';
import {goBack} from '../navigation/NavigationService';

const EventDetailScreen = ({route, trackedEvents = []}) => {
  const {event} = route.params;
  const [isTracked, setIsTracked] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsTracked(trackedEvents.some(({eventId}) => eventId === event.eventId));
  }, [event.eventId, setIsTracked, trackedEvents]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            goBack();
          }}
        />
        <Appbar.Content title="Event Details" />
      </Appbar.Header>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={{
            uri: event.eventBanner,
          }}
        />
        <View style={styles.row}>
          <IconButton icon="airballoon" size={15} />
          <Text
            style={styles.titleStyle}>{`Event Name: ${event.eventName}`}</Text>
        </View>
        <View style={styles.row}>
          <IconButton icon="map" size={15} />
          <Text
            style={
              styles.titleStyle
            }>{`Event Venue: ${event.eventVenue}`}</Text>
        </View>
        <View style={styles.row}>
          <IconButton icon="tag" size={15} />
          <Text style={styles.titleStyle}>
            {event.isPaid ? 'Paid Entry' : 'Free Entry'}
          </Text>
        </View>
      </View>
      <Button
        style={styles.button}
        onPress={() => {
          dispatch(
            isTracked ? removeEventAction(event) : trackEventAction(event),
          );
          setIsTracked(!isTracked);
        }}>
        {isTracked ? 'Un Track' : 'Track'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {flex: 1},
  logo: {
    aspectRatio: 16 / 9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    fontSize: 30,
    position: 'absolute',
    bottom: 0,
  },
  titleStyle: {
    marginTop: 8,
    fontSize: 20,
  },
});

const mapStatesToProp = (state) => {
  return {
    name: state.login.userData.userName,
    trackedEvents: state.trackedEvents[state.login.userData.userName],
  };
};

export default connect(mapStatesToProp)(EventDetailScreen);
