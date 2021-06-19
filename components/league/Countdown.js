import React, {Component} from 'react';

class Countdown extends Component {
    constructor(props) {
      super();
      const millisLeft = props.countdownTo - Date.now();
      this.state = { remainingText: "", seconds: millisLeft/1000 };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
      this.secondsToString = this.secondsToString.bind(this);
      this.startTimer();
    }

    secondsToString(seconds) {
        var numdays = Math.floor((seconds % 31536000) / 86400); 
        var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        var numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
        return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
    }

    componentDidMount() {
      let timeLeftVar = this.secondsToString(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }
  
    startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        remainingText: this.secondsToString(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds == 0) { 
        clearInterval(this.timer);
      }
    }
  
    render() {
      return(
        <div>
          {this.state.remainingText}
        </div>
      );
    }
}

export default Countdown;