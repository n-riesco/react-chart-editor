import Field from './Field';
import PropTypes from 'prop-types';
import Dropdown from '../widgets/Dropdown';
import RadioBlocks from '../widgets/RadioBlocks';
import React, {Component} from 'react';
import {localize} from 'lib';

class AxesSelector extends Component {
  constructor(props, context) {
    super(props, context);

    if (!context.axesTargetHandler) {
      throw new Error(
        'AxesSelector must be nested within a connectAxesToPlot component'
      );
    }
  }

  render() {
    const {axesTargetHandler, axesOptions, axesTarget} = this.context;
    const {localize: _} = this.props;
    const hasSecondaryAxis =
      axesOptions &&
      axesOptions.some(option => {
        return (
          option.axisGroup &&
          this.context.fullLayout._subplots[option.axisGroup].length > 1
        );
      });

    if (hasSecondaryAxis) {
      return (
        <Field {...this.props} label={_('Axis to Style')}>
          <Dropdown
            options={axesOptions.map(option => {
              if (option.value !== 'allaxes') {
                return {
                  label: option.title,
                  value: option.value,
                };
              }

              return option;
            })}
            value={axesTarget}
            onChange={axesTargetHandler}
            clearable={false}
          />
        </Field>
      );
    }

    return (
      <Field {...this.props} center>
        <RadioBlocks
          options={axesOptions}
          activeOption={axesTarget}
          onOptionChange={axesTargetHandler}
        />
      </Field>
    );
  }
}

AxesSelector.contextTypes = {
  axesTargetHandler: PropTypes.func,
  axesOptions: PropTypes.array,
  axesTarget: PropTypes.string,
  fullLayout: PropTypes.object,
};

AxesSelector.propTypes = {
  localize: PropTypes.func,
};

export default localize(AxesSelector);
