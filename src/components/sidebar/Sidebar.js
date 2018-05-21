import React, { Component } from 'react'
import SidebarPathway from './SidebarPathway'

import { withApollo, graphql } from 'react-apollo'

import { FETCH_USER_PATHWAYS } from '../../queries'

// Represents the left column.  Will show other content
class SidebarComponent extends Component {
  // The "multi" questions are the path selectors
  isBlockingQuestion() {
    // TODO: Also have to make sure it's not a pathways question??
    return !this.props.data.userPathways || !this.props.data.userPathways.length
  };

  emptyContentSidebar() {
    return (
      <div className="item empty">
        <div className="basket_empty_img"></div>
        <p>Path Selection<br />in progress</p>
      </div>
    )
  };

  pathwaysSidebar() {
    return (
      <div id="basket_list" className="item">
        <div className="info">
          <p className="paths_count"><span>{this.props.data.userPathways.length}</span> pathways identified</p>
          {/* TODO: <p className="paths_completed"><span>{this.props.data.userPathways.filter(p => p.completed).length}</span> completed</p>*/}
        </div>
        <ul>
          {this.props.data.userPathways.map(p => (
            <SidebarPathway title={p.pathwayTitle} description={p.description} key={p.id}></SidebarPathway>
          ))}
        </ul>

        {/* TODO: Hide report button, not implemented <button id="preview_btn">Preview report</button>*/}
      </div>
    )
  }

  // TODO: Add a clear below pathwaysSidebar if needed..?
  //<div className="float_clear"></div>

  render() {
    console.log(this);

    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    if (this.props.data.error) {
      return <div>Error: {this.props.data.error}</div>
    }

    const sidebar_content_jsx = this.isBlockingQuestion() ? this.emptyContentSidebar() : this.pathwaysSidebar();
    return (
      <div id="sidebar">
        <div id="basket">
          {sidebar_content_jsx}
        </div>
        <div id="help">
          <h3>
            Help resources
            <button className="help_close_btn">Close X</button>
          </h3>
          <ul>
            <li className="help_article">
              This is general help text that can be broken into separate paragrpaphs but is all part of one long article of help content.
              <p>
              It can be separated by &lt;p&gt; tags but is contained in a single fluid width div that resizes based on how much content is added
              </p>
            </li>
            <li className="help_faq">
              Q: This is a FAQ question
              <p>A: This is an answer to the above FAQ question.</p>
              Q: This is another FAQ question
              <p>A: This is another FAQ answer</p>
            </li>
            <li className="help_tip">
              This is a tip or reminder of something that the user could do
            </li>
            <li className="help_url">
              <a href="http://" target="blank_">This is a hyperlink that takes the user to a help article
              </a>
              <a href="http://" target="blank_">This is another hyperlink that takes the user to a help article
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withApollo(
  graphql(FETCH_USER_PATHWAYS, {
    options: (props) => ({
      variables: {
        // TODO: What variables should we really pass in?
        explorationId: props.match.params.id
      }
    })
  })(SidebarComponent))