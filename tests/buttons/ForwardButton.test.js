import React from 'react';
import renderer from 'react-test-renderer';

import ForwardButton from '../../buttons/ForwardButton'

describe('<ForwardButton />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<ForwardButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});