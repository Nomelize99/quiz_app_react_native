import Leaderboard from 'react-native-leaderboard';
//...
this.state = {
    data: [
        {userName: 'Joe', highScore: 52},
        {userName: 'Jenny', highScore: 120},
        //...
    ] //can also be an object of objects!: data: {a:{}, b:{}}
}

render() {
  return (
      <Leaderboard 
        data={this.state.data} 
        sortBy='highScore' 
        labelBy='userName'/>)
}