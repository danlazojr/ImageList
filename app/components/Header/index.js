import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdLineWeight } from 'react-icons/md';
// import { Hidden } from 'components/material-ui';
import Hidden from '@material-ui/core/Hidden';
import Logo from 'images/adrenalin.svg';
import styles from './styles';

export class Header extends PureComponent {
  render = () => {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem className={classes.gridMain}>
          <AppBar position="static" color="transparent">
            <Toolbar>
              <GridContainer justify="space-between">
                <GridItem>
                  <Hidden mdUp>
                    <GridItem>
                      <Button
                        variant="inline"
                        className={classes.button}
                        color="secondary"
                      >
                        <MdLineWeight />
                      </Button>
                    </GridItem>
                  </Hidden>
                  <Hidden smDown>
                    <GridContainer>
                      <GridItem>
                        <Link to="/list" className={classes.item}>
                          <Typography variant="h7">Culture</Typography>
                        </Link>
                      </GridItem>
                      <GridItem>
                        <Link to="/list" className={classes.item}>
                          <Typography variant="h7">Work</Typography>
                        </Link>
                      </GridItem>
                      <GridItem>
                        <Link to="/list" className={classes.item}>
                          <Typography variant="h7">Clients</Typography>
                        </Link>
                      </GridItem>
                      <GridItem>
                        <Link to="/list" className={classes.item}>
                          <Typography variant="h7">Services</Typography>
                        </Link>
                      </GridItem>
                      <GridItem>
                        <Link to="/list" className={classes.item}>
                          <Typography variant="h7">Careers</Typography>
                        </Link>
                      </GridItem>
                      <GridItem>
                        <Link to="/list" className={classes.item}>
                          <Typography variant="h7">Contact</Typography>
                        </Link>
                      </GridItem>
                    </GridContainer>
                  </Hidden>
                </GridItem>
              </GridContainer>
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
