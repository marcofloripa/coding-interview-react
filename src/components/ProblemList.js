import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ProblemList extends Component {

  constructor(props) {
    super(props);
    this.state = {problems: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('problems')
      .then(response => response.json())
      .then(data => this.setState({problems: data, isLoading: false}));
  }

  async remove(id) {
    await fetch('/problems/${id}', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedProblems = [...this.state.problems].filter(i => i.id !== id);
      this.setState({problems: updatedProblems});
    });
  }

  render() {
    const {problems, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const problemList = problems._embedded.problemDtoes.map(problem => {      
      return <tr key={problem.idProblem}>
        <td style={{whiteSpace: 'nowrap'}}>{problem.title}</td>
        <td>{problem.description}</td>        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/problems/" + problem.idProblem}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(problem.idProblem)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/problems/new">Add Problem</Button>
          </div>
          <h3>Problems</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Title</th>
              <th>Description</th>              
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {problemList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ProblemList;