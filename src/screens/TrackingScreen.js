import React, {useCallback} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import EventCard from '../components/EventCard';
import {navigate} from '../navigation/NavigationService';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {setSortedEventsAction} from '../store/actions/eventAction';
import {isEmpty} from 'lodash';
import {Appbar} from 'react-native-paper';
import {goBack} from '../navigation/NavigationService';
import {removeEventAction} from '../store/actions/eventAction';
const TrackingScreen = ({events, setSortedEvents, unTrackEvent}) => {
  const renderItem = useCallback(
    ({item, drag, isActive}) => {
      return (
        <View
          style={{
            borderColor: isActive ? 'red' : 'transparent',
            borderWidth: 2,
          }}>
          <EventCard
            isTracked={true}
            onLongPress={drag}
            event={item}
            isSingleCard={true}
            onClickCard={() => {
              navigate('EventDetailScreen', {event: item, isTracked: true});
            }}
            onUntrack={(event) => {
              unTrackEvent(event);
            }}
          />
        </View>
      );
    },
    [unTrackEvent],
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            goBack();
          }}
        />
        <Appbar.Content title="Event Tracking" />
      </Appbar.Header>
      <View style={styles.content}>
        {isEmpty(events) ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>{'No Events to track'}</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <DraggableFlatList
              data={events}
              renderItem={renderItem}
              keyExtractor={(item, index) => `draggable-item-${item.eventId}`}
              onDragEnd={({data}) => {
                setSortedEvents(data);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {flex: 1, padding: 8},
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  emptyMessage: {
    fontSize: 24,
    textAlign: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSortedEvents: (events) => dispatch(setSortedEventsAction(events)),
    unTrackEvent: (event) => dispatch(removeEventAction(event)),
  };
};
const mapStatesToProp = (state) => {
  return {
    events: state.trackedEvents[state.login.userData.userName],
  };
};
export default connect(mapStatesToProp, mapDispatchToProps)(TrackingScreen);
