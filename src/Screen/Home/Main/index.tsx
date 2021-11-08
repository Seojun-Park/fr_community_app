import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {logUserOut} from '../../../graphql/client';
import {Transitioning, Transition} from 'react-native-reanimated';
import {homeData} from '../homeData';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  route: {
    params: {
      id: number;
    };
  };
}

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const HomeScreen: React.FC<IProps> = ({route: {params}}) => {
  const {id} = params;
  const [currentIndex, setcurrentIndex] = useState<number | null>(null);
  const ref = useRef();
  console.log('homescreen', id);

  return (
    <SafeAreaView>
      <Transitioning.View ref={ref} transition={transition}>
        {homeData.map(({bg, color, category, subCategories}, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.cardContainer}
              onPress={() => {
                ref.current.animateNextTransition();
                setcurrentIndex(index === currentIndex ? null : index);
              }}
              activeOpacity={0.9}>
              <View style={[styles.card, {backgroundColor: bg}]}>
                <Text style={[styles.heading, {color}]}>{category}</Text>
                {index === currentIndex && (
                  <View style={styles.subCategoriesList}>
                    {subCategories.map(subCategory => (
                      <TouchableOpacity key={subCategory}>
                        <Text style={[styles.body, {color}]}>
                          {subCategory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </Transitioning.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  cardContainer: {
    flexGrow: 1,
    // minHeight: 145,
  },
  card: {
    flexGrow: 1,
    minHeight: 70,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 20,
  },
});

export default HomeScreen;
