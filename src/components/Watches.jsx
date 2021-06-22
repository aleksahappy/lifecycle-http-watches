import React, { Component } from 'react';
import WatchesForm from './WatchesForm';
import WatchesGallery from './WatchesGallery';

const curDate = new Date();

export default class Watches extends Component {
  constructor(props) {
    super(props);
    this.state = {watches: []};
  }

  onAddWatch = form => {
    this.setState(prevState => ({watches: [...prevState.watches, form]}));
  };

  onDeleteWatch = id => {
    this.setState(prevState => ({watches: prevState.watches.filter(el => el.id !== id)}));
  };

  render() {
    return (
      <div className="watches">
        <WatchesForm onAddWatch={this.onAddWatch}/>
        <WatchesGallery date={curDate} items={this.state.watches} onDeleteWatch={this.onDeleteWatch}/>
      </div>
    )
  }
}
