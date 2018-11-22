import React from 'react';
import EditProfiles from '../../containers/profiles/EditProfiles';
import ViewProfiles from '../../containers/profiles/ViewProfiles';

const Profiles = props => (
  <div>
    <EditProfiles {...props} />
    <ViewProfiles {...props} />
  </div>
);

export default Profiles;
