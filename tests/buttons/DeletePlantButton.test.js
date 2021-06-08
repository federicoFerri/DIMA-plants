import React from 'react';
import renderer from 'react-test-renderer';

import DeletePlantButton from '../../buttons/DeletePlantButton'

describe('<DeletePlantButton />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<DeletePlantButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});