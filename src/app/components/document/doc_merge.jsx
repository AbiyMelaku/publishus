import React from 'react';
import { connect } from 'react-redux';

// UI
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// Components
import MergeReview from './doc_merge_review.jsx';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

// Store properties
import * as doc from '../../actions/docActions.jsx';
import * as docSummary from './../../actions/docSummaryActions.jsx';
import * as merge from '../../actions/mergeActions.jsx';

export class Doc_merge extends React.Component {
  constructor(props) {
    super(props);
    this.reviewChanges = this.reviewChanges.bind(this);
    this.cancelComment = this.cancelComment.bind(this);
    this.submitMergeComment = this.submitMergeComment.bind(this);
    this.switchSplitOrUnified = this.switchSplitOrUnified.bind(this);
    this.editMerge = this.editMerge.bind(this);
    this.mergeRequestList = this.mergeRequestList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTooltip = this.addTooltip.bind(this);
  }

  componentWillMount() {    
    this.props.dispatch(docSummary.switchSplitOrUnified('split'));
  }

  reviewChanges(e) {
    this.props.dispatch(docSummary.reviewChanges(e));
  }

  cancelComment() {
    this.props.dispatch(docSummary.cancelComment());
  }

  submitMergeComment(e) {
    e.preventDefault();

    var actionPRInfo = {
      commitID: this.props.merge.mergeCommitID,
      ownerMessage: this.props.merge.ownerMergeMessage,
      mergeStatus: 'accept'
    }

   if (e.target.name === 'declineMerge') {
      actionPRInfo.mergeStatus = 'decline';
    }

    this.props.dispatch(docSummary.actionPullRequest(actionPRInfo));
  }

  switchSplitOrUnified(e) {
    e.preventDefault();
    this.props.dispatch(docSummary.switchSplitOrUnified(e.target.value));
  }

  editMerge() {
    this.props.dispatch(doc.loadOriginalContent());
    this.props.dispatch(docSummary.editMerge())
  }

  mergeRequestList() {
    this.props.dispatch(merge.displayMerge());
  }

  handleChange(e) {
    e.preventDefault();
    this.props.dispatch(doc.handleChange(e.target.name, e.target.value));
  }

  addTooltip(text) {
    return (
      <Tooltip id="tooltip">{text}</Tooltip>
    );
  }

  commentBox() {
    if (this.props.docSummary.reviewChanges.acceptComments) {
      return (
        <div className="merge-comment text-left">
          <div onClick={this.cancelComment} className="btn-exit">x</div>
          <h5 className="mb10">Accept with comments</h5>
          <form onSubmit={this.submitMergeComment} name="acceptMerge">
            <textarea onChange={this.handleChange} type="text" value={this.props.merge.ownerMergeMessage} name="ownerMergeMessage" placeholder="Add a comment for this merge" />
            <input className="btn-purple" type="submit" value="Accept and send" />
            <div onClick={this.cancelComment} className="btn-cancel text-right">cancel</div>
          </form>
        </div>
      )
    } else if (this.props.docSummary.reviewChanges.declineComments) {
      return (
        <div className="merge-comment text-left">
          <div onClick={this.cancelComment} className="btn-exit">x</div>
          <h5 className="mb10">Decline with comments</h5>
          <form onSubmit={this.submitMergeComment} name="declineMerge">
            <textarea onChange={this.handleChange} type="text" value={this.props.merge.ownerMergeMessage} name="ownerMergeMessage" placeholder="Add a decline comment" />
            <input className="btn-purple" type="submit" value="Decline and send" />
            <div onClick={this.cancelComment} className="btn-cancel text-right">cancel</div>
          </form>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="doc-merge mt10 mb10">
        <div className="row">
          <div className="col-sm-12">
            <div className="row actions-container mt10">
              <div className="col-sm-12">
                <div className="merge-actions text-center">
                  <div className="row">
                    <div className="col-md-6 text-left">
                      <OverlayTrigger placement="top" overlay={this.addTooltip('Back to edit requests')}>
                        <span onClick={this.mergeRequestList} className="back-to-requests">Edit requests</span>
                      </OverlayTrigger>
                      <span className="merge-request-details ml10"><i class="fa fa-angle-right mr5" aria-hidden="true"></i> {this.props.merge.mergeDetails.username}<span> wants to </span>{this.props.merge.mergeDetails.collaboratorMessage}</span>
                    </div>
                    <div className="col-md-6 text-right merge-review-actions">
                      <ButtonGroup className="mr10 view-toggle">
                        <OverlayTrigger className="hidden-xs hidden-sm" placement="top" overlay={this.addTooltip('Split view')}>
                          <Button className={(this.props.docSummary.mergeSplitView === 'split') ? 'radioActive hidden-xs hidden-sm' : 'hidden-xs hidden-sm'} onClick={this.switchSplitOrUnified} value="split" bsSize="small">Split</Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={this.addTooltip('Unified view')}>
                          <Button className={(this.props.docSummary.mergeSplitView === 'unified') ? 'radioActive' : ''} onClick={this.switchSplitOrUnified} value="unified" bsSize="small">Unified</Button>
                        </OverlayTrigger>
                      </ButtonGroup>
                      <ButtonGroup className="mr10">
                        <OverlayTrigger placement="top" overlay={this.addTooltip('Modify this edit')}>
                          <Button onClick={this.editMerge} bsSize="small"><i className="fa fa-pencil"></i></Button>
                        </OverlayTrigger>
                      </ButtonGroup>
                      <DropdownButton onSelect={this.reviewChanges} bsSize="small" title="Review changes" id="review-merge">
                        <MenuItem eventKey="acceptQuick" name="acceptQuick" onClick={this.submitMergeComment}>Quick Accept</MenuItem>
                        <MenuItem eventKey="acceptComments">Accept with comments</MenuItem>
                        <MenuItem eventKey="declineComments">Decline with comments</MenuItem>
                      </DropdownButton>
                      {this.commentBox()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row doc-review-container mt10">
              <div className="col-sm-12">
                <div className="doc-review">
                  <MergeReview />
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Doc_merge);
