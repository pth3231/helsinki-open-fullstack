import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { data } from "./data";

const App = () => {
  return (
    <div>
      <Header course={data.course}></Header>
      <Content lesson={data.lesson}></Content>
      <Total lesson={data.lesson}></Total>
    </div>
  )

}

export default App;