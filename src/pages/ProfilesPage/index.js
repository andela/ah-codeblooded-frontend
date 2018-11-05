import React, { Component } from 'react';
import EditProfiles from '../../containers/profiles/EditProfiles';
import ViewProfiles from '../../containers/profiles/ViewProfiles';

class Profiles extends Component {
  render() {
    return (
      <>
        <EditProfiles {...this.props} />
        <ViewProfiles {...this.props} />
      </>
    );
  }
}

export default Profiles;
