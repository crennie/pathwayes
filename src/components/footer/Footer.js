import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const mapStateToProps = state => ({
	hasBack: state.currentForm.has_back,
	hasNext: state.currentForm.has_next,
	currentFormName: state.currentForm.name,
	nextEnabled: state.currentForm,
	isLoading: state.currentForm.loading
})

const mapDispatchToProps = dispatch => ({
  submitCurrentForm: (formName) => dispatch(submit(formName))
});

const Footer = (props) => {
	const { isLoading, hasBack, hasNext, onNext } = props
	const boundedOnNext = () => props.submitCurrentForm(props.currentFormName)	
	return (
		<footer id="footer">
			<div className="max_width">
				<div className="controls">
					{ isLoading ? <div id="loading">Loading</div> : (
						<div className="group1">
							<button id="basket_btn" className="btn"></button>
							
							{hasNext ? (
								<button id="next_btn" className="btn enable" onClick={boundedOnNext}>
									<span>Next</span>
								</button>
							) : null}
							{hasNext && hasBack ? (<span className="delimiter"></span>) : null}
							{hasBack ? (
								<button id="back_btn" className="btn enable">
									<span>Back</span>
								</button>
							) : null}
						</div>
					)}
					{/* TODO NOTE: This was removed from adjacent to group1
							<div className="group2">
								<button className="btn help_close_btn">
								<span>Close</span>
								</button>
								<button id="basket_continue_btn" className="btn">
									<span>Continue</span>
								</button>					
							</div>
						*/}
				</div>
			</div>
		</footer>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)