import React from 'react';
import renderer from 'react-test-renderer';

import DownArrow from '../../buttons/DownArrow'

describe('<DownArrow />', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<DownArrow />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});