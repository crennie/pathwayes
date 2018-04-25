import React, { Component } from 'react'
import './static/css/App.css'
import './static/css/header.css'
import './static/css/footer.css'
import './static/css/font.css'
import './static/css/color.css'

import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import MainContent from './components/main/MainContent'
import Footer from './components/footer/Footer'

// TODO: Use this to mock up the API data returns
const apiData = {
  organization: {

  },

  domain: {
    initial_type: 1,
    initial_id: 1,
  },

  pathways: {
    88: {
      id: 88,
      initial_type: 1,
      initial_id: 2,
      title: "My pathway",
      description: "pathway 12345",
    }
  },

  // NOTE: We won't have questions or nodes in the DB, but maybe GQL will make it so
  nodes: {
    1: {
      "pathway": null,
      "type":"multiple",
      "question":"Question1 multiple type",
      "extra_text":"extra text",
      "answers":[
        {
          "id": 99,
          "answer":"item1",
          "next": 2,
        },
        {
          "id": 98,
          "answer":"item2",
          "next": 5
        }
      ]
    },
    2: {
      "pathway": 88,
      "type":"single",
      "question":"Please answer this regular question that is being answered after one of the multi-select questions and adds to progress of that item.",
      "extra_text":"This is extra text that can be added below the question to help someone answer it.",
      "answers":[
        {
          "id": 55,
          "answer":"Yes, I am answering this question in the positive because I agree with it",
          "next": 5,
        },
        {
          "id": 56,
          "answer":"No, I am answering this question in the negative because I disagree with it",
          "extra_text":"This is extra text that can be added to an answer to help someone answer it.",
          "next": 5
        }
      ]
    },
    5: {
      "pathway": 88,
      "type":"single",
      "question":"Question 3"
    }
  }
};

// TODO: Questions need IDs and answers need a "next" field
const initialState = {
  userPathways: [],
  /* [{
    pathway_id: 88,
    title: "My pathway",
    description: "pathway 12345",
    completed: false
  }],
  */
  
  userSteps: [],

  // TODO: Any others?
};

class App extends Component {
  state = {
    pathways: initialState.userPathways,
    current_node: {}
  };

  setDefaultState() {
    this.setState({ current_node: apiData.nodes[apiData.domain.initial_id] })
  };



  // TODO: This should be done with Redux state in future
  handleNextClick() {
    const main = this.refs.mainContent;
    const selected_answers = main.getSelectedAnswers()

    let pathways = Array.from(this.state.pathways),
      current_node = this.state.current_node

    if (!selected_answers.size) {
      return;
    } else {
      // For each selected answer:
      // Create pathways if they don't exist:

      for (const answer of selected_answers.values()) {
        if (answer.next) {
          const next_node = apiData.nodes[answer.next]
          if (next_node && next_node.pathway) {
            if (!pathways.filter(p=> p.id === next_node.pathway).length) {
              pathways.push(Object.assign({completed: false}, apiData.pathways[next_node.pathway]))
            }
          }
        }
      }

      // Route to next answer:
      const answers_with_next = Array.from(selected_answers.values()).filter(a => a.next)
      if (answers_with_next.length) {
        current_node = apiData.nodes[answers_with_next[0].next]
      } else {
        // Go to next pathway, etc
      }
    }

    this.setState({
      pathways, current_node
    })
  };

  componentDidMount() {
    // TODO: Do ajax load here later
    if (!this.state.pathways || (Array.isArray(this.state.pathways) && !this.state.pathways.length)) {
      this.setDefaultState();
    } else {
      // TODO: Use this to resume one in progress...
      const incomplete_pathways = this.state.pathways.filter(p => !p.completed);
      if (!incomplete_pathways || !incomplete_pathways.length) {
        // TODO: If only completed pathways, what to do??
      } else {
        const first_incomplete_pathway = incomplete_pathways[0]
        console.log(first_incomplete_pathway);

        this.setState({ current_node: apiData.nodes[
          apiData.pathways[first_incomplete_pathway.pathway_id].initial_id
        ]})
      }
    }
  };

  render() {
    console.log(this.state.current_node);
    return (
      <div className="App">
        <Header></Header>
        <div id="main">
          <div className="max_width">
            <div id="main_abs">
              <div id="main_rel">
                <Sidebar currentNode={this.state.current_node} userPathways={this.state.pathways}></Sidebar>
                <MainContent ref="mainContent" currentNode={this.state.current_node}></MainContent>
              </div>
            </div>
          </div>
        </div>
        <Footer onNext={this.handleNextClick.bind(this)}></Footer>
      </div>
    );
  }
}

export default App;
