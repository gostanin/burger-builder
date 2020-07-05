import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './Navigationitems';
import NavigationItem from './Navigationitem/Navigationitem';


configure({adapter: new Adapter()});

describe('<Navgiagtion Items />', () => {
    it('should render two <NavigationItem /> elements if not authonticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});