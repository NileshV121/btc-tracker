import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchBtcPriceAction } from '../actions/btc-api';
import { updateSelectedCurrency, calcualteBtc, updateBtcInputTerm } from '../actions/btc-info';

import {
  getCalculatedBtcPrice,
  getCurrencies,
  getCurrentBtcPrice,
  getInputTerm,
  getSelectedCurrency,  
} from '../selectors/btc-price';
import { getBtcPriceInfo } from '../selectors/btc-info';

class PriceInfo extends Component {

  componentDidMount() {
    this.props.fetchBtcPrice();
    this.timerID = setInterval(
      () => this.props.fetchBtcPrice(), 10000
    );
  }

  render() {
    const {
      currencies,
      inputTerm,
      calcualteBtc,
      currentBtcPrice,
      selectedCurrency,
      calculatedBtcPrice,
      updateBtcInputTerm,
      updateSelectedCurrency,
    } = this.props;

    return (
      <div>
        <div>
          <span>Current Btc Price: {currentBtcPrice}</span>
        </div>
        <div>
          <span>Default Currency: {selectedCurrency}</span>
        </div>
        <div>
          <span>Calcualted Btc Price: {calculatedBtcPrice}</span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="amount"
              value={inputTerm}
              onChange={e => updateBtcInputTerm(e.target.value)}
            />
          </label>
          <label htmlFor="firstname">Currency:
            <select onChange={e => updateSelectedCurrency(e.target.value)}>
              {currencies.map((value, index) =>
                <option key={index} value={value}>{value}</option>
              )}
            </select>
          </label>
          <input type="button" onClick={() => calcualteBtc(inputTerm)} value="check" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  btcPriceInfo: getBtcPriceInfo(state),
  currentBtcPrice: getCurrentBtcPrice(state),
  calculatedBtcPrice: getCalculatedBtcPrice(state),
  currencies: getCurrencies(state),
  selectedCurrency: getSelectedCurrency(state),
  inputTerm: getInputTerm(state),
});

const mapDispatchToProps = dispatch => ({
  fetchBtcPrice: () => dispatch(fetchBtcPriceAction()),
  updateSelectedCurrency: currency => dispatch(updateSelectedCurrency(currency)),
  calcualteBtc: heldBtc => dispatch(calcualteBtc(heldBtc)),
  updateBtcInputTerm: input => dispatch(updateBtcInputTerm(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceInfo);
