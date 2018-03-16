import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDisplayName} from '../lib';
import {EDITOR_ACTIONS} from './constants';

export default function connectShapefileToLayout(WrappedComponent) {
  class ShapefileConnectedComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.deleteShapefile = this.deleteShapefile.bind(this);
      this.updateShapefile = this.updateShapefile.bind(this);
      this.setLocals(props, context);
    }

    componentWillReceiveProps(nextProps, nextContext) {
      this.setLocals(nextProps, nextContext);
    }

    setLocals(props, context) {
      const {shapefileIndex} = props;
      const {container, fullContainer} = context;

      const shapefiles = container.mapbox.layers || [];
      const fullShapefiles = fullContainer.mapbox.layers || [];
      this.container = shapefiles[shapefileIndex];
      this.fullContainer = fullShapefiles[shapefileIndex];
    }

    getChildContext() {
      return {
        updateContainer: this.updateShapefile,
        deleteContainer: this.deleteShapefile,
        container: this.container,
        fullContainer: this.fullContainer,
      };
    }

    updateShapefile(update) {
      const newUpdate = {};
      const {shapefileIndex} = this.props;
      for (const key in update) {
        const newkey = `mapbox.layers[${shapefileIndex}].${key}`;
        newUpdate[newkey] = update[key];
      }
      this.context.updateContainer(newUpdate);
    }

    deleteShapefile() {
      if (this.context.onUpdate) {
        this.context.onUpdate({
          type: EDITOR_ACTIONS.DELETE_SHAPEFILE,
          payload: {shapefileIndex: this.props.shapefileIndex},
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ShapefileConnectedComponent.displayName = `ShapefileConnected${getDisplayName(
    WrappedComponent
  )}`;

  ShapefileConnectedComponent.propTypes = {
    shapefileIndex: PropTypes.number.isRequired,
  };

  ShapefileConnectedComponent.contextTypes = {
    container: PropTypes.object,
    fullContainer: PropTypes.object,
    data: PropTypes.array,
    onUpdate: PropTypes.func,
    updateContainer: PropTypes.func,
  };

  ShapefileConnectedComponent.childContextTypes = {
    updateContainer: PropTypes.func,
    deleteContainer: PropTypes.func,
    container: PropTypes.object,
    fullContainer: PropTypes.object,
  };

  const {plotly_editor_traits} = WrappedComponent;
  ShapefileConnectedComponent.plotly_editor_traits = plotly_editor_traits;

  return ShapefileConnectedComponent;
}
