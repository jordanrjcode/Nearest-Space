import React from "react";

class SectionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="card">
        <div class="card-image" style={this.props.style}></div>
        <div class="card-text">
          <span class="date">{this.props.launch_date}</span>
          <h2>{this.props.section}</h2>
          <p>{this.props.name}</p>
        </div>
      </div>
    );
  }
}
