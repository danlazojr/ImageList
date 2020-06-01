import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdLineWeight } from 'react-icons/md';
import styles from './styles';
import messages from './messages';

export class Header extends PureComponent {
  render = () => {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem className={classes.gridMain}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MdLineWeight />
                <Link to="/list" className={classes.link}>
                  <Typography variant="h7">
                    <FormattedMessage {...messages.imgaeList} />
                  </Typography>
                </Link>
              </IconButton>
            </Toolbar>
          </AppBar>
        </GridItem>
      </GridContainer>
    );
  };
}
Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
};
// export default Header;
export default compose(withStyles(styles, { name: 'Header' }))(Header);
