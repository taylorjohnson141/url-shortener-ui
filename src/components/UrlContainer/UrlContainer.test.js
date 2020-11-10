import React from 'react';
import UrlContainer from './UrlContainer'
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('URlContainer', () =>{

  it(`Should render correctly based on url's passed in`, () =>{
    let testData =[{
      title:'testData1',
        short_url:'www.CutePuppies.com',
      long_url:'DalmationAndothewonderFulPups'
    },
    {
      title:'testData2',
      short_url:'SomthingsuperCool',
      long_url:'I dont know what to type but its long'
    }
  ]
    render(<UrlContainer urls = {testData}/>)
    let proofOfURl1 = screen.getByText('testData1')
    let proofOfURl2 = screen.getByText('testData2')
    let shortAnchor = screen.getByRole('short-url0')
    expect(shortAnchor.href).toBe('http://localhost/www.CutePuppies.com')
    expect(proofOfURl1).toBeInTheDocument()
    expect(proofOfURl2).toBeInTheDocument()

  })
})