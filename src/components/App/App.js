import React, { Component } from 'react';
import './App.css';
import { getUrls,postUrls,deleteCard } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  async componentDidMount() {
    let urls = await getUrls()
    this.setState({urls:urls})
  }
  updateUrls = async (data) =>{
    let response = await postUrls(data)
      this.setState({urls:[...this.state.urls,response]})
  }
  deleteURl = async (id) =>{
    await deleteCard(id)
    let urls = await getUrls()
    console.log(urls)
    this.setState({urls:urls})
  }
  render() {
    let message;
    if(this.state.urls.length === 0){
      message =  'No URls YET!'
    }
    return (
      <main className="App">
        <header>
          {message}
          <h1>URL Shortener</h1>
          <UrlForm updateUrls = {this.updateUrls} />
        </header>

        <UrlContainer deleteURl = {this.deleteURl}urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
