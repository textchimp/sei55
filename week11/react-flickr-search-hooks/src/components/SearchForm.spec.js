// Prerequisites for running this test:
// 1. Install test adapter:
//      npm install --save-dev @wojtekmaj/enzyme-adapter-react-17
// 2. Add to src/setupTests.js:
//     import Enzyme from 'enzyme';
//     import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//     Enzyme.configure({ adapter: new Adapter() });


import React from 'react';
import SearchForm from './SearchForm';
import { mount, shallow } from 'enzyme';

const mockedPush = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedPush, // useNavigate RETURNS a function that is the push() we use
}));

describe('Search component', () => {

  let wrapper;

  let routerPush = { push: jest.fn() };

  beforeEach( () => {
    wrapper = mount( <SearchForm /> );
    // wrapper = shallow( <Search /> );
  });

  it('mounts without errors', () => {

    // console.log('wrapper', wrapper.html());
    // expect( wrapper.text() ).toContain('Search');

    const button = wrapper.find('button');
    expect( button.length ).toEqual( 1 );
    expect( button.text() ).toEqual( 'Search' );

    const textInput = wrapper.find('input[type="text"]');
    expect( textInput.length ).toEqual( 1 );

    
  }); // it mounts without errors


  it('pushes to the router when submitted', () => {

    // How do I test that when i enter a username into the
    // form and click 'Search', this component pushes the
    // correct path onto the router?
    
    const textInput = wrapper.find('input[type="text"]');
    const form = wrapper.find('form');

    // 1. Simulate typing into the form, and simulate submitting the form
    textInput.simulate('change', { target: { value: 'ispzz' }  });
    form.simulate('submit');
    // button.simulate('click'); // doesn't work when we are using onSubmit

    // 2. Use the mocked jest.fn() to assert that the component tried to call
    // the push method (originally from useNavigate) with the correct path string
    expect( mockedPush ).toHaveBeenCalledWith('/search/ispzz');

  });

}); // describe Search component

