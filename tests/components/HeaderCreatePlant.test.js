import React from 'react';
import renderer from 'react-test-renderer';

import HeaderCreatePlant from '../../components/HeaderCreatePlant'

describe('<HeaderCreatePlant />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<HeaderCreatePlant/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});