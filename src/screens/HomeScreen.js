import React, {useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {FAB, Appbar} from 'react-native-paper';
import {
  getEventsAction,
  switchGridAction,
  trackEventAction,
} from '../store/actions/eventAction';
import EventCard from '../components/EventCard';
import {navigate} from '../navigation/NavigationService';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const {data, numColumn} = useSelector((state) => {
    return state.event;
  });
  useEffect(() => {
    dispatch(getEventsAction());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="DashBoard" />
      </Appbar.Header>
      {data && data.events && (
        <FlatList
          style={styles.flatList}
          key={numColumn === 1 ? 'vertical' : 'horizontal'}
          data={data.events}
          renderItem={({item}) => (
            <EventCard
              event={item}
              isSingleCard={numColumn === 1}
              onTrack={(event) => {
                dispatch(trackEventAction(event));
              }}
              onClickCard={(event) => {
                navigate('EventDetailScreen', {event});
              }}
            />
          )}
          keyExtractor={(item) => `id_${item.eventId}`}
          numColumns={numColumn}
        />
      )}
      <FAB
        style={styles.fab}
        label={numColumn === 1 ? 'Grid' : 'List'}
        icon={numColumn === 1 ? 'border-all' : 'currency-eth'}
        onPress={() => {
          dispatch(switchGridAction());
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {margin: 8},
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
