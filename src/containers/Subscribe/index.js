import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import Materialize from 'materialize-css';
import { subscription, fetchStatus } from "./state/actions";
import './subscribe.scss';

export class Subscribe extends React.Component {
    state = {
      notificationStatus: this.props.sub.subscriptionStatus,
    };

    componentDidMount = () => {
      const { status } = this.props;
      status();
    }

    componentWillReceiveProps = (nextProps) => {
      const { subscriptionStatus, message, errors } = nextProps.sub;
      const errorMessage = 'Something went wrong, Please try again';
      this.setState({
        notificationStatus: subscriptionStatus,
      });
      if (message.length !== 0) {
        Materialize.toast({ html: message });
      }
      if (errors === 'Network Error') {
        Materialize.toast({ html: errorMessage });
      } else if (errors === 'Request failed with status code 403') {
        Materialize.toast({ html: 'Please login again' });
      }
    };

    handleSubscribe = () => {
      const { subscribe } = this.props;
      const { notificationStatus } = this.state;
      subscribe(notificationStatus);
    }

    render() {
      const { notificationStatus } = this.state;
      return (
            <>
              <div className="divider" />
              <div className="section">
                <div className="row">
                  <div className="col s10">
                    <h5><strong>Notifications on your content</strong></h5>
                    <p>We’ll email you when there are notifications on your articles</p>
                  </div>
                  <div className="col s2">
                    {notificationStatus ? (
                      <div className="switch mt">
                        <label>
                                Off
                          <input type="checkbox" checked="checked" onChange={this.handleSubscribe} />
                          <span className="lever" />
                                On
                        </label>
                      </div>
                    ) : (
                      <div className="switch" id="switch">
                        <label>
                                Off
                          <input type="checkbox" onChange={this.handleSubscribe} />
                          <span className="lever" />
                                On
                        </label>
                      </div>
                    )}

                  </div>
                </div>
              </div>
              </>
      );
    }
}

Subscribe.propTypes = {
  sub: PropType.shape({
    subscriptionStatus: PropType.bool.isRequired,
    message: PropType.string.isRequired,
    errors: PropType.shape([]),
  }).isRequired,
  subscribe: PropType.func.isRequired,
  status: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  sub: state.subscribe,
});


export default connect(mapStateToProps,
  { subscribe: subscription, status: fetchStatus })(Subscribe);
