import React from 'react';
import renderer from 'react-test-renderer';

import BackButton from '../../buttons/BackButton'

describe('<BackButton />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<BackButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});