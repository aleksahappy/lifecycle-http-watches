import React, { Component } from 'react';
// import moment from 'moment';

function getOffsetDate(offset) {
  offset = 60 * 60 * 1000 * offset;
  const localDate = new Date(),
        localTime = localDate.getTime(),
        localOffset = localDate.getTimezoneOffset() * 60 * 1000,
        utc = localTime + localOffset,
        newTime = utc + offset,
        newDate = new Date(newTime);
  return newDate;
}

const initialWatch = {
  // Вариант с цифровыми часами:
  // hours: 0,
  // minutes: 0,
  // seconds: 0
  // Вариант с аналоговыми часами:
  hours: {},
  minutes: {},
  seconds: {}
}

export default class Watch extends Component {
  constructor(props) {
    super(props);
    this.state = initialWatch;
    this.interval = undefined;
  }

  componentDidMount() {
    this.updateWatch();
    this.interval = setInterval(() => this.updateWatch(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  deleteWatch = () => {
    this.props.onDeleteWatch(this.props.item.id);
  }

  updateWatch() {
    const date = getOffsetDate(this.props.item.offset);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Вариант с цифровыми часами:
    // this.setState({
    //   hours: hours < 10 ? '0' + hours : hours,
    //   minutes: minutes < 10 ? '0' + minutes : minutes,
    //   seconds: seconds < 10 ? '0' + seconds : seconds
    // });

    // Вариант с аналоговыми часами:
    hours = (hours * 30) + (minutes / 2);
    minutes = (minutes * 6);
    seconds = (seconds * 6);

    this.setState({
      hours: {
        WebkitTransform: 'rotateZ('+ hours +'deg)',
        transform: 'rotateZ('+ hours +'deg)'
      },
      minutes: {
        WebkitTransform: 'rotateZ('+ minutes +'deg)',
        transform: 'rotateZ('+ minutes +'deg)'
      },
      seconds: {
        WebkitTransform:'rotateZ('+ seconds +'deg)',
        transform: 'rotateZ('+ seconds +'deg)'
      }
    });
  }

  render() {
    return (
      // Вариант с цифровыми часами:
      // <div className="watch digital">
      //   <div className="name">{this.props.item.name}</div>
      //   <div className="face">{this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds}</div>
      //   <div className="btn delete" onClick={this.deleteWatch}>×</div>
      // </div>

      // Вариант с аналоговыми часами:
      <div className="watch analog">
        <div className="name">{this.props.item.name}</div>
        <div className="face">
          <div className="hours-container">
            <div className="hours" style={this.state.hours}></div>
          </div>
          <div className="minutes-container">
            <div className="minutes" style={this.state.minutes}></div>
          </div>
          <div className="seconds-container">
            <div className="seconds" style={this.state.seconds}></div>
          </div>
        </div>
        <div className="btn delete" onClick={this.deleteWatch}>×</div>
      </div>
    )
  }
}
