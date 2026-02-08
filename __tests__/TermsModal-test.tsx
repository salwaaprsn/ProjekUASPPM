
import React from 'react';
import renderer from 'react-test-renderer';
import { TermsModal } from '../components/TermsModal';

describe('<TermsModal />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<TermsModal isVisible={true} onClose={() => { }} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
