import React from 'react';
import renderer from 'react-test-renderer';

import PickerPlants from '../../components/PickerPlants'

describe('<PickerPlants />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<PickerPlants items={[]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});