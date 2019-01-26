import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchterm: "",
      json: {},
      amount: 3
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  handleChange(event) {
    this.setState({ searchterm: event.target.value });
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  componentDidMount() {}

  async fetchProducts(searchTerm, topNumber) {
    //Make api call, updates list
    const response = await fetch(
      `http://localhost:4000/nordstrom?top=${topNumber}&keyword=${searchTerm}`
    );
    const json = await response.json();
    this.setState({ json });
    console.log(json);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchProducts(this.state.searchterm, this.state.amount);
  }

  render() {
    console.log(this.state);
    let products = null;
    if (this.state.json.Products) {
      products = this.state.json.Products.map(product => {
        const imageUrl =
          "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/" +
          product.Media[0].Path;
        return (
          <>
            <div key={product.SkuId}>
              <h3>{product.Name}</h3>
              <img width="300" src={imageUrl} />
            </div>
          </>
        );
      });
    }

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Amount</label>
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
          <label>
            Search term:
            <input
              type="text"
              value={this.state.searchterm}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {products}
      </div>
    );
  }
}

export default App;
