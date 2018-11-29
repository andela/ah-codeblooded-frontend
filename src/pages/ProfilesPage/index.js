import React from 'react';
import EditProfiles from '../../containers/profiles/EditProfiles';
import ConnectedViewProfiles from '../../containers/profiles/ViewProfiles';

const Profiles = props => (
  <div>
    <EditProfiles {...props} />
    <ConnectedViewProfiles {...props} />
  </div>
);

export default Profiles;
