import React from 'react';

class ClockTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.seconds,
    };
    this.timer = this.props.timer;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      seconds: nextProps.seconds,
    })
    this.timer = nextProps.timer;
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    if (this.timer === 10) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    if (this.state.seconds !== 0 && this.timer !== 0) {
      this.setState({
        seconds: this.state.seconds - 1,
      });
    } else if (this.state.seconds === 0 && this.timer !== 0) {  // countdown to the 0 seconds, user didn't choose the answer.
      this.props.callbackParent();
      clearInterval(this.timer);
    } else if (this.state.seconds === 0 || this.timer === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return(
        <span>{this.state.seconds}</span>
    );
  }
}

export default ClockTimer;
