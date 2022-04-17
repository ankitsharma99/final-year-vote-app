import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getPolls, getUserPolls, getCurrentPoll } from "../store/actions";

class Polls extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/poll/${id}`);
  }

  render() {
    const { auth, getUserPolls } = this.props;
    const polls = this.props.polls.map((poll) => (
      <li onClick={() => this.handleSelect(poll._id)} key={poll._id}>
        {poll.question}
      </li>
    ));
    return (
      <Fragment>
        <div className='available-polls'>Available Polls 👇</div>
        {auth.isAuthenticated && <div className='click-poll-title'>Click on a poll to vote</div>}
        <ul className='polls'>{polls}</ul>
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls, getCurrentPoll }
)(Polls);
