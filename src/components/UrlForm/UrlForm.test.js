import React from 'react';
import UrlForm from './UrlForm'
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
describe('UrlForm', () =>{
  it('should render correct elements to page on load', () =>{
    render(<UrlForm/>)
    let onLoadButton = screen.getByText('Shorten Please!')
    expect(onLoadButton).toBeInTheDocument()
  })
  it('should change form values on input', () =>{
    render(<UrlForm/>)
    let titleInput = screen.getByRole('title-text')
    let urlInput = screen.getByRole('url-text')
    userEvent.type(titleInput,'hello')
    userEvent.type(urlInput,'I am Url')
    expect(titleInput.value).toBe('hello')
    expect(urlInput.value).toBe('I am Url')


  })
  it('should call updateUrls on submit', () =>{
    let updateUrls = jest.fn()
    render(<UrlForm updateUrls = {updateUrls}/>)
    let titleInput = screen.getByRole('title-text')
    let urlInput = screen.getByRole('url-text')
    let sumbitButton = screen.getByText('Shorten Please!')
    userEvent.type(titleInput,'Title')
    userEvent.type(urlInput,'I am Url')
    userEvent.click(sumbitButton)
    expect(updateUrls).toBeCalledTimes(1)

  })

})