/*
 * FeaturePage
 *
 * List all the features
 */
import React, { PureComponent } from 'react';
import { DATA_URL, IMAGE_URL, IMAGES_MAPPER_THUMB } from 'appConstants';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import H3 from 'components/H3';
import request from 'utils/request';
import qs from 'qs';
import styles from './styles';
import Detail from './components/detail';

export class ImageListPage extends PureComponent {
  state = {
    data: null,
  };

  componentDidMount = () => this.fetchData();

  fetchData = async () => {
    if (this.state.data) return;
    const result = await request(DATA_URL);
    this.setState({ data: result });
  };

  parseQueryParam = (url, opt = { ignoreQueryPrefix: true }) =>
    qs.parse(url, opt);

  getImageUrl = (id, image) =>
    `${IMAGE_URL}${IMAGES_MAPPER_THUMB[id]}/${image}`;

  getQueryId = () => {
    const queryParm = get(this, 'props.location.search', null);
    const parsedSearch = this.parseQueryParam(queryParm);
    // console.log({parsedSearch, queryParm, location});
    if (parsedSearch) {
      const tabId = get(parsedSearch, 'id');
      if (tabId) {
        return Number(tabId);
      }
    }
    return null;
  };

  renderItem = data => <Detail data={data} />;

  renderItems = () => {
    const { data } = this.state;
    const { classes } = this.props;
    if (!data) return 'No data yet';
    const parseId = this.getQueryId();
    let details = data;

    if (parseId) {
      details = data.filter(val => val.id === parseId);
      return this.renderItem(...details);
    }

    return (
      <GridContainer justify="center" card>
        {details.map(({ id, title_long: titleLong, image }) => (
          <GridItem className={classes.content}>
            <GridContainer direction="column" spacing={0}>
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
                <H3 className={classes.title}>{titleLong}</H3>
              </GridItem>
            </GridContainer>
          </GridItem>
        ))}
      </GridContainer>
    );
  };

  render = () => (
    // const { history } = this.props;

    <React.Fragment>{this.renderItems()}</React.Fragment>
  );
}

ImageListPage.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // parent props
};
export default compose(withStyles(styles, { name: 'ImageListPage' }))(
  ImageListPage,
);
