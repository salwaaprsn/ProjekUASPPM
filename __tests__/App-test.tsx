
import React from 'react';
import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';

const Placeholder = () => (
    <View>
        <Text>Field Coffee</Text>
    </View>
);

describe('<Placeholder />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Placeholder />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
