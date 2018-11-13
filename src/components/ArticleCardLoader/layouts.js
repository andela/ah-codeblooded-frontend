import React from 'react';
import layouts from '../ArticleCard/layouts';

export default {
  [layouts.VERTICAL_LAYOUT]: (
    <>
      <rect x="19.03" y="76.61" rx="0" ry="0" width="458" height="120" />
      <circle cx="48.44" cy="42.02" r="24.41" />
      <rect x="83.03" y="23.61" rx="0" ry="0" width="123" height="12" />
      <rect x="84.03" y="42.61" rx="0" ry="0" width="83" height="8" />
      <rect x="21.03" y="208.61" rx="0" ry="0" width="397" height="31.05" />
      <rect x="23.03" y="255.61" rx="0" ry="0" width="287" height="6" />
      <rect x="23.03" y="275.61" rx="0" ry="0" width="281" height="6" />
    </>
  ),
  [layouts.HORIZONTAL_LAYOUT]: (
    <>
      <rect x="10.03" y="24.61" rx="0" ry="0" width="187" height="167" />
      <circle cx="246.73" cy="54.31" r="29.7" />
      <rect x="284.03" y="33.61" rx="0" ry="0" width="115" height="9" />
      <rect x="286.03" y="53.61" rx="0" ry="0" width="98" height="8" />
      <rect x="210.03" y="96.61" rx="0" ry="0" width="276" height="33" />
      <rect x="210.03" y="136.61" rx="0" ry="0" width="131" height="11" />
      <rect x="208.03" y="156.61" rx="0" ry="0" width="118" height="8" />
    </>
  ),
  [layouts.HORIZONTAL_REVERSE_LAYOUT]: (
    <>
      <rect x="304.03" y="21.61" rx="0" ry="0" width="187" height="167" />
      <circle cx="45.73" cy="56.31" r="29.7" />
      <rect x="88.03" y="37.61" rx="0" ry="0" width="115" height="9" />
      <rect x="89.03" y="55.61" rx="0" ry="0" width="98" height="8" />
      <rect x="22.03" y="97.61" rx="0" ry="0" width="276" height="33" />
      <rect x="23.03" y="138.61" rx="0" ry="0" width="131" height="11" />
      <rect x="24.03" y="156.61" rx="0" ry="0" width="118" height="8" />
    </>
  ),
  [layouts.MINIMAL_AUTHOR_LAYOUT]: (
    <>
      <circle cx="45.73" cy="56.31" r="29.7" />
      <rect x="88.03" y="37.61" rx="0" ry="0" width="115" height="9" />
      <rect x="89.03" y="55.61" rx="0" ry="0" width="98" height="8" />
      <rect x="21.03" y="97.61" rx="0" ry="0" width="397.44" height="33" />
      <rect x="23.03" y="135.61" rx="0" ry="0" width="351.08" height="13.75" />
      <rect x="22.03" y="155.61" rx="0" ry="0" width="118" height="8" />
    </>
  ),
  [layouts.MINIMAL_LAYOUT]: (
    <>
      <rect x="14.03" y="3.61" rx="0" ry="0" width="472" height="35" />
      <rect x="14.03" y="50.61" rx="0" ry="0" width="324" height="11" />
      <rect x="16.03" y="72.61" rx="0" ry="0" width="290" height="10" />
    </>
  ),
};

export const sizes = {
  [layouts.MINIMAL_LAYOUT]: 100,
  [layouts.MINIMAL_AUTHOR_LAYOUT]: 200,
  [layouts.HORIZONTAL_REVERSE_LAYOUT]: 300,
  [layouts.HORIZONTAL_LAYOUT]: 300,
  [layouts.VERTICAL_LAYOUT]: 300,
};
