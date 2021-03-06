import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout.js';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return ({
        header: address,
        description: <Link route={`/campaigns/${address}`}><a>View campaign</a></Link>,
        fluid: true,
        style: { margin: '0em 0em .875em 0em' } // Optional, original margins we annoying me.
      });
    });

    return (
      <Card.Group items={items} style={{ margin: '0px' }} />
    );
  }

  render() {
    return (
      <Layout>
        <h3>Open Campaigns</h3>
        <Link route='campaigns/new'>
          <a>
            <Button
              floated='right'
              content='Create campaign'
              icon='add circle'
              primary
              labelPosition='left'
              style={{ marginLeft: '10px' }}
            />
          </a>
        </Link>
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
