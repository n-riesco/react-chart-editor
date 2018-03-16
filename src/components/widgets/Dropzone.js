import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Drop from 'react-dropzone';
import {localize} from 'lib';
import shp from 'shpjs';

class Dropzone extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount() {
    const _ = this.props.localize;

    let content = _('Drop file to upload');

    if (this.props.fileType === 'shapefile') {
      if (this.props.value && this.props.value !== '') {
        content = <div>{_('GeoJSON loaded!')}</div>;
      } else {
        content = (
          <div>
            <p>{_('Drop shapefile to upload.')}</p>
            <p>
              {_(
                'Supported formats are: json/geojson or a zip containing ' +
                  'shp, shx, and dbf files.'
              )}
            </p>
          </div>
        );
      }
    }

    if (this.props.fileType === 'image') {
      if (this.props.value && this.props.value !== '') {
        content = <img src={this.props.value} />;
      } else {
        content = (
          <div>
            <p>{_('Drop image to upload.')}</p>
            <p>
              {_('Supported formats are: jpeg/jpg, svg, png, gif, bmp, webp.')}
            </p>
          </div>
        );
      }
    }

    this.setState({content});
  }

  onLoad(e, isJson) {
    if (this.props.fileType === 'shapefile') {
      const parsingError = _(
        'Yikes! An error occurred while parsing this file. ' +
          'Try again with a GeoJSON file (json/geojson) or a zip file containing ' +
          'a shp, shx, and dbf file.'
      );

      if (isJson) {
        try {
          this.props.onUpdate(JSON.parse(e.target.result));
          this.setState({
            content: _('GeoJSON loaded!'),
          });
        } catch (error) {
          this.setState({
            content: parsingError,
          });
        }
        return;
      }

      shp(e.target.result)
        .then(geojson => {
          this.props.onUpdate(geojson);
          this.setState({
            content: _('GeoJSON loaded!'),
          });
        })
        .catch(e => {
          console.warn(e);
          this.setState({
            content: parsingError,
          });
        });
    }

    if (this.props.fileType === 'image') {
      try {
        this.props.onUpdate(e.target.result);
        this.setState({
          content: <img src={e.target.result} />,
        });
      } catch (error) {
        console.warn(error);
        this.setState({
          content: _(
            'Yikes! An error occurred while parsing this file. ' +
              'Try again with a jpeg/jpg, svg, png, gif, bmp, or webp file.'
          ),
        });
      }
    }
  }

  onDrop(file) {
    const _ = this.props.localize;

    if (file.length > 1) {
      this.setState({
        content: _(
          'Yikes! You can only upload one file at a time. ' +
            'To upload multiple files, create multiple files and ' +
            'upload them individually.'
        ),
      });
      return;
    }

    this.setState({content: _('Loading...')});

    const isJson = /json$/i.test(file[0].name);
    const reader = new FileReader();
    reader.onload = e => this.onLoad(e, isJson);

    if (this.props.fileType === 'shapefile') {
      if (!['.json', '.geojson', '.zip'].some(t => file[0].name.endsWith(t))) {
        this.setState({
          content: _(
            "Yikes! This doesn't look like a valid shapefile to us. " +
              'Try again with a json/geojson, or zip with a shp, shx, and dbf file. '
          ),
        });
      } else {
        if (isJson) {
          reader.readAsText(file[0]);
        } else {
          reader.readAsArrayBuffer(file[0]);
        }
      }
    }

    if (this.props.fileType === 'image') {
      if (
        ['.jpeg', '.jpg', '.svg', '.png', '.gif', '.bmp', '.webp'].some(ext =>
          file[0].name.endsWith(ext)
        )
      ) {
        reader.readAsDataURL(file[0]);
      } else {
        this.setState({
          content: _(
            "Yikes! This doesn't look like a valid image file to us. " +
              'Try again with a jpg/jpeg, png, svg, bmp, webp or gif file. '
          ),
        });
      }
    }
  }

  render() {
    return (
      <Drop ref="dzone" onDrop={this.onDrop} disableClick={true}>
        <div
          style={{
            padding: '10px',
            width: '100%',
            height: '100%',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {this.state.content}
        </div>
      </Drop>
    );
  }
}

Dropzone.propTypes = {
  localize: PropTypes.func,
  fileType: PropTypes.string,
  onUpdate: PropTypes.func,
  value: PropTypes.any,
};

export default localize(Dropzone);
