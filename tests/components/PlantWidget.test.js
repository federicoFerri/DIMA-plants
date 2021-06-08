import React from 'react';
import renderer from 'react-test-renderer';

import PlantWidget from '../../components/PlantWidget'

describe('<PlantWidget />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<PlantWidget plant={{data: function(){return {lastWatering: {}}}}}
                                                  user={{}}
                                                  time_left_next_watering={30}
                                                  colorWaterStatus={'red'}
                                                  onPress={() => null}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});