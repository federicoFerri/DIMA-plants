import React from 'react';
import renderer from 'react-test-renderer';

import WeatherWidget from '../../components/WeatherWidget'

describe('<WeatherWidget />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<WeatherWidget />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});