import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const styleSheet = {
  root: {},
  card: {
    background: 'white',
    padding: 16,
  },
  elevation0: {
    // border: '1px solid rgb(209, 213, 221)',
    // borderRadius: 4,
  },
  elevation1: {
    boxShadow: 'unset',
    backgroundColor: '#fafbfc',
  },
  elevation2: {
    boxShadow: '0 1px 3px 0 rgba(37,32,31,.3)',
    // backgroundColor: '',
  },
  offset: {
    margin: '0 -16px',
    width: 'calc(100% + 32px)',
  },
  shadow: {
    // boxShadow: '0 2px 3px 2px rgba(0,0,0,.03)',
    boxShadow: '0px 1px 1px gainsboro',
  },
  highlight: {
    boxShadow: '0px 1px 3px 0px rgb(154, 171, 179)',
  },
  borderHighlight: {
    borderColor: '#98b9ff',
  },
  halfPadding: {
    padding: 8,
  },
  dense: {
    padding: 0,
  },
  dashed: {
    borderStyle: '1px dashed rgb(209, 213, 221)',
  },
  paddingBottom0: {
    paddingBottom: 0,
  },
};

export class GridContainer extends PureComponent {
  renderGrid = () => {
    const {
      children,
      classes,
      className,
      spacing,
      card,
      dense,
      elevation,
      cardClassName,
      highlight,
      borderHighlight,
      shadow,
      dashed,
      halfPadding,
      ...rest
    } = this.props;

    return (
      <Grid
        container
        className={classNames(classes.root, className)}
        spacing={spacing}
        {...rest}
      >
        {children}
      </Grid>
    );
  };

  renderCard = () => {
    const {
      classes,
      dense,
      elevation,
      shadow,
      highlight,
      borderHighlight,
      halfPadding,
      cardClassName,
      dashed,
      paddingBottom0,
    } = this.props;

    return (
      <div
        className={classNames(
          classes.card,
          LOGIC_HELPERS.ifElse([shadow, elevation === 0], classes.shadow),
          LOGIC_HELPERS.ifElse(highlight, classes.highlight),
          LOGIC_HELPERS.ifElse(borderHighlight, classes.borderHighlight),
          classes[`elevation${elevation}`],
          LOGIC_HELPERS.ifElse(dense, classes.dense),
          LOGIC_HELPERS.ifElse(halfPadding, classes.halfPadding),
          LOGIC_HELPERS.ifElse(paddingBottom0, classes.paddingBottom0),
          LOGIC_HELPERS.ifElse(dashed, classes.dashed),
          cardClassName,
        )}
      >
        {this.renderGrid()}
      </div>
    );
  };

  render = () => {
    const { card } = this.props;

    if (card) {
      return this.renderCard();
    }

    return this.renderGrid();
  };
}

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  cardClassName: PropTypes.string,
  spacing: PropTypes.number,

  shadow: PropTypes.bool,
  highlight: PropTypes.bool,
  borderHighlight: PropTypes.bool,
  card: PropTypes.bool,
  dense: PropTypes.bool,
  halfPadding: PropTypes.bool,
  dashed: PropTypes.bool,
  paddingBottom0: PropTypes.bool,
  elevation: PropTypes.number,
};

GridContainer.defaultProps = {
  spacing: 1,
  elevation: 0,
  shadow: false,
};

const StyleGridContainer = withStyles(styleSheet, { name: 'GridContainer' })(
  GridContainer,
);
export const GridContainerTest = GridContainer;
export default StyleGridContainer;
