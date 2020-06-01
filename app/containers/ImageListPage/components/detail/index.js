/*
 * FeaturePage
 *
 * List all the features
 */
import React, { PureComponent } from 'react';
import {
  IMAGE_URL,
  IMAGES_MAPPER_MAIN,
  SORTER,
  LATEST,
  OLDEST,
} from 'appConstants';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import H3 from 'components/H3';
import H1 from 'components/H1';
import moment from 'moment';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MdLoop } from 'react-icons/md';
import styles from './styles';

export class Detail extends PureComponent {
  state = {
    sortBy: LATEST,
  };

  setSort = () => {
    const { sortBy } = this.state;
    const newState = LOGIC_HELPERS.switchCase(sortBy, {
      UNSORTED: OLDEST,
      LATEST: OLDEST,
      OLDEST: LATEST,
    });
    this.setState({ sortBy: newState });
  };

  sortBy = order => (a, b) => {
    const aValue = moment(a.date);
    const bValue = moment(b.date);

    // asc
    if (order === LATEST) {
      if (!bValue) return 1;
      if (!aValue) return -1;
      return moment(moment(a.date)).isAfter(moment(b.date)) ? 1 : -1;
    }

    // desc
    if (!bValue) return -1;
    if (!aValue) return 1;
    return moment(moment(a.date)).isBefore(moment(b.date)) ? 1 : -1;
  };

  getImageUrl = (id, image) => `${IMAGE_URL}${IMAGES_MAPPER_MAIN[id]}/${image}`;

  renderContent = (questions = []) => {
    const { classes } = this.props;
    const { sortBy } = this.state;
    if (questions.length === 0) return 'No data available';
    // Set default content index number starting from oldest (dan lazo)
    let details = questions.sort(this.sortBy(LATEST)).map((det, index) => ({
      ...det,
      position: index + 1,
    }));
    details = details.sort(this.sortBy(sortBy));

    return (
      <GridContainer direction="column" spacing={0} justify="center">
        <GridItem>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.setSort}
          >
            <Typography variant="h5" className={classes.sorterBtn}>
              {SORTER[this.state.sortBy]}
              <MdLoop className={classes.iconSorter} />
            </Typography>
          </IconButton>
        </GridItem>
        {details.map(val => {
          const dateVal = moment(val.date)
            .format('DD/MM/YYYY')
            .toString();
          return (
            <React.Fragment>
              <GridItem>
                <H3 className={classes.title}>{`Content ${val.position}`}</H3>
              </GridItem>
              <GridItem className={classes.date}>{dateVal}</GridItem>
              <GridItem>{val.text}</GridItem>
            </React.Fragment>
          );
        })}
      </GridContainer>
    );
  };

  renderItem = () => {
    const { classes, data } = this.props;

    if (!data) return 'No data yet';
    const { id, title_long: titleLong, questions, image } = data;

    return (

      <GridContainer justify="center" direction="row">
        <GridItem>
          <a href={`/list?id=${id}`}>
            <img
              src={this.getImageUrl(id, image)}
              alt="loading"
              className={classes.img}
            />
          </a>
        </GridItem>
        <GridItem>
          <GridContainer direction="column">
            <GridItem className={classes.question}>
              <H1 className={classes.contentTile}>{titleLong}</H1>
            </GridItem>
            <GridItem className={classes.question}>
              {this.renderContent(questions)}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };

  render = () => <React.Fragment>{this.renderItem()}</React.Fragment>;
}

Detail.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
  data: PropTypes.object,
};
// export default FeaturePage;
export default compose(withStyles(styles, { name: 'Detail' }))(Detail);
