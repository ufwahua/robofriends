import React, { useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchField, requestRobots } from "../actions";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

const App = () => {
  const dispatch = useDispatch();

  const { searchField } = useSelector((state) => state.searchRobots);
  const { robots, isPending, error } = useSelector(
    (state) => state.requestRobots
  );

  useEffect(() => {
    onRequestRobots();
  }, []);

  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value));
  };
  const onRequestRobots = () => {
    dispatch(requestRobots());
  };
  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });
  return isPending ? (
    <h1 className="tc f2">Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f2">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
};

export default App;
