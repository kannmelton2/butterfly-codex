import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap';

import butterflyData from '../../../helpers/data/butterflyData';

import ButterflyCards from '../../shared/ButterflyCards/ButterflyCards';

import './Home.scss';

class Home extends React.Component {
  state = {
    butterflies: [],
    selectedButterflies: [],
  }

  getButterflyInfo = () => {
    butterflyData.getButterflies()
      .then((butterflies) => {
        this.setState({ butterflies, selectedButterflies: butterflies });
      })
      .catch((err) => console.error('could not get butterflies: ', err));
  }

  componentDidMount() {
    this.getButterflyInfo();
  }

  filterButterflies = (e) => {
    e.preventDefault();
    const { butterflies } = this.state;
    const selectedType = e.target.value;
    if (selectedType === 'all') {
      this.setState({ selectedButterflies: butterflies });
    } else {
      const filteredButterflies = butterflies.filter((x) => x.type === selectedType);
      this.setState({ selectedButterflies: filteredButterflies });
    }
  }

  render() {
    const { selectedButterflies } = this.state;

    const buildButterflies = selectedButterflies.map((butterfly) => (
      <ButterflyCards key={butterfly.id} butterfly={butterfly} />
    ));

    return (
      <div className="Home col-12 mt-3 d-flex flex-wrap">
        <Jumbotron className="col-12">
          <h1 className="display-3 jumbo-text">Welcome to Butterfly Codex</h1>
          <hr className="my-2" />
          <p className="jumbo-text">Help us track butterflies of the United States of America</p>
          <p className="lead jumbo-text">
            <Link className="btn btn-primary" to="/new-sighting">+ Sighting</Link>
          </p>
        </Jumbotron>
        <h2 className="col-12">Butterflies</h2>
        <form className="col-12 butterfly-filter">
          <select className="col-6 form-control mb-3" onChange={this.filterButterflies}>
            <option value="all">All</option>
            <option value="Brush-Footed">Brush-Footed</option>
            <option value="Gossamer-Winged">Gossamer-Winged</option>
            <option value="Swallowtail">Swallowtail</option>
          </select>
          {/* <button type="submit" className="btn btn-primary" onClick={this.filterButterflies}>Filter</button> */}
        </form>
        {buildButterflies}
      </div>
    );
  }
}

export default Home;