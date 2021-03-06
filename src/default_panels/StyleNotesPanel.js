import React from 'react';
import PropTypes from 'prop-types';
import {
  AnnotationArrowRef,
  AnnotationRef,
  AnnotationAccordion,
  ArrowSelector,
  ColorPicker,
  FontSelector,
  Info,
  Numeric,
  PositioningNumeric,
  Radio,
  TextEditor,
  Section,
  MenuPanel,
} from '../components';

import {localize} from '../lib';

const StyleNotesPanel = ({localize: _}) => (
  <AnnotationAccordion canAdd>
    <Section name={_('Note Text')} attr="text">
      <TextEditor attr="text" />
      <FontSelector label={_('Typeface')} attr="font.family" />
      <Numeric label={_('Font Size')} attr="font.size" units="px" />
      <ColorPicker label={_('Font Color')} attr="font.color" />
      <Numeric label={_('Angle')} attr="textangle" units="°" />
    </Section>
    <Section name={_('Arrow')}>
      <Radio
        attr="showarrow"
        options={[
          {label: _('Show'), value: true},
          {label: _('Hide'), value: false},
        ]}
      />
      <Numeric label={_('Line Width')} attr="arrowwidth" units="px" />
      <ColorPicker label={_('Color')} attr="arrowcolor" />
      <ArrowSelector label={_('Arrowhead')} attr="arrowhead" />
      <Numeric label={_('Scale')} step={0.1} attr="arrowsize" units="px" />
      <AnnotationArrowRef label="X Offset" attr="axref" />
      <AnnotationArrowRef label="Y Offset" attr="ayref" />
      <Numeric label={_('X Vector')} attr="ax" />
      <Numeric label={_('Y Vector')} attr="ay" />
    </Section>
    <Section name={_('Horizontal Positioning')}>
      <MenuPanel>
        <Section name={_('Anchor Point')}>
          <Info>
            {_(
              'The anchor point determines which side of the ' +
                "annotation's positioning coordinates refer to."
            )}
          </Info>
          <Radio
            attr="xanchor"
            options={[
              {label: _('Auto'), value: 'auto'},
              {label: _('Left'), value: 'left'},
              {label: _('Center'), value: 'center'},
              {label: _('Right'), value: 'right'},
            ]}
          />
        </Section>
      </MenuPanel>
      <AnnotationRef label={_('Relative To')} attr="xref" />
      <PositioningNumeric label={_('Position')} attr="x" />
    </Section>
    <Section name={_('Vertical Positioning')}>
      <MenuPanel>
        <Section name={_('Anchor Point')}>
          <Info>
            {_(
              'The anchor point determines which side of the ' +
                "annotation's positioning coordinates refer to."
            )}
          </Info>
          <Radio
            attr="yanchor"
            options={[
              {label: _('Auto'), value: 'auto'},
              {label: _('Top'), value: 'top'},
              {label: _('Middle'), value: 'middle'},
              {label: _('Bottom'), value: 'bottom'},
            ]}
          />
        </Section>
      </MenuPanel>
      <AnnotationRef label={_('Relative To')} attr="yref" />
      <PositioningNumeric label={_('Position')} attr="y" />
    </Section>
  </AnnotationAccordion>
);

StyleNotesPanel.propTypes = {
  localize: PropTypes.func,
};

export default localize(StyleNotesPanel);
