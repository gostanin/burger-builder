import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './Navigationitems';
import NavigationItem from './Navigationitem/Navigationitem';


configure({adapter: new Adapter()});

describe('<Navgiagtion Items />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render two <NavigationItem /> elements if not authonticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authonticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render <NavigationItem /> Logout', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});