import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Button, ButtonGroup } from 'react-bootstrap';
import {
  FrontEndForm,
  BackEndForm
} from './Forms.jsx';

import { submitChallenge, openBugModal } from '../../redux/actions';
import { challengeSelector } from '../../redux/selectors';
import {
  simpleProject,
  frontEndProject
} from '../../../../utils/challengeTypes';
import { toggleHelpChat } from '../../../../redux/actions';

const bindableActions = {
  submitChallenge,
  toggleHelpChat,
  openBugModal
};
const mapStateToProps = createSelector(
  challengeSelector,
  state => state.app.isSignedIn,
  state => state.challengesApp.isSubmitting,
  (
    { challenge: { challengeType = simpleProject } },
    isSignedIn,
    isSubmitting
  ) => ({
    isSignedIn,
    isSubmitting,
    isSimple: challengeType === simpleProject,
    isFrontEnd: challengeType === frontEndProject
  })
);

export class ToolPanel extends PureComponent {
  static propTypes = {
    isSignedIn: PropTypes.bool,
    isSimple: PropTypes.bool,
    isFrontEnd: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    toggleHelpChat: PropTypes.func.isRequired,
    openBugModal: PropTypes.func.isRequired,
    submitChallenge: PropTypes.func.isRequired
  };

  renderSubmitButton(isSignedIn, submitChallenge) {
    const buttonCopy = isSignedIn ?
      'Submit and go to my next challenge' :
      "I've completed this challenge";
    return (
      <Button
        block={ true }
        bsStyle='primary'
        className='btn-big'
        onClick={ submitChallenge }
        >
        { buttonCopy } (ctrl + enter)
      </Button>
    );
  }

  render() {
    const {
      isFrontEnd,
      isSimple,
      isSignedIn,
      isSubmitting,
      submitChallenge,
      toggleHelpChat,
      openBugModal
    } = this.props;

    const FormElement = isFrontEnd ? FrontEndForm : BackEndForm;
    return (
      <div>
        {
          isSimple ?
            this.renderSubmitButton(isSignedIn, submitChallenge) :
            <FormElement isSubmitting={ isSubmitting }/>
        }
        <div className='button-spacer' />
        <ButtonGroup justified={ true }>
          <Button
            bsStyle='primary'
            className='btn-primary-ghost btn-big'
            componentClass='div'
            onClick={ toggleHelpChat }
            >
            Help
          </Button>
          <Button
            bsStyle='primary'
            className='btn-primary-ghost btn-big'
            componentClass='div'
            onClick={ openBugModal }
            >
            Bug
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  bindableActions
)(ToolPanel);
