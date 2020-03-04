import React, { Component } from 'react';

interface ClockState {
  date: Date;
}

class Clock extends Component<{}, ClockState> {
  timerID: any = '';

  constructor(props: {}) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount(): void {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID);
  }

  tick(): void {
    this.setState({
      date: new Date(),
    });
  }

  render(): JSX.Element {
    return <h2>It is {this.state.date.toLocaleTimeString()}.</h2>;
  }
}

export default Clock;
