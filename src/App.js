import {Component} from 'react';

// Import Styles
import './App.css';

// Import Components
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component{
  constructor() {
    super();
    this.state = {
      monsters: [],
      // store search input in state so it can be used outside of the onChange event handler
      searchField: ''
    };
  }

  // componentDidMount should be used whenever we want to use an API in a component
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      // what ever got returned from response.json gets based to the next then, in this case users
      // we can then pass it to set state. In the partenthsis in setSate you can pass it the object where monsters points to users OR you can pass it as a function
      // here we use the function method where we return an object where monsters to points to users
      // were using the function method here so we can also add in a call back when setState is finished
      .then((users) => 
        this.setState(()=> {
          return {monsters: users}
        },
        // () => {
        //   console.log(this.state)
        // }
        )
      );
  }

  // its better to define functions OUTSIDE of your render and then simply call them as needed inside your render. this keeps your function in memory improving preformance
  // only builds it once!!! v good!
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    
    // update the state of searchField as we type into search bar
    this.setState(() => {
      return { searchField }
    })
  }

  render() {
    // use array destructuring to shorten variables in our render
    // destructuring from state
    const {monsters, searchField} = this.state;

    // destructuring from the class component
    const {onSearchChange} = this;

    // creates new filtered array based on the updated state of search field. will rerender every time we update the state of search field allowing us to filter repeatdly on demand.
    const filteredMonsters = monsters.filter((monster)=> {
      // includes is not case sensitive, se to lowercase above
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        {/* <input 
          className='search-box' 
          type='search' 
          placeholder='search monsters'
          // when the function itself is stored in the render, it gets deleted and recreated every time the app rerenders.  this will ultimately impact preformance.  
          // onChange={(event) => {
          //   console.log(event.target.value);
          //   const searchField = event.target.value.toLocaleLowerCase();
            
          //   // update the state of searchField as we type into search bar
          //   this.setState(() => {
          //     return { searchField }
          //   })
          // }}
          onChange = {onSearchChange}
        /> */}
        {/* map the new filtered array of monsters instead of full array of monsters stored in state */}
        {/* {filteredMonsters.map((monster) => {
          return <h1 key={monster.id}>{monster.name}</h1>
        })} */}
        <SearchBox 
          onChangeHandler={onSearchChange} placeholder='search monsters' className='monsters-search-box'
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}
export default App;
