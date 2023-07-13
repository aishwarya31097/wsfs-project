import React, { Component } from "react";
import PropTypes from "prop-types";
import Tooltip from '@material-ui/core/Tooltip';

export class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };
  static defaultProperty = {
    suggestions: []
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: this.props.default,
      description: ''
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const fSuggestions = suggestions.filter(
      suggestion => suggestion.value.toLowerCase().includes(userInput.toLowerCase())
    );

    // const filteredSuggestions = suggestions.filter(
    //   suggestion =>
    //     suggestion.value.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    // );
    const description = suggestions.filter(
      suggestion => suggestion.value == userInput
    );
    this.props.onchange(description, "OnChange");

    this.setState({ description: description })

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: fSuggestions,

      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

   handleChange = event => {
}

  

  onClick = e => {

    const description = this.props.suggestions.filter(
      suggestion => suggestion.value == e.currentTarget.innerText
    );
    this.props.onchange(description, "onClick");

    this.setState({ description: description })
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    const description = this.props.suggestions.filter(
      suggestion => suggestion.value == this.state.userInput
    );
    this.props.onchange(description, "onKeyDown");

    this.setState({ description: description })


    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };
  componentDidMount() {

    const description = this.props.suggestions.filter(
      suggestion => suggestion.value == this.state.userInput
    );

    this.setState({ description: description })
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "";
              }

              return (
                <li key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <ul class="suggestions notFound">
            <li>No suggestions</li>
          </ul>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="col-md-6">

       

        {/* <Tooltip title={this.props.description} placement="right"> */}
        <div className={this.props.divname} >

          {/* {JSON.stringify(this.props.suggestions[0].value)} */}
          {/* <p className="line"> {column.value} </p> */}
          <input className="FForm-control line"
            type="search"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          // placeholder={this.props.default}

          />


          {suggestionsListComponent}
          {/* </input> */}
        </div>
        </div>

        {/* </Tooltip> */}



      </React.Fragment>
    );
  }
}

export default Autocomplete;
