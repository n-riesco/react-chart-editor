import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropzone,
  ShapefileAccordion,
  ColorPicker,
  NumericFraction,
} from '../components';

import {localize} from '../lib';

const StyleShapefilePanel = ({localize: _}) => (
  <ShapefileAccordion canAdd>
    <Dropzone attr="source" fileType="shapefile" />
    <ColorPicker attr="color" label={_('Color')} />
    <NumericFraction attr="opacity" label={_('Opacity')} />
  </ShapefileAccordion>
);

StyleShapefilePanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleShapefilePanel);
