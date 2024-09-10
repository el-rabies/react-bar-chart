import "./App.css";
import { GraphContainer } from "./GraphComponents/GraphContainer.tsx";

const ExtendArray = (dataset) => {
  const extendedArray = [];
  for (let i = 0; i < 100; i++) {
    const randomIndex = Math.floor(Math.random() * dataset.length);
    extendedArray.push(dataset[randomIndex]);
  }
  return extendedArray;
};

function App() {
  const dataset = ["juice", "pop", "water", "beer","wine"];
  const expandedArray = ExtendArray(dataset);
  return (
    <div className="App">
      <GraphContainer dataset={expandedArray} graphWidth={500} graphHeight={550} graphTitle="Drink Choices"/>
    </div>
  );
}

export default App;
