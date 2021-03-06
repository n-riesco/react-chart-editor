import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import {DataSelector, Radio, Numeric} from '../index';
import RadioBlocks from '../widgets/RadioBlocks';
import Field from './Field';
import {connectToContainer} from 'lib';

class ErrorBars extends Component {
  constructor(props, context) {
    super(props, context);
    this.updatePlot = this.updatePlot.bind(this);
  }

  updatePlot(value) {
    if (value === 'symmetric') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: true,
        symmetric: true,
      });
    }

    if (value === 'asymmetric') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: true,
        symmetric: false,
      });
    }

    if (value === 'hidden') {
      this.props.updatePlot({
        ...this.props.fullValue,
        visible: false,
      });
    }
  }

  getMode() {
    let mode;

    if (!this.props.fullValue.visible) {
      mode = 'hidden';
    }

    if (
      this.props.fullValue.visible &&
      (this.props.fullValue.symmetric ||
        typeof this.props.fullValue.symmetric === 'undefined')
    ) {
      // when this.props.fullValue.type === 'sqrt',
      // then this.props.fullValue.symmetric is undefined, but 'sqrt' is only
      // applicable when we want symmetric error bars
      // https://github.com/plotly/plotly.js/issues/2359
      mode = 'symmetric';
    }

    if (
      this.props.fullValue.visible &&
      this.props.fullValue.symmetric === false
    ) {
      // it has to be explicitly set to false, because we don't want it to catch
      // cases when it's undefined
      mode = 'asymmetric';
    }

    return mode;
  }

  renderModeSelector() {
    const {localize: _} = this.props;

    return (
      <Field>
        <RadioBlocks
          alignment="center"
          onOptionChange={this.updatePlot}
          activeOption={this.getMode()}
          options={[
            {label: _('Symmetric'), value: 'symmetric'},
            {label: _('Asymmetric'), value: 'asymmetric'},
            {label: _('Hidden'), value: 'hidden'},
          ]}
        />
      </Field>
    );
  }

  renderErrorBarControls() {
    const {localize: _} = this.props;
    const mode = this.getMode();
    const showCustomDataControl = this.props.fullValue.type === 'data';

    if (mode === 'symmetric') {
      return (
        <Fragment>
          <Radio
            label={_('Error Type')}
            attr={`${this.props.attr}.type`}
            options={[
              {label: _('%'), value: 'percent'},
              {label: _('Constant'), value: 'constant'},
              {label: _('√'), value: 'sqrt'},
              {label: _('Data'), value: 'data'},
            ]}
          />
          <Numeric label={_('Value')} attr={`${this.props.attr}.value`} />
          {showCustomDataControl ? (
            <DataSelector
              label={_('Custom Data')}
              attr={`${this.props.attr}.array`}
            />
          ) : null}
        </Fragment>
      );
    }

    if (mode === 'asymmetric') {
      return (
        <Fragment>
          <Radio
            label={_('Error Type')}
            attr={`${this.props.attr}.type`}
            options={[
              {label: _('%'), value: 'percent'},
              {label: _('Constant'), value: 'constant'},
              {label: _('Data'), value: 'data'},
            ]}
          />
          <Numeric label={_('Value')} attr={`${this.props.attr}.value`} />
          <Numeric
            label={_('Value (-)')}
            attr={`${this.props.attr}.valueminus`}
          />
          {showCustomDataControl ? (
            <Fragment>
              <DataSelector
                label={_('Error (+)')}
                attr={`${this.props.attr}.array`}
              />
              <DataSelector
                label={_('Error (-)')}
                attr={`${this.props.attr}.arrayminus`}
              />
            </Fragment>
          ) : null}
        </Fragment>
      );
    }

    return null;
  }

  render() {
    return (
      <Fragment>
        {this.renderModeSelector()}
        {this.renderErrorBarControls()}
      </Fragment>
    );
  }
}

ErrorBars.propTypes = {
  attr: PropTypes.string,
  localize: PropTypes.func,
  fullValue: PropTypes.object,
  updatePlot: PropTypes.func,
};

export default connectToContainer(ErrorBars);
