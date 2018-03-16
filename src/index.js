import PlotlyEditor from './PlotlyEditor';
import DefaultEditor from './DefaultEditor';
import EditorControls from './EditorControls';
import {
  connectAnnotationToLayout,
  connectShapeToLayout,
  connectImageToLayout,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  dereference,
  localize,
  localizeString,
  walkObject,
} from './lib';
import {EDITOR_ACTIONS} from './lib/constants';

import {
  AnnotationAccordion,
  ShapeAccordion,
  ImageAccordion,
  AnnotationArrowRef,
  AnnotationRef,
  PositioningRef,
  ArrowSelector,
  AxesFold,
  AxesRange,
  AxesSelector,
  Button,
  CanvasSize,
  ColorPicker,
  ColorscalePicker,
  ContourNumeric,
  ErrorBars,
  DataSelector,
  Dropdown,
  Flaglist,
  Fold,
  FontSelector,
  Info,
  Layout,
  LayoutNumericFraction,
  LayoutNumericFractionInverse,
  NumericFraction,
  PositioningNumeric,
  NumericFractionInverse,
  LayoutPanel,
  LineDashSelector,
  LineShapeSelector,
  MenuPanel,
  Numeric,
  Panel,
  PanelMenuWrapper,
  Radio,
  Section,
  SingleSidebarItem,
  SymbolSelector,
  TextEditor,
  RangesliderVisible,
  TraceAccordion,
  TraceMarkerSection,
  TraceRequiredPanel,
  TraceSelector,
  SectionHeader,
} from './components';

import {
  GraphCreatePanel,
  StyleAxesPanel,
  StyleColorbarsPanel,
  StyleLayoutPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleShapesPanel,
  StyleImagesPanel,
  StyleTracesPanel,
} from './default_panels';

export {
  AnnotationAccordion,
  ShapeAccordion,
  ImageAccordion,
  AnnotationArrowRef,
  AnnotationRef,
  PositioningRef,
  ArrowSelector,
  AxesFold,
  AxesRange,
  AxesSelector,
  Button,
  CanvasSize,
  ColorPicker,
  ColorscalePicker,
  ContourNumeric,
  SectionHeader,
  ErrorBars,
  DataSelector,
  Dropdown,
  EDITOR_ACTIONS,
  RangesliderVisible,
  Flaglist,
  Fold,
  FontSelector,
  GraphCreatePanel,
  Info,
  Layout,
  LayoutNumericFraction,
  LayoutNumericFractionInverse,
  NumericFraction,
  PositioningNumeric,
  NumericFractionInverse,
  LayoutPanel,
  LineDashSelector,
  LineShapeSelector,
  MenuPanel,
  Numeric,
  Panel,
  PanelMenuWrapper,
  Radio,
  Section,
  SingleSidebarItem,
  StyleAxesPanel,
  StyleColorbarsPanel,
  StyleLayoutPanel,
  StyleLegendPanel,
  StyleNotesPanel,
  StyleShapesPanel,
  StyleImagesPanel,
  StyleTracesPanel,
  SymbolSelector,
  TextEditor,
  TraceAccordion,
  TraceMarkerSection,
  TraceRequiredPanel,
  TraceSelector,
  connectAnnotationToLayout,
  connectShapeToLayout,
  connectImageToLayout,
  connectAxesToLayout,
  connectLayoutToPlot,
  connectToContainer,
  connectTraceToPlot,
  dereference,
  localize,
  localizeString,
  walkObject,
  EditorControls,
  DefaultEditor,
};

export default PlotlyEditor;
