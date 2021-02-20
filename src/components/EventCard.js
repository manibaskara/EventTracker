import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button, Card, IconButton} from 'react-native-paper';

const EventCard = ({
  event,
  isSingleCard = true,
  onClickCard,
  isTracked = false,
  onLongPress = () => {},
  onUntrack = () => {},
}) => {
  return (
    <Card
      onLongPress={onLongPress}
      onPress={() => {
        onClickCard(event);
      }}
      style={styles.container}>
      <Card.Cover source={{uri: event.eventBanner}} />

      <Card.Content>
        <View style={styles.row}>
          <IconButton icon="airballoon" size={15} />
          <Text style={isSingleCard ? styles.titleStyle : styles.subtitle}>
            {event.eventName}
          </Text>
        </View>
      </Card.Content>
      {isSingleCard && (
        <Card.Content>
          <View style={styles.row}>
            <IconButton icon="map" size={15} />
            <Text style={styles.subtitle}>{event.eventVenue}</Text>
          </View>
          <View style={styles.row}>
            <IconButton icon="tag" size={15} />
            <Text style={styles.subtitle}>
              {event.isPaid ? 'Paid Entry' : 'Free Entry'}
            </Text>
          </View>
        </Card.Content>
      )}
      <Card.Actions>
        {isTracked && (
          <Button onPress={() => onUntrack(event)}>Remove from Track</Button>
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginStart: 8, marginTop: 8},
  row: {flexDirection: 'row', alignItems: 'center'},
  logo: {
    resizeMode: 'cover',
    aspectRatio: 16 / 9,
  },
  titleStyle: {
    marginTop: 8,
    fontSize: 20,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
  },
});

export default EventCard;
