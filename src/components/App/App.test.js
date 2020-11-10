import React from 'react';
import App from './App'
import { screen, render,waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import  { getUrls,postUrls } from '../../apiCalls';
import '@testing-library/jest-dom';

jest.mock('../../apiCalls')


describe('App', () =>{
  describe('App Specific UI', () =>{
    it('Should render App specific UI on load with No Urls', () => {
      getUrls.mockResolvedValue(
        []
      )

      render(<App/>)
      let proofOfApp = screen.getByText('No URls YET!')
      expect(proofOfApp).toBeInTheDocument()
    })
    it('Should render App specific UI on load with Urls', async () =>{
      getUrls.mockResolvedValue(
       [{
          title:'testData1',
            short_url:'CutePuppies.com',
          long_url:'DalmationAndothewonderFulPups'
        }]
      )
      render(<App/>)
      let proofOfAppWithUrl = await waitFor (() =>screen.getByText('URL Shortener'))
      expect(proofOfAppWithUrl).toBeInTheDocument()

    })

  })
  
  describe('Url rendering', () =>{
    it('Should render correct URls to screen', async () =>{
      getUrls.mockResolvedValue(
        [{
           title:'testData1',
             short_url:'CutePuppies.com',
           long_url:'DalmationAndothewonderFulPups'
         }]
       )
       render(<App/>)
       let proofOfURl = await waitFor(() =>screen.getByText('testData1'))
       expect(proofOfURl).toBeInTheDocument()
    })
    it('Should be able to render multiple urls to screen', async () =>{
      getUrls.mockResolvedValue(
        [{
           title:'testData1',
             short_url:'ThisWillBeDifferentURl',
           long_url:'SomethingDiffernt'
         },
         {
          title:'testData2',
            short_url:'EaglesAreCool',
          long_url:'BirdsFlyAndLayEggs'
        }]
       )
       render(<App/>)
       let proofOfURl1 = await waitFor(() =>screen.getByText('ThisWillBeDifferentURl'))
       let proofOfURl2 = await waitFor(() =>screen.getByText('EaglesAreCool'))
       expect(proofOfURl1).toBeInTheDocument()
       expect(proofOfURl2).toBeInTheDocument()
    })
  })
  describe('App Form Process', () =>{
    it('Should render a form', () =>{
      getUrls.mockResolvedValue([])
      render(<App/>)
      let proofOfForm = screen.getByText('Shorten Please!')
      expect(proofOfForm).toBeInTheDocument()
      ///When the App renders, make sure that users can fill out the form, submit the form, and see a new url added to the DOM

    })
    it('Should be able to complete form and see form appear on page', async () =>{
      getUrls.mockResolvedValue([])
      postUrls.mockResolvedValue({
        title:'Owls',
       short_url:'Animals',
        long_url:'Lizards I guess'
      }
      )
      render(<App/>)
      let titleInput = screen.getByRole('title-text')
      let urlInput = screen.getByRole('url-text')
      let sumbitButton = screen.getByText('Shorten Please!')
      userEvent.type(titleInput,'Owls')
      userEvent.type(urlInput,'Lizards I guess')
      userEvent.click(sumbitButton)
      let ProofOfSumbit =await waitFor(() => screen.getByText('Owls'))
      expect(ProofOfSumbit).toBeInTheDocument()
    })
  })
  describe('Delete-Process', () =>{
    it('Should be able to delete a button', async () =>{
      getUrls.mockResolvedValue([])
      postUrls.mockResolvedValue({
        id:1,
        title:'Owls',
       short_url:'Animals',
        long_url:'Lizards I guess'
      }
      )
      render(<App/>)
      let titleInput = screen.getByRole('title-text')
      let urlInput = screen.getByRole('url-text')
      let sumbitButton = screen.getByText('Shorten Please!')
      userEvent.type(titleInput,'Owls')
      userEvent.type(urlInput,'Lizards I guess')
      userEvent.click(sumbitButton)
      let ProofOfSumbit =await waitFor(() => screen.getByText('Owls'))
      expect(ProofOfSumbit).toBeInTheDocument()

      let owlDeleteButton = screen.getByRole('button1')
      userEvent.click(owlDeleteButton)
      await waitFor(() => expect(ProofOfSumbit).not.toBeInTheDocument())
    })
  })
  describe('SadPathTesting', () =>{
    it('should render error if user tries to submit incomplete form', async () =>{
      getUrls.mockResolvedValue([])
      render(<App/>)
      let titleInput = screen.getByRole('title-text')
      let urlInput = screen.getByRole('url-text')
      let sumbitButton = screen.getByText('Shorten Please!')
      userEvent.type(titleInput,'')
      userEvent.type(urlInput,'This is text')
      userEvent.click(sumbitButton)
      let errorMessage = await waitFor(() =>screen.getByText('You are missing a required input!'))
      expect(errorMessage).toBeInTheDocument()
    })
  })
})
